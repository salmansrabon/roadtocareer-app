import React from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { HookAutoComplete } from "mui-react-hook-form-plus";

import withPermissions from "../../../components/withPermissions";
import { Dashboard, Head, MaterialTable } from "../../../components";
import { useGetAssignmentsQuery } from "../../../state/services";
import { MdEdit } from "react-icons/md";
import { useSeatchList } from "../../../hooks/useSearchList";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import {useUser} from '../../../hooks/useUser'
import {
  useGetStudentQuery,
} from "../../../state/services";
const defaultValues = {
  title: null as string | null,
  packageId: null as string | null,
  courseId: null as string | null,
};


type DefaultValues = typeof defaultValues;

const Assignments = () => {
  const router = useRouter();
  const { id, role } = useUser();
  // const getStudentQuery = useGetStudentQuery({ id }, { skip: !id });
  

  const [filterRef, setFilterRef] = React.useState<Partial<DefaultValues>>({});

  const { isLoading, isFetching, data } = useGetAssignmentsQuery({ ...filterRef, id, role });

  const assignments = data?.map((assignment) => ({
    ...assignment,
  }));

  const { registerState } = useSeatchList({
    setFilterRef,
    listData: assignments,
    defaultValues,
  });

  const titles = assignments?.map((assignment: any) => assignment.title) ?? [];
  const packageIds = assignments?.map((assignment: any) => assignment.packageId) ?? [];
  const courseIds = assignments?.map((assignment: any) => assignment.courseId) ?? [];

  const titlesUnique = [...(new Set<string>(titles) as any)];
  const packageIdsUnique = [...(new Set<string>(packageIds) as any)];
  const courseIdsUnique = [...(new Set<string>(courseIds) as any)];

  return (
    <>
      <Head title="Assignments" />

      <LoadingOverlayWrapper active={isLoading || isFetching}>
        <Dashboard>
          <div className="flex items-center justify-between mb-5">
            <h6>Assignments</h6>
            {/* {role === "instructor" && (
              <Button
                onClick={() => {
                  router.push(`/assignments/create/${rowData.courseId}/${rowData.packageId}`);
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
            columns={[
              { title: "Title", field: "title" },
              { title: "Description", field: "description" },
              { title: "Course Id", field: "courseId" },
              { title: "Package Id", field: "packageId" },
              { title: "Start Date", field: "assignmentStartDate" },
              { title: "End Date", field: "assignmentEndDate" },
            ]}
            data={assignments}
            actions={[
              {
                icon: () => <MdEdit />,
                tooltip: "Edit Assigmnet",
                onClick: (_event, rowData) => {
                  // do something with the rowData
                  router.push(
                    `/dashboard/assignment/${rowData.id}/${rowData.courseId}/${rowData.packageId}`
                  );
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

export default withPermissions(["instructor", "admin", "student"])(Assignments);
