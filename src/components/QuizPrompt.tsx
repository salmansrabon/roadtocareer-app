import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useDialog, useHookForm } from "mui-react-hook-form-plus";
import { Step, StepContainer, useStepActions, useStepStore } from "react-step-machine";

import { QuizTypes } from "../variables/enums";
import { IQuizShape } from "../pages/dashboard/quiz/[createOrUpdate]/[...requirements]";
import { List, ListItem } from "@mui/material";
import { useEditStudentMutation, useGetAnswersQuery } from "../state/services";
import { useUser } from "../hooks/useUser";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { StudentQuizAnswer } from "../pages/dashboard/quiz/view/[id]";

interface Props {
  quizzes: IQuizShape[];
  refetch: () => void;
  refetchStudent: () => void;
  id: string;
  quizPrevConnection?: StudentQuizAnswer;
  prevQuizAnswers: any;
  quizFinished?: boolean;
}

interface QuizAnswer {
  answers: { value: string }[];
}

export const QuizPrompt: React.FC<Props> = ({
  quizzes,
  refetch,
  id: quizId,
  quizPrevConnection = {},
  prevQuizAnswers = {},
  quizFinished,
}) => {
  const [quizState, setQuizState] = React.useState(quizzes);

  const { id: studentId } = useUser();

  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (quizzes.length && !quizState.length) {
      setQuizState(quizzes);
    }
  }, [quizzes, quizState]);

  const { activeStep } = useStepStore();

  const { nextStep, previousStep } = useStepActions();

  const { register, handleSubmit, getValues } = useHookForm<QuizAnswer>({
    defaultValues: {
      answers: [],
    },
  });

  const [editStudent, { isLoading: isStudentUpdateLoading }] = useEditStudentMutation();

  const confirmSubmitDialog = useDialog();

  const onSubmit = (_data: QuizAnswer) => {
    confirmSubmitDialog.open();
  };

  const { isLoading: isAnswersLoading, refetch: answerRefetch } = useGetAnswersQuery(
    {
      id: quizId,
      studentId,
    },
    {
      skip: !submitted,
    }
  );

  const submitQuiz = async (e?: React.SyntheticEvent) => {
    confirmSubmitDialog.close(e);

    let answers = {};

    getValues().answers.forEach((a, index) => {
      if (a?.value) {
        answers[index] = a.value;
        return;
      }

      answers[index] = "not_given";
    });

    const _answers = await answerRefetch().unwrap();
    const anwersMap = _answers ? Object.values(_answers) : [];

    const obtainedMarks: number | null = answers
      ? (Object.values(answers)?.reduce((acc: number, answer, index) => {
          if (answer === anwersMap[index]) {
            return acc + 1;
          }

          return acc;
        }, 0) as number)
      : null;

    await editStudent({
      id: studentId,
      student: {
        quizAnswers: {
          ...prevQuizAnswers,
          [quizId]: {
            ...quizPrevConnection,
            answers,
            submitted: true,
            totalMarks: obtainedMarks,
          },
        },
      },
    }).unwrap();
  };

  const preSubmit = () => {
    setSubmitted(true);

    setTimeout(() => {
      submitQuiz();
    }, 1000);
  };

  React.useEffect(() => {
    if (quizFinished) {
      submitQuiz();
    }
  }, [quizFinished]);

  return (
    <LoadingOverlayWrapper active={isStudentUpdateLoading || isAnswersLoading}>
      <Dialog maxWidth="xs" fullWidth {...confirmSubmitDialog.register()}>
        <DialogTitle>
          <Typography color="primary"></Typography>
        </DialogTitle>
        <DialogContent>
          <Typography className="text-gray-600" variant="h6">
            Are you sure you want to Submit your answer?
          </Typography>
          <List>
            {getValues().answers.map((answer, index) => {
              return (
                <ListItem divider key={index}>
                  <Typography color={answer.value ? "textPrimary" : "error"}>
                    <span className="text-gray-500">Answer {index + 1}: </span>
                    {answer.value ?? "❌ NO ANSWER !!!"}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={preSubmit} variant="contained" color="primary">
            Submit Quiz
          </Button>
          <Button onClick={confirmSubmitDialog.close} variant="contained" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <form className="h-full max-w-lg mx-auto overflow-x-hidden select-none">
        {/* Steps  */}
        <StepContainer>
          {quizState.map((quiz, index) => (
            <Step key={index} order={index + 1} name="foo">
              <div className="min-h-[300px] rounded bg-gray-50 p-4 dark:bg-gray-700">
                <p className="mb-4 text-xl">
                  {index + 1}. {quiz.question}
                </p>
                {quiz.type === QuizTypes.MultipleChoice && (
                  <div className="flex flex-col space-y-2">
                    {quiz.options.map((option, _index) => (
                      <label
                        htmlFor={option.value}
                        key={option.value + _index}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          id={option.value}
                          value={option.value}
                          {...register(`answers.${index}.value`)}
                        />
                        <span>{option.value}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </Step>
          ))}

          {/* You will have more control with our special hooks inside components */}
        </StepContainer>

        <div className="flex items-center justify-center my-8 space-x-8">
          <Button
            onClick={previousStep}
            style={{ color: activeStep === 1 ? "#818181" : undefined }}
            disabled={activeStep === 1}
            variant="contained"
          >
            Previous
          </Button>
          <p className="w-24 text-center">
            {activeStep} of{" "}
            <span className="text-blue-600 dark:text-blue-400">{quizState.length}</span>
          </p>

          {activeStep === quizState.length ? (
            <Button
              onClick={(e) => {
                handleSubmit(onSubmit)(e);
              }}
              style={{ color: activeStep === quizState.length ? "#ddd" : undefined, width: 100 }}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={() => {
                refetch();
                nextStep();
              }}
              style={{ color: activeStep === quizState.length ? "#ddd" : undefined, width: 100 }}
              disabled={activeStep === quizState.length}
              variant="contained"
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </LoadingOverlayWrapper>
  );
};
