import React from "react";
import { useRouter } from "next/router";
import { resetServerContext } from "react-beautiful-dnd";
import { format } from "date-fns";
import { MdEdit, MdPayment, MdDeleteForever } from "react-icons/md";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { withAuth, Head, Dashboard, Alert, MaterialTable } from "../../../components";
import { useGetStudentQuery,useGetStudentsQuery,useAddAttendanceMutation } from "../../../state/services";
import { HookAutoComplete } from "mui-react-hook-form-plus";
import { Box, Button, Grid, Modal } from "@mui/material";
import { useSeatchList } from "../../../hooks/useSearchList";
import withAdmin from "../../../components/WithAdmin";
import withPermissions from "../../../components/withPermissions";
import { useUser } from "../../../hooks/useUser";

const defaultValues = {
  courseTitle: null as string | null,
  batch: null as string | null,
  isEnrolled: null as boolean | null,
  isValid: null as boolean | null,
};

type DefaultValues = typeof defaultValues;
const Attendances = () => {
  const router = useRouter();
  const { id, role } = useUser();

  const [filterRef, setFilterRef] = React.useState<Partial<DefaultValues>>({});
  const [addButton, setAddButton] = React.useState()
  const [studentId, setStudentId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [rmvOpen, setROpen] = React.useState(false);
  const [addAttendanceStudent, addAttendanceMutation] = useAddAttendanceMutation();
  const { isLoading, isFetching, isError, data, error, refetch: refetchList } = role == 'student'?useGetStudentQuery(
    {
      id,
    },
    {
      skip: role?.toLowerCase() !== "student",
    }
  ):useGetStudentsQuery(filterRef);
  // console.log(data);
  // console.log('heyy')
  const [message, setMessage] = React.useState("");
  const [err, setError] = React.useState("");

  const studentsData = React.useMemo(() => {
   
    return role == 'student'? JSON.parse(data?.attendances??'[]')?.map((v:any)=>({
      'name':data.name,
      'date':new Date(v).toDateString(),
      'time':new Date(v).toLocaleTimeString(),

    })):data?.map((student: any) => ({
      ...student,
      enrolledAt: format(new Date(student.createdAt), "dd MMM yyyy, hh:mm a"),
    }));
  }, [data]);

  const { registerState } = useSeatchList({
    setFilterRef,
    listData: studentsData,
    defaultValues,
  });

  const courses = studentsData?.map((student: any) => student.courseTitle) ?? [];
  const batches = studentsData?.map((student: any) => `${student.batch}`) ?? [];

  const coursesUnique = [...(new Set<string>(courses) as any)];
  const batchesUnique = [...(new Set<string>(batches) as any)].sort((a, b) => a - b);

  const handleClose = () => setOpen(false);
  const handleRmvClose = () => setROpen(false);

  const handleClick = (event, rowData) => {
    setStudentId(rowData);
    setOpen(true);
  };
  const handleRmvClick = (event, rowData) => {
    setStudentId(rowData);
    setROpen(true);
  };

  return (
    <>
      <Head title="Students" hasMaterialTable={undefined} />
      <Dashboard>
        <Backdrop className="z-50" open={isFetching || isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {role=="admin"?
        <>
        <div className="mb-4 bg-white p-4">
          <Grid container gap={2}>
            <HookAutoComplete
              gridProps={{
                xs: 6,
                md: 3,
              }}
              {...registerState("courseTitle")}
              autocompleteProps={{
                options: coursesUnique,
                isOptionEqualToValue: (option, value) => option === value,
                sx: {
                  "& .MuiAutocomplete-endAdornment": {
                    top: 2,
                  },
                },
              }}
              textFieldProps={{
                label: "Course Name",
              }}
            />

            <HookAutoComplete
              gridProps={{
                xs: 6,
                md: 2,
              }}
              {...registerState("batch")}
              autocompleteProps={{
                options: batchesUnique,
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
            { title: "Batch", field: "batch" },
            { title: "Course Title", field: "courseTitle" },
            {
              title: "Name",
              field: "name",
              width: "300%",
            },
            {
              title: "Percentage",
              field: "percentage",
            }
          ]}
          data={studentsData}
          // actions={[
          // ]}
          options={{
            actionsColumnIndex: -1,
            filtering: true,
            // tableLayout: "fixed"
          }}
        />
        </>:
        <>
        <div className="mb-6 flex items-center justify-between">
          <h5>Your have {studentsData?.length??0}% attendance.</h5>
          
              <Button variant="contained" color="primary">
                Give Attendance
              </Button>
        </div>
        <MaterialTable
          title="All Students"
          columns={[
            {
              title: "Name",
              field: "name",
              width: "300%",
            },
            {
              title: "Date",
              field: "date",
            },
            {
              title: "Time",
              field: "time",
            },
          ]}
          data={studentsData}
          // actions={[
          // ]}
          options={{
            actionsColumnIndex: -1,
            filtering: true,
            // tableLayout: "fixed"
          }}
        />
        </>
        }
        {message != "" && <Alert variant="success" message={message} />}
        {err != "" && <Alert variant="error" message={err} />}
        {isError && <Alert variant="error" message={(error as any)?.data?.message} />}
        {/* {editState.isError && <Alert variant="error" message={editState.error} />} */}
      </Dashboard>
    </>
  );
};

export const getServerSideProps = ({ query }) => {
  resetServerContext();
  return {
    props: {},
  };
};

export default withPermissions(["admin", "instructor", "student"])(Attendances);

