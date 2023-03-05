import React from "react";
import { Grid } from "@mui/material";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { Control, useFieldArray, UseFormRegister, useWatch } from "react-hook-form";
import { HookDatePicker, HookDateTimePicker, useHookForm } from "mui-react-hook-form-plus";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

import { MdAdd, MdRemove } from "react-icons/md";
import { Dashboard } from "../../../../components";
import {
  useAddQuizMutation,
  useEditQuizMutation,
  useGetQuizQuery,
} from "../../../../state/services";
import { LoginInput, LoginInputBlock, LoginTextArea } from "../../../login";
import { QuizTypes } from "../../../../variables/enums";
import withPermissions from "../../../../components/withPermissions";

export interface IQuizShape {
  question: string;
  answer: string;
  type: QuizTypes;
  options?: { value: string }[];
}

const defaultValues = {
  title: "",
  courseId: "",
  packageId: "",
  description: "",
  quizStartDate: new Date(),
  quizEndDate: new Date(),
  maxQues: 0,
  totalTime: 0,
  questions: [
    // {
    //     question: "",
    //     answer: "",
    //     type: QuizTypes.MultipleChoice,
    //     options: [{value: ""}, {value: ""}, {value: ""}, {value: ""}],
    // },
  ] as IQuizShape[],
};

type DefaultValues = typeof defaultValues;

function QuizCreate() {
  const { query, push } = useRouter();

  const { requirements, createOrUpdate } = query as {
    requirements: string[];
    createOrUpdate: "create" | string;
  };

  const isUpdate = createOrUpdate !== "create";

  const updateId = isUpdate ? createOrUpdate : null;

  const [courseId, packageId] = requirements ?? [];

  const [addQuiz, { isLoading }] = useAddQuizMutation();

  const [updateQuiz, { isLoading: isUpdateLoading }] = useEditQuizMutation();

  const {
    data,
    isLoading: isAssignmentLoading,
    refetch,
  } = useGetQuizQuery(
    {
      id: updateId,
    },
    {
      skip: !isUpdate || !updateId,
    }
  );

  const {
    register: formRegister,
    registerState,
    getValues,
    setValues,
    control,
  } = useHookForm({
    defaultValues,
  });

  const _questions = useWatch({
    control,
    name: "questions",
  }) as DefaultValues["questions"];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  React.useEffect(() => {
    if (isUpdate) {
      return;
    }

    if (courseId && packageId) {
      setValues({
        courseId,
        packageId,
      });
    }
  }, [courseId, courseId, isUpdate]);

  React.useEffect(() => {
    if (!isUpdate) {
      return;
    }

    const questions = [];

    const parsedQuestions = JSON.parse(data?.questions ?? "{}");
    const parsedAnswers = JSON.parse(data?.answers ?? "{}");

    Object.keys(parsedQuestions).forEach((key) => {
      questions.push({
        question: parsedQuestions[key].question,
        answer: parsedAnswers[key],
        type: parsedQuestions[key].type,
        options: parsedQuestions[key].options,
      });
    });

    if (data) {
      const copy = { ...data };

      delete copy.id;

      setValues({ ...copy, questions });
    }
  }, [data]);

  const handleSubmit = async () => {
    const { questions, ...rest } = getValues();

    const mappedQuestions = questions
      .filter(({ question, answer }) => question && answer)
      .reduce(
        (acc, { question, answer, type, options }, i) => {
          acc["answers"] = {
            ...acc["answers"],
            [i]: answer,
          };

          acc["questions"] = {
            ...acc["questions"],
            [i]: {
              question,
              type,
              options: options?.filter(({ value }) => value) ?? [],
            },
          };

          return acc;
        },
        {} as {
          answers: Record<string, string>;
          questions: Record<
            string,
            {
              question: string;
              type: QuizTypes;
              options?: { value: string }[];
            }
          >;
        }
      );

    try {
      if (isUpdate) {
        await updateQuiz({
          id: updateId,
          body: {
            ...rest,
            questions: mappedQuestions.questions,
            answers: mappedQuestions.answers,
          },
        }).unwrap();
        refetch();
      } else {
        await addQuiz({
          ...rest,
          questions: mappedQuestions.questions,
          answers: mappedQuestions.answers,
        }).unwrap();
      }

      await push("/dashboard/quiz");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoadingOverlayWrapper active={isLoading || isAssignmentLoading || isUpdateLoading}>
        <Dashboard>
          <h6 className="mb-6">{isUpdate ? "Update" : "Create"} Quiz</h6>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="title" className="min-w-[100px] flex-shrink-0">
                  Title
                </label>
                <LoginInput id="title" className="p-2 dark:text-white" {...formRegister("title")} />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="description" className="min-w-[100px] flex-shrink-0">
                  Description
                </label>
                <LoginTextArea
                  id="description"
                  className="p-2 w-80 dark:text-white"
                  {...formRegister("description")}
                />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="quizStartDate" className="min-w-[100px] flex-shrink-0">
                  Start Date
                </label>
                <HookDateTimePicker
                  dateTimePickerProps={{
                    InputProps: {
                      sx: {
                        background: "#ddd",
                      },
                      id: "quizStartDate",
                    },
                  }}
                  {...registerState("quizStartDate")}
                />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="quizEndDate" className="min-w-[100px] flex-shrink-0">
                  End Date
                </label>
                <HookDateTimePicker
                  dateTimePickerProps={{
                    InputProps: {
                      sx: {
                        background: "#ddd",
                      },
                      id: "quizEndDate",
                    },
                  }}
                  {...registerState("quizEndDate")}
                />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="totalTime" className="min-w-[100px] flex-shrink-0">
                  Total Time (Minute)
                </label>
                <LoginInput
                  id="totalTime"
                  className="p-2 dark:text-white"
                  {...formRegister("totalTime")}
                />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="maxQuestion" className="min-w-[100px] flex-shrink-0">
                  Max Questions
                </label>
                <LoginInput
                  id="maxQues"
                  className="p-2 dark:text-white"
                  {...formRegister("maxQues")}
                />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <div className="flex items-center gap-4 mb-2">
                <h6>Questions | Answers</h6>
                <MdAdd
                  onClick={() => {
                    append({
                      question: "",
                      answer: "",
                      type: QuizTypes.MultipleChoice,
                      options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
                    });
                  }}
                  className="text-2xl font-semibold rounded cursor-pointer dark:bg-slate-700"
                />
              </div>
              {fields
                // .filter(({ options }) => options.length === 4)
                .map((field, index) => {
                  console.log(index, getValues(`questions.${index}.question`));
                  return (
                    <div
                      key={index}
                      className="flex flex-col p-4 mb-4 transition-all rounded dark:bg-gray-800 focus-within:dark:bg-slate-600"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-2xl font-semibold">{index + 1}</span>
                        <LoginInputBlock>
                          <LoginTextArea
                            id="question"
                            placeholder="Question"
                            className="p-2 dark:text-white"
                            {...formRegister(`questions.${index}.question`)}
                          />
                        </LoginInputBlock>
                        <div className="flex items-center gap-4">
                          <LoginInputBlock>
                            <LoginTextArea
                              id="answer"
                              placeholder="Answer"
                              className="p-2 dark:text-white"
                              {...formRegister(`questions.${index}.answer`)}
                            />
                          </LoginInputBlock>
                          <LoginInputBlock>
                            <select
                              className="h-full rounded dark:bg-slate-700"
                              name="Quiz Type"
                              {...formRegister(`questions.${index}.type`)}
                            >
                              <option disabled>Select quiz type</option>
                              {Object.keys(QuizTypes).map((key) => (
                                <option value={QuizTypes[key]}>{QuizTypes[key]}</option>
                              ))}
                            </select>
                          </LoginInputBlock>
                          {index > 0 && (
                            <MdRemove
                              onClick={() => {
                                remove(index);
                              }}
                              className="text-2xl font-semibold rounded cursor-pointer dark:bg-slate-700"
                            />
                          )}
                        </div>
                      </div>
                      <QuizMultipleChoice
                        control={control}
                        index={index}
                        register={formRegister}
                        quizType={getValues(`questions.${index}.type`)}
                      />
                    </div>
                  );
                })}
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleSubmit} variant="contained" color="primary" className="ml-2">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Dashboard>
      </LoadingOverlayWrapper>
    </>
  );
}

