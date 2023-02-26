import React from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { HookAutoComplete, useDialog } from "mui-react-hook-form-plus";

import withPermissions from "../../../components/withPermissions";
import { Dashboard, Head, MaterialTable } from "../../../components";
import {
  useDeleteQuizMutation,
  useGetMarksQuery,
  useGetQuizzesQuery,
} from "../../../state/services";
import { MdDelete, MdEdit } from "react-icons/md";
import { useSeatchList } from "../../../hooks/useSearchList";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { useUser } from "../../../hooks/useUser";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";

const defaultValues = {
  title: null as string | null,
  packageId: null as string | null,
  courseId: null as string | null,
};

type DefaultValues = typeof defaultValues;

const Quizzes = () => {
  const router = useRouter();

  const { id, role } = useUser();
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

  const { register, open, close } = useDialog();

  const [selected, setSelected] = React.useState<any>({});

  const {
    data: studentsWithMarks,
    isLoading: isMarksLaoding,
    isFetching: isMarksFetching,
    refetch,
    status,
  } = useGetMarksQuery({ id: selected?.id }, { skip: !selected?.id });

  const marks = studentsWithMarks?.map((student) => ({
    ...student,
  }));

  const isAllLoading =
    isLoading || isFetching || isDeleteLoading || isMarksLaoding || isMarksFetching;

  React.useEffect(() => {
    if (selected?.id) {
      refetch()
        .unwrap()
        .then(() => {
          open();
        });
    }
  }, [selected]);

  return (
    <>
      <Head title="Quizzes" />

      <Dialog maxWidth="lg" fullWidth {...register()}>
        <DialogTitle>
          <Typography color="primary">{selected?.title}</Typography>
        </DialogTitle>
        <DialogContent>
          <MaterialTable
            title="All Student Marks"
            columns={[
              {
                title: "Student Id",
                field: "studentId",
              },
              {
                title: "Student Name",
                field: "studentName",
              },
              { title: "Course Id", field: "courseId" },
              { title: "Obtained Marks", field: "quizAnswer.marks" },
              { title: "Total Marks", field: "quizAnswer.totalMarks" },
            ]}
            data={marks ?? []}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} variant="contained" color="primary" style={{ marginRight: 20 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <LoadingOverlayWrapper active={isAllLoading}>
        <Dashboard>
          <div className="flex items-center justify-between mb-5">
            <h6>Quizzes</h6>
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
            columns={[
              {
                title: "Title",
                field: "title",
                render: (rowData) => (
                  <Button
                    onClick={() => {
                      setSelected(rowData);
                    }}
                  >
                    <a className="text-blue-500 underline">{rowData.title}</a>
                  </Button>
                ),
              },
              { title: "Description", field: "description" },
              { title: "Course Id", field: "courseId" },
              { title: "Package Id", field: "packageId" },
              { title: "Start Date", field: "quizStartDate" },
              { title: "End Date", field: "quizEndDate" },
            ]}
            data={quizzes}
            actions={[
              {
                icon: () => <MdEdit />,
                tooltip: "Edit Quiz",
                onClick: (_event, rowData) => {
                  // do something with the rowData
                  router.push(
                    `/dashboard/quiz/${rowData.id}/${rowData.courseId}/${rowData.packageId}`
                  );
                },
              },
              {
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

export default withPermissions(["instructor", "admin"])(Quizzes);
