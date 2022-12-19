import React from "react";
import { Grid } from "@mui/material";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { useFieldArray } from "react-hook-form";
import { HookDatePicker, useHookForm } from "mui-react-hook-form-plus";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

import { MdAdd, MdRemove } from "react-icons/md";
import { Dashboard } from "../../../../components";
import {
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentQuery,
} from "../../../../state/services";
import { LoginInput, LoginInputBlock, LoginTextArea } from "../../../login";
import withPermissions from "../../../../components/withPermissions";

function AssignmentCreate() {
  const { query, push } = useRouter();

  const { requirements, createOrUpdate } = query as {
    requirements: string[];
    createOrUpdate: "create" | string;
  };

  const isUpdate = createOrUpdate !== "create";

  const updateId = isUpdate ? createOrUpdate : null;

  const [courseId, packageId] = requirements ?? [];

  const [addAssignment, { isLoading }] = useAddAssignmentMutation();

  const [updateAssignment, { isLoading: isUpdateLoading }] = useEditAssignmentMutation();

  const {
    data,
    isLoading: isAssignmentLoading,
    refetch,
  } = useGetAssignmentQuery(
    { id: updateId },
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
    defaultValues: {
      title: "",
      courseId: "",
      packageId: "",
      description: "",
      assignmentStartDate: new Date(),
      assignmentEndDate: new Date(),
      questions: [{ question: "", answer: "" }] as { question: string; answer: string }[],
    },
  });

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
        question: parsedQuestions[key],
        answer: parsedAnswers[key],
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
        (acc, { question, answer }, i) => {
          acc["answers"] = {
            ...acc["answers"],
            [i]: answer,
          };

          acc["questions"] = {
            ...acc["questions"],
            [i]: question,
          };

          return acc;
        },
        {} as {
          answers: Record<string, string>;
          questions: Record<string, string>;
        }
      );

    try {
      if (isUpdate) {
        await updateAssignment({
          id: updateId,
          body: {
            ...rest,
            questions: mappedQuestions.questions,
            answers: mappedQuestions.answers,
          },
        }).unwrap();

        refetch();
      } else {
        await addAssignment({
          ...rest,
          questions: mappedQuestions.questions,
          answers: mappedQuestions.answers,
        }).unwrap();
      }

      push("/dashboard/assignment");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <LoadingOverlayWrapper active={isLoading || isAssignmentLoading || isUpdateLoading}>
        <Dashboard>
          <h6 className="mb-6">{isUpdate ? "Update" : "Create"} Assignment</h6>

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
                <label htmlFor="assignmentStartDate" className="min-w-[100px] flex-shrink-0">
                  Start Date
                </label>
                <HookDatePicker
                  datePickerProps={{
                    InputProps: {
                      sx: {
                        background: "#ddd",
                      },
                      id: "assignmentStartDate",
                    },
                  }}
                  {...registerState("assignmentStartDate")}
                />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="assignmentEndDate" className="min-w-[100px] flex-shrink-0">
                  End Date
                </label>
                <HookDatePicker
                  datePickerProps={{
                    InputProps: {
                      sx: {
                        background: "#ddd",
                      },
                      id: "assignmentEndDate",
                    },
                  }}
                  {...registerState("assignmentEndDate")}
                />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <div className="flex items-center gap-4 mb-2">
                <h6>Questions | Answers</h6>
                <MdAdd
                  onClick={() => {
                    append({ question: "", answer: "" });
                  }}
                  className="text-2xl font-semibold rounded cursor-pointer bg-slate-700"
                />
              </div>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-4 p-2 mb-4 transition-all rounded-sm focus-within:bg-slate-600"
                >
                  <LoginInputBlock>
                    <LoginTextArea
                      id="question"
                      placeholder="Question"
                      className="p-2 dark:text-white"
                      {...formRegister(`questions.${index}.question`)}
                    />
                  </LoginInputBlock>
                  <LoginInputBlock>
                    <LoginTextArea
                      id="answer"
                      placeholder="Answer"
                      className="p-2 dark:text-white"
                      {...formRegister(`questions.${index}.answer`)}
                    />
                  </LoginInputBlock>
                  {index > 0 && (
                    <MdRemove
                      onClick={() => {
                        remove(index);
                      }}
                      className="text-2xl font-semibold rounded cursor-pointer bg-slate-700"
                    />
                  )}
                </div>
              ))}
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

export default withPermissions(["instructor", "admin"])(AssignmentCreate);
