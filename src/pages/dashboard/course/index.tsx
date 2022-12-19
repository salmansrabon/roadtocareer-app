import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { resetServerContext } from "react-beautiful-dnd";
import { Button, Backdrop, CircularProgress, Modal } from "@material-ui/core";
import { MdAdd, MdEdit, MdPeopleAlt, MdDeleteForever } from "react-icons/md";
import { useGetCoursesQuery, useGetPaymentQuery} from "../../../state/services";
import { useAddPackageMutation } from "../../../state/services";
import { withAuth, Head, Dashboard, MaterialTable, Alert } from "../../../components";
import { useSeatchList } from "../../../hooks/useSearchList";
import { HookAutoComplete, useDialog, useHookForm } from "mui-react-hook-form-plus";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { LoginInput, LoginInputBlock } from "../../login";
import { useGetPackagesQuery, useDeleteCourseMutation } from "../../../state/services";
import withPermissions from "../../../components/withPermissions";
import { useUser } from "../../../hooks/useUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { packageSchema } from "../../../helpers";
import { course } from "../../../state";

const defaultValues = {
  courseTitle: null as string | null,
  batch: null as string | null,
  id: null as string | null,
};
type DefaultValues = typeof defaultValues;

const Courses = () => {
  const router = useRouter();

  const { role } = useUser();
  const [message, setMessage] = React.useState("");

  const { query } = router;
  const [err, setErr] = React.useState("");

  const [filterRef, setFilterRef] = React.useState<Partial<DefaultValues>>({});
  const { isFetching, isLoading, isError, data, error, refetch: refetchList } = useGetCoursesQuery(filterRef);
  const [removeCourse, editRmvState] = useDeleteCourseMutation();
  const [courseId, setCourseId] = React.useState(null);
  const [rmvOpen, setROpen] = React.useState(false);

  const handleRmvClose = () => {
    setCourseId(null)
    setROpen(false);
  };
  const handleRmvClick = (event, rowData) => {
    setCourseId(rowData);
    setROpen(true);
  };
  const handleRmvCourse = (e) => {
    e.preventDefault();
    const stData = {
      id: courseId?.courseId,
    };
    try {
      removeCourse(stData)
        .unwrap()
        .then((payload) => {
          setErr("");
          setMessage("Remove course successfull.");
          refetchList();
          
        })
        .catch((error) => {
          setMessage('');
          setErr("Remove course unsuccessfull! Please try again..");
          // console.log(err);
        });
    } catch (e) {
      // console.log("error");
    }

    handleRmvClose();
  };
  const tableData = data?.map((course) => {
    // console.log(course)
    // let {data: packagesData, isLoading: isPackageLoading} = useGetPackagesQuery({courseId: course.id});
    // console.log('hello')
    // console.log(packagesData)
    // let price = packagesData?.[packagesData?.length -1];
    const price = JSON.parse(course.price);
    return {
      courseId: course.id,
      batch: course.batch,
      courseTitle: course.courseTitle,
      feeStudent: price?.[0]?.studentFee ?? 0,
      feeJobHolder: price?.[0]?.jobHolderFee ?? 0,
    };
  });

  const { registerState } = useSeatchList({
    setFilterRef,
    listData: data,
    defaultValues,
  });

  const courses = data?.map((student: any) => student.courseTitle) ?? [];
  const courseIds = data?.map((student: any) => student.id) ?? [];
  const batches = data?.map((student: any) => `${student.batch}`) ?? [];

  const courseIdsUnique = [...(new Set<string>(courseIds) as any)];
  const coursesUnique = [...(new Set<string>(courses) as any)];
  const batchesUnique = [...(new Set<string>(batches) as any)].sort((a, b) => a - b);

  const {
    register: formRegister,
    setValue,
    getValues,
  } = useHookForm({
    defaultValues: {
      package: {
        packageName: "",
        studentFee: 0,
        jobHolderFee: 0,
        courseId: "",
      },
    },
    resolver: yupResolver(packageSchema),
  });

  const { register, open, close } = useDialog();

  const [addPackage, { isLoading: isPackageLoading }] = useAddPackageMutation();

  return (
    <>
      <Backdrop className="z-50" open={isFetching || isPackageLoading || isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog {...register()} className="dark:bg-dark-600/50 dark:text-white">
        <DialogTitle className="bg-lime-600 p-5 text-black dark:bg-neutral-800 dark:text-white">
          Add Package
        </DialogTitle>
        <DialogContent className="p-5 dark:bg-neutral-600 dark:text-white">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="packageName" className="min-w-[100px] flex-shrink-0">
                  Package Name
                </label>
                <LoginInput
                  id="packageName"
                  className="p-2 dark:text-white"
                  placeholder="Package Name"
                  {...formRegister("package.packageName", { required: true })}
                />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="studentFee" className="min-w-[100px] flex-shrink-0">
                  Student Fee
                </label>
                <LoginInput
                  type="number"
                  id="studentFee"
                  className="p-2 dark:text-white"
                  placeholder="0"
                  {...formRegister("package.studentFee", { required: true })}
                />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="jobHolderFee" className="min-w-[100px] flex-shrink-0">
                  Job Holder Fee
                </label>
                <LoginInput
                  type="number"
                  id="jobHolderFee"
                  className="p-2 dark:text-white"
                  placeholder="0"
                  {...formRegister("package.jobHolderFee")}
                />
              </LoginInputBlock>
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                if (getValues("package").packageName != "") {
                  addPackage(getValues("package"))
                    .unwrap()
                    .then((payLoad) => {
                      //   router.push({
                      //   pathname: "/dashboard/packages",
                      //   query: { message:"Package added succesfully." },
                      // })
                      // console.log(payLoad);
                  
                      setMessage("Package Added Successfully");
                      close(e);
                    })
                    .catch((err) => {
                      setErr(err?.data?.message)
                    });
                      close(e);
                }
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Head title="Course" />
      <Dashboard>
        <div className="mb-6 flex items-center justify-between">
          <h5>Course</h5>
          {role === "admin" && (
            <Link href="/dashboard/course/add" passHref>
              <Button variant="contained" color="primary">
                Add Course
              </Button>
            </Link>
          )}
        </div>

        <div className="mb-4 bg-white p-4">
          <Grid container gap={2}>
            <HookAutoComplete
              gridProps={{
                xs: 6,
                md: 3,
              }}
              {...registerState("id")}
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
                label: "Course ID",
              }}
            />
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
          title="All Courses"
          columns={[
            { title: "Course ID", field: "courseId" },
            { title: "Batches", field: "batch" },
            { title: "Course Title", field: "courseTitle" },
            { title: "Fee (Student)", field: "feeStudent" },
            { title: "Fee (JobHolder)", field: "feeJobHolder" },
          ]}
          data={tableData}
          actions={[
            {
              icon: () => <MdEdit />,
              tooltip: "Edit Course",
              onClick: (_event, rowData) =>
                router.push(`/dashboard/course/edit/${rowData.courseId}`),
              disabled: role !== "admin",
            },
            {
              icon: () => <MdPeopleAlt />,
              tooltip: "Add Student",
              onClick: (_event, rowData) => {
                router.push(`/enroll/${rowData.courseId}`);
              },
              disabled: role !== "admin",
            },
            {
              icon: () => <MdAdd />,
              tooltip: "Add Package",
              onClick: (_event, rowData) => {
                setValue("package.courseId", rowData.courseId);
                open();
              },
              disabled: role !== "admin",
            },
            {
              icon: () => <MdDeleteForever />,
              tooltip: "Remove Course",
              onClick: (event, rowData) => {
                handleRmvClick(event, rowData);
              },
              disabled: role !== "admin",
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
        {message != "" && <Alert variant="success" message={message} />}
        {err != "" && <Alert variant="error" message={err} />}
        {/* {isError && <Alert variant="error" message={(error as any)?.data?.message} />} */}
        {/* {editState.isError && <Alert variant="error" message={editState.error} />} */}

        {query.message && <Alert variant="success" message={query.message} />}
        {isError && <Alert variant="error" message={(error as any)?.data?.message} />}
        <Modal
          open={rmvOpen}
          onClose={handleRmvClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="grid h-full  grid-cols-1 place-content-center place-items-center ">
            <div className="w-[500px] justify-self-center">
              <div className="modal-dialog modal-dialog-centered pointer-events-none relative w-auto">
                <div className="modal-content pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-dark-400 dark:text-white">
                  <div className="modal-header  flex flex-shrink-0 items-center justify-between rounded-t-md border-b border-gray-200 bg-red-400 p-4 text-black">
                    <h5
                      className="bg text-xl font-medium leading-normal text-black dark:text-white"
                      id="exampleModalScrollableLabel"
                    >
                      Are you sure?
                    </h5>
                  </div>
                  <div className="modal-body  relative p-4">
                    <p>
                      Are you sure wanted to delete the {courseId?.courseTitle} course of batch {courseId?.batch}.
                    </p>
                  </div>
                  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t border-gray-200 p-4">
                    <button
                      type="button"
                      className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg"
                      onClick={handleRmvClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="ml-1 inline-block rounded bg-red-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                      onClick={handleRmvCourse}
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
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

export default withPermissions(["admin", "instructor"])(Courses);
