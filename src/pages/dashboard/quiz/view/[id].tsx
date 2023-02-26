import * as React from "react";
import Typography from "@material-ui/core/Typography";
import StepMachine from "react-step-machine";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { useRouter } from "next/router";
import { useDialog } from "mui-react-hook-form-plus";
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import Timer from "../../../../components/Timer";
import HeadComponent from "../../../../components/Head";
import withPermissions from "../../../../components/withPermissions";
import { useUser } from "../../../../hooks/useUser";
import { Dashboard } from "../../../../components";
import { QuizPrompt } from "../../../../components/QuizPrompt";
import { IQuizShape } from "../[createOrUpdate]/[...requirements]";
import {
  useGetQuizQuery,
  useGetRandomQuizQuery,
  useGetStudentQuery,
  useGetAnswersQuery,
  useGetQuestionsQuery,
} from "../../../../state/services";

export interface StudentQuizAnswer {
  startTime: number;
  answers: string[];
  submitted: boolean;
  totalMarks?: number;
}

const Quiz = () => {
  const [quizStarted, setQuizStarted] = React.useState(false);

  const { query } = useRouter();

  const { id } = query as { id: string };

  const { isLoading, data } = useGetQuizQuery({ id }, { skip: !id });

  const { register, close, open } = useDialog();

  const { id: studentId, role } = useUser();

  const {
    data: studentData,
    isLoading: isStudentLoading,
    refetch: refetchStudent,
    isFetching: isStudentFetching,
  } = useGetStudentQuery({ id: studentId }, { skip: role !== "student" });

  const {
    isLoading: isRandomQuizLoading,
    data: randomQuizzesData,
    refetch,
  } = useGetRandomQuizQuery(
    {
      id,
      studentId,
    },
    { skip: !id || !quizStarted }
  );

  React.useEffect(() => {
    if (quizStarted && !!randomQuizzesData) {
      refetchStudent();
    }
  }, [quizStarted, randomQuizzesData]);

  const startQuiz = async (e: React.SyntheticEvent) => {
    setQuizStarted(true);

    close(e);
  };

  const [quizFinished, setQuizFinished] = React.useState(false);

  const questionsMap = data?.questions ? JSON.parse(data.questions) : {};

  const questions = Object.keys(questionsMap).map((key) => {
    return questionsMap[key];
  }) as IQuizShape[];

  const quizzes = randomQuizzesData?.randQuestions ?? {};

  const stateOfQuiz = randomQuizzesData?.state ?? 0;

  const messageOfQuiz = randomQuizzesData?.message ?? "";

  const mappedQuizzes = Object.keys(quizzes).map((key) => {
    return quizzes[key];
  });

  const startDate = data?.quizStartDate ? new Date(data.quizStartDate).getTime() : 0;

  const endDate = data?.quizEndDate ? new Date(data.quizEndDate).getTime() : 0;

  const currentDate = new Date().getTime();

  const isQuizActive = currentDate >= startDate && currentDate <= endDate;

  const quizStudent = studentData?.quizAnswers ? JSON.parse(studentData.quizAnswers) : {};

  const selfQuizData = (quizStudent[id] ?? {}) as StudentQuizAnswer;

  const isQuizSubmitted = selfQuizData.submitted ?? false;

  const startTime = selfQuizData.startTime ? new Date(selfQuizData.startTime).getTime() : 0;

  const timeGap = (new Date().getTime() - startTime) / (1000 * 60);

  const timeLeft = data?.totalTime - timeGap;

  const isTimeOver = timeLeft <= 0;

  React.useEffect(() => {
    if (timeLeft && !isTimeOver) {
      setQuizStarted(true);
    }
  }, [timeLeft, isTimeOver]);

  const { data: answers, isLoading: isAnswersLoading } = useGetAnswersQuery(
    {
      id,
      studentId,
    },
    {
      skip: startTime && isTimeOver ? false : !isQuizSubmitted || !studentId || !id,
    }
  );

  const { data: questionsData, isLoading: isQuestionsLoading } = useGetQuestionsQuery(
    {
      id,
    },
    {
      skip: startTime && isTimeOver ? false : !isQuizSubmitted || !id,
    }
  );

  const questionsMapData: Omit<IQuizShape, "answer">[] = questionsData
    ? Object.values(questionsData)
    : [];

  const anwersMap = answers ? Object.values(answers) : [];

  const obtainedMarks: number | null = selfQuizData.answers
    ? Object.values(selfQuizData.answers)?.reduce((acc, answer, index) => {
        if (answer === anwersMap[index]) {
          return acc + 1;
        }

        return acc;
      }, 0)
    : null;

  const [showMarks, _setShowMarks] = React.useState(true);

  const isAllLoading =
    isLoading ||
    isRandomQuizLoading ||
    isStudentLoading ||
    isStudentFetching ||
    isAnswersLoading ||
    isQuestionsLoading;

  return (
    <>
      <HeadComponent title="Quiz | Exam" />

      <Dialog maxWidth="xs" fullWidth {...register()}>
        <DialogTitle>
          <Typography color="primary"></Typography>
        </DialogTitle>
        <DialogContent>
          <Typography color="textPrimary">Are you sure you want to start this quiz?</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={startQuiz} variant="contained" color="primary">
            Start Quiz
          </Button>
          <Button onClick={close} variant="contained" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <LoadingOverlayWrapper active={isAllLoading}>
        <Dashboard>
          <Timer
            shouldStart={
              !!randomQuizzesData &&
              (stateOfQuiz === 1 || stateOfQuiz === 2) &&
              !isQuizSubmitted &&
              !isTimeOver
            }
            onFinish={() => {
              setQuizFinished(true);
            }}
            reactiveTimeInSec={timeLeft * 60}
          />
          {data && (
            <div className="space-y-4">
              <h6 className="mb-6">Quiz: {data.title}</h6>
              <p className="max-w-sm font-normal text-gray-700 dark:text-gray-400">
                {data.description}
              </p>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

              <p>Total time: {data.totalTime} min</p>
              <p>Start date: {new Date(data.quizStartDate).toLocaleDateString()}</p>
              <p>End date: {new Date(data.quizEndDate).toLocaleDateString()}</p>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

              {isQuizSubmitted && (
                <Typography color="textSecondary" variant="h6">
                  Total marks: {obtainedMarks ?? 0}/{questions.length}
                </Typography>
              )}

              {!isQuizActive ? (
                <>
                  <Typography color="textSecondary" variant="h6">
                    Quiz is not active.
                  </Typography>
                </>
              ) : isQuizSubmitted || (isTimeOver && !!startTime) ? (
                <>
                  <Typography color="textSecondary" variant="h5">
                    The quiz is submitted.
                  </Typography>

                  <Collapse
                    className="p-4 bg-gray-800"
                    in={showMarks && (isQuizSubmitted || (isTimeOver && !!startTime))}
                  >
                    <ul className="space-y-4">
                      {questionsMapData.map((question, index) => {
                        const isCorrect = anwersMap[index] === selfQuizData.answers[index];

                        return (
                          <li key={question.question + `${index}`}>
                            <Typography color="textPrimary" variant="h6">
                              {index + 1}. {question.question}
                            </Typography>
                            {question.options.map((option, _index) => {
                              const isMatchedQuiz = selfQuizData.answers[index] === option.value;
                              return (
                                <div className="flex my-2 ml-4" key={`${_index}` + option}>
                                  <Typography className="flex items-center p-2 space-x-4 rounded">
                                    <span
                                      className={`h-4 w-4 rounded-full ${
                                        isMatchedQuiz ? "bg-black ring" : "bg-white"
                                      }`}
                                    />
                                    <span>{option.value}</span>{" "}
                                    <span>{isMatchedQuiz ? (isCorrect ? "✅" : "❌") : ""}</span>
                                  </Typography>
                                </div>
                              );
                            })}

                            <Typography
                              className={`rounded border p-4 ${
                                isCorrect ? "border-green-500" : "border-red-500"
                              }`}
                              color="textSecondary"
                              variant="h6"
                            >
                              Correct answer: {anwersMap[index]}
                            </Typography>
                          </li>
                        );
                      })}
                    </ul>
                  </Collapse>
                </>
              ) : quizStarted && !!randomQuizzesData ? (
                <StepMachine>
                  {stateOfQuiz === 1 || stateOfQuiz === 2 ? (
                    <QuizPrompt
                      id={id}
                      prevQuizAnswers={quizStudent}
                      quizzes={mappedQuizzes}
                      quizPrevConnection={selfQuizData}
                      refetch={refetch}
                      refetchStudent={refetchStudent}
                      quizFinished={quizFinished}
                    />
                  ) : (
                    <Typography color="textSecondary" variant="h6">
                      {messageOfQuiz}
                    </Typography>
                  )}
                </StepMachine>
              ) : quizStarted && isTimeOver && !isAllLoading ? (
                <Typography color="textSecondary" variant="h6">
                  Time is over.
                </Typography>
              ) : (
                <Button disabled={isAllLoading} onClick={open} variant="contained" color="primary">
                  Start Quiz
                </Button>
              )}
            </div>
          )}
        </Dashboard>
      </LoadingOverlayWrapper>
    </>
  );
};

export default withPermissions(["student"])(Quiz);
