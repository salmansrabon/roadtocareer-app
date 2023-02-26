import React from "react";
import { useRouter } from "next/router";
import { resetServerContext } from "react-beautiful-dnd";
import { format } from "date-fns";
import { MdAddCircle } from "react-icons/md";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { withAuth, Head, Dashboard, Alert, MaterialTable } from "../../../components";
import {
  useGetStudentQuery,
  useGetStudentsQuery,
  useAddAttendanceMutation,
  useGetCourseQuery,
} from "../../../state/services";
import { HookAutoComplete } from "mui-react-hook-form-plus";
import { Box, Button, Grid, Modal } from "@mui/material";
import { useSeatchList } from "../../../hooks/useSearchList";
import withAdmin from "../../../components/WithAdmin";
import withPermissions from "../../../components/withPermissions";
import { useUser } from "../../../hooks/useUser";
import Typography from "@material-ui/core/Typography";

const MyNewTitle = ({ text, variant }) => (
  <Typography
    variant={variant}
    style={{
      color:'black',
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }}
  >
    {text}
  </Typography>
);

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
  const [studentId, setStudentId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [rmvOpen, setROpen] = React.useState(false);
  const [buttonActive, setButtonActive] = React.useState(true);
  const [addStudentAttendance, addAttendanceMutation] = useAddAttendanceMutation();
  const {
    isLoading,
    isFetching,
    isError,
    data,
    error,
    refetch: refetchList,
  } = role == "student"
    ? useGetStudentQuery(
        {
          id,
        },
        {
          skip: role?.toLowerCase() !== "student",
        }
      )
    : useGetStudentsQuery(filterRef);
  // console.log(data);
  // console.log('heyy')
  const [message, setMessage] = React.useState("");
  const [err, setError] = React.useState("");
  const studentsData = React.useMemo(() => {
    setButtonActive(!(data?.checkValidDate ?? false));
    return role == "student"
      ? JSON.parse(data?.attendances ?? "[]")?.map((v: any) => ({
          name: data.name,
          date: new Date(v).toDateString(),
          time: new Date(v).toLocaleTimeString(),
        }))
      : data?.map((student: any) => ({
          ...student,
          percentage:
            Math.min(Math.round((JSON.parse(student?.attendances ?? "[]").length / 30) * 100), 100) + "%",
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

  const addAttendance = async () => {
    const date = new Date();
    await addStudentAttendance({ id, date })
      .then((payload) => {
        // console.log({...payload});
        // if(payload)
        setMessage("Successfully created");
        setError("");
        refetchList();
      })
      .catch((err) => {
        setError("Sorry! Something went wrong.");
        setMessage("");
      });
  };

  return (
    <>
      <Head title="Students" hasMaterialTable={undefined} />
      <Dashboard>
        <Backdrop className="z-50" open={isFetching || isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {role == "admin" ? (
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
              title="Attendance Table"
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
                },
              ]}
              data={studentsData}
              // actions={[
              // ]}
              options={{
                actionsColumnIndex: -1,
                filtering: true,
                // tableLayout: "fixed",
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF'
                },
              }}
            />
          </>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h5>Your have {studentsData?.length ?? 0}% attendance.</h5>

              <Button
                className="px-6 py-2 text-md transition-colors duration-300 rounded rounded-full shadow-xl text-black bg-violet-500 hover:bg-violet-600 shadow-violet-400/30 dark:text-black dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:shadow-cyan-400/30 disabled:opacity-50"
                variant="contained"
                color="success"
                startIcon={<MdAddCircle />}
                disabled={buttonActive}
                onClick={addAttendance}
              >
                Give Attendance
              </Button>
            </div>
            <MaterialTable
              title={<MyNewTitle variant="h6" text="Attendance Table" />}
              columns={[
                {
                  title: "Name",
                  field: "name",
                  // cellStyle: {
                  //   backgroundColor: '#039be5',
                  //   color: '#FFF'
                  // },
                  // headerStyle: {
                  //   backgroundColor: '#039be5',
                  // }
                },
                {
                  title: "Date",
                  field: "date",
                  // cellStyle: {
                  //   backgroundColor: '#039be5',
                  //   color: '#FFF'
                  // },
                },
                {
                  title: "Time",
                  field: "time",
                  // cellStyle: {
                  //   backgroundColor: '#039be5',
                  //   color: '#FFF'
                  // },
                },
              ]}
              data={studentsData}
              // actions={[
              // ]}
              options={{
                actionsColumnIndex: -1,
                filtering: true,
                // tableLayout: "fixed",
                headerStyle: {
                  text:"bold",
                    fontSize:"18px",
                  backgroundColor: '#01579b',
                  color: '#FFF'
                },
                rowStyle: {
                  backgroundColor: '#039be5',
                  color: '#FFF'
                },
              }}
            />
          </>
        )}
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
