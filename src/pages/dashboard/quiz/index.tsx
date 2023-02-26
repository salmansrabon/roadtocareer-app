import React from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { HookAutoComplete, useDialog } from "mui-react-hook-form-plus";

import withPermissions from "../../../components/withPermissions";
import { Dashboard, Head, MaterialTable } from "../../../components";
import { useDeleteQuizMutation, useGetQuizzesQuery } from "../../../state/services";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSeatchList } from "../../../hooks/useSearchList";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { useUser } from "../../../hooks/useUser";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const defaultValues = {
  title: null as string | null,
  packageId: null as string | null,
  courseId: null as string | null,
};

type DefaultValues = typeof defaultValues;

const Quizzes = () => {
  const router = useRouter();

  const { id, role } = useUser();
  const isStudent = role === "student";
  // const getStudentQuery = useGetStudentQuery({ id }, { skip: !id });

  const [deleteQuiz, { isLoading: isDeleteLoading }] = useDeleteQuizMutation();

  const [filterRef, setFilterRef] = React.useState<Partial<DefaultValues>>({});

  const { isLoading, isFetching, data } = useGetQuizzesQuery({ ...filterRef, id, role });

  const quizzes = data?.map((assignment) => ({
    ...assignment,
  }));

  const { registerState } = useSeatchList({
    setFilterRef,
    listData: quizzes,
    defaultValues,
  });

  const titles = quizzes?.map((assignment: any) => assignment.title) ?? [];
  const packageIds = quizzes?.map((assignment: any) => assignment.packageId) ?? [];
  const courseIds = quizzes?.map((assignment: any) => assignment.courseId) ?? [];

  const titlesUnique = [...(new Set<string>(titles) as any)];
  const packageIdsUnique = [...(new Set<string>(packageIds) as any)];
  const courseIdsUnique = [...(new Set<string>(courseIds) as any)];

  const { register, open } = useDialog();

  const [selected, setSelected] = React.useState<any>({});

  return (
    <>
      <Head title="Quizzes" />

      <Dialog maxWidth="xs" fullWidth {...register()}>
        <DialogTitle>
          <Typography color="primary">{selected?.title}</Typography>
        </DialogTitle>
        <DialogContent>
          {isStudent ? (
            <>
              {/* FOR STUDENTS*/}
              <Button variant="contained" color="primary">
                <Link
                  className="text-blue-700 underline"
                  href={`/dashboard/quiz/view/${selected?.id}`}
                >
                  Go to Quiz
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Typography color="textPrimary">Course Id: {selected?.courseId}</Typography>
              <Typography color="textPrimary">Package Id: {selected?.packageId}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>

      <LoadingOverlayWrapper active={isLoading || isFetching || isDeleteLoading}>
        <Dashboard>
          <div className="flex items-center justify-between mb-5">
            <h6>Quizzes</h6>
            {/* {role === "instructor" && (
              <Button
                onClick={() => {
                  router.push(`/quizzes/create/${rowData.courseId}/${rowData.packageId}`);
                }}
                variant="contained"
                color="primary"
              >
                Add Assignment
              </Button>
            )} */}
          </div>

          <div className="p-4 mb-4 bg-white">
            <Grid container gap={2}>
              <HookAutoComplete
                gridProps={{
                  xs: 6,
                  md: 3,
                }}
                {...registerState("title")}
                autocompleteProps={{
                  options: titlesUnique,
                  isOptionEqualToValue: (option, value) => option === value,
                  sx: {
                    "& .MuiAutocomplete-endAdornment": {
                      top: 2,
                    },
                  },
                }}
                textFieldProps={{
                  label: "Title",
                }}
              />

              <HookAutoComplete
                gridProps={{
                  xs: 6,
                  md: 3,
                }}
                {...registerState("courseId")}
                autocompleteProps={{
                  options: courseIdsUnique,
                  isOptionEqualToValue: (option, value) => option === value,
                  sx: {
                    "& .MuiAutocomplete-endAdornment": {
                      top: 2,
                    },
                  },
                }}
                textFieldProps={{
                  label: "Course Id",
                }}
              />

              <HookAutoComplete
                gridProps={{
                  xs: 6,
                  md: 2,
                }}
                {...registerState("packageId")}
                autocompleteProps={{
                  options: packageIdsUnique,
                  isOptionEqualToValue: (option, value) => option === value,
                  sx: {
                    "& .MuiAutocomplete-endAdornment": {
                      top: 2,
                    },
                  },
                }}
                textFieldProps={{
                  label: "Batch Number",
                }}
              />
            </Grid>
          </div>

          <MaterialTable
            title="All Students"
            columns={
              isStudent
                ? [
                    {
                      title: "Title",
                      field: "title",
                      render: (rowData) => {
                        return (
                          <button
                            className="text-indigo-500 underline"
                            onClick={() => {
                              setSelected(rowData);
                              open();
                            }}
                          >
                            {rowData.title}
                          </button>
                        );
                      },
                    },
                    { title: "Description", field: "description" },
                    { title: "Start Date", field: "quizStartDate" },
                    { title: "End Date", field: "quizEndDate" },
                  ]
                : [
                    {
                      title: "Title",
                      field: "title",
                    },
                    { title: "Description", field: "description" },
                    { title: "Course Id", field: "courseId" },
                    { title: "Package Id", field: "packageId" },
                    { title: "Start Date", field: "quizStartDate" },
                    { title: "End Date", field: "quizEndDate" },
                  ]
            }
            data={quizzes}
            actions={[
              isStudent
                ? undefined
                : {
                    icon: () => <MdEdit />,
                    tooltip: "Edit Quiz",
                    onClick: (_event, rowData) => {
                      // do something with the rowData
                      router.push(
                        `/dashboard/quiz/${rowData.id}/${rowData.courseId}/${rowData.packageId}`
                      );
                    },
                  },
              isStudent
                ? undefined
                : {
                    icon: () => <MdDelete />,
                    tooltip: "Delete Quiz",
                    onClick: (_event, rowData) => {
                      deleteQuiz({ id: rowData.id });
                    },
                  },
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </Dashboard>
      </LoadingOverlayWrapper>
    </>
  );
};

export default withPermissions(["instructor", "admin", "student"])(Quizzes);