interface QuizFormProps {
  control: Control<DefaultValues>;
  index: number;
  register: UseFormRegister<DefaultValues>;
  quizType: QuizTypes;
}

const optionsEnabledForQuizType = [QuizTypes.MultipleChoice, QuizTypes.MultipleAnswer];

const QuizMultipleChoice: React.FC<QuizFormProps> = ({ control, index, register, quizType }) => {
  const { fields, append } = useFieldArray({
    control,
    name: `questions[${index}].options` as "questions",
  });

  React.useEffect(() => {
    if (quizType === QuizTypes.MultipleChoice && fields.length !== 4) {
      for (const arrayElement of Array(4)) {
        // @ts-ignore
        append({ value: "" });
      }
    }
  });

  if (!optionsEnabledForQuizType.includes(quizType)) {
    return null;
  }

  return (
    <div className="p-2 rounded-sm dark:bg-gray-900">
      <div className="flex items-center gap-4 ">
        <p>Options</p>
      </div>

      <div className="flex gap-4">
        {fields.map((_, _index) => {
          return (
            <div
              key={_index}
              className="flex items-center gap-4 p-2 mb-4 transition-all rounded-sm focus-within:dark:bg-slate-600"
            >
              <div>
                <LoginInputBlock>
                  <LoginTextArea
                    id="option"
                    placeholder={`Option-${_index + 1}`}
                    className="p-2 dark:text-white"
                    {...register(`questions[${index}].options.${_index}.value` as "questions")}
                  />
                </LoginInputBlock>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withPermissions(["instructor", "admin"])(QuizCreate);
