import React from "react";
import { useRouter } from "next/router";
import { resetServerContext } from "react-beautiful-dnd";
import { format } from "date-fns";
import { MdEdit, MdPayment, MdDeleteForever } from "react-icons/md";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { withAuth, Head, Dashboard, Alert, MaterialTable } from "../../../components";
import { useGetStudentsQuery } from "../../../state/services";
import { HookAutoComplete } from "mui-react-hook-form-plus";
import { Box, Button, Grid, Modal } from "@mui/material";
import { useSeatchList } from "../../../hooks/useSearchList";
import { useAddPaymentMutation, useDeleteStudentMutation } from "../../../state/services";
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
const Students = () => {
  const router = useRouter();
  const { role } = useUser();

  const [filterRef, setFilterRef] = React.useState<Partial<DefaultValues>>({});
  const [studentId, setStudentId] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [rmvOpen, setROpen] = React.useState(false);

  const { isLoading, isFetching, isError, data, error, refetch: refetchList } = useGetStudentsQuery(filterRef);
  const [addPayment, editState] = useAddPaymentMutation();
  const [removeStudent, editRmvState] = useDeleteStudentMutation();
  const [installment, setInstallment] = React.useState<null | number>();
  const [discount, setDiscount] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [due, setDue] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [installmentNo, setInstallmentNo] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [err, setError] = React.useState("");

  const studentsData = React.useMemo(() => {
    return data?.map((student: any) => ({
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
  const handlePayment = (e) => {
    e.preventDefault();
    const paymentData = {
      id: studentId?.id,
      courseId: studentId?.courseId,
      installmentNo: installmentNo,
      installmentAmount: installment,
      discount: discount,
      paidAmount: amount,
      due: due,
      comment: comment,
    };
    // console.log(paymentData);
    try {
      addPayment(paymentData)
        .unwrap()
        .then((payload) => setMessage("Add payment successfull"))
        .catch((error) => setError("Payment unsuccessfull! Please try again.."));
    } catch (e) {
      // console.log("error");
    }

    handleClose();
  };
  const handleRmvStudent = (e) => {
    e.preventDefault();
    const stData = {
      id: studentId?.id,
    };
    console.log(stData);
    try {
      removeStudent(stData)
        .unwrap()
        .then((payload) => {
          setMessage("Remove student successfull.");
          refetchList();
        })
        .catch((error) => setError("Remove student unsuccessfull! Please try again.."));
    } catch (e) {
      // console.log("error");
    }
    handleRmvClose();
  };

  return (
    <>
      <Head title="Students" hasMaterialTable={undefined} />
      <Dashboard>
        <Backdrop className="z-50" open={isFetching || isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
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

            <HookAutoComplete
              gridProps={{
                xs: 6,
                md: 3,
              }}
              {...registerState("isEnrolled")}
              autocompleteProps={{
                options: ["1", "0"],
                getOptionLabel: (option) => (option == "1" ? "true" : "false"),

                isOptionEqualToValue: (option, value) => option === value,
                sx: {
                  "& .MuiAutocomplete-endAdornment": {
                    top: 2,
                  },
                },
              }}
              textFieldProps={{
                label: "Enrollment Status",
              }}
            />
            <HookAutoComplete
              gridProps={{
                xs: 6,
                md: 3,
              }}
              {...registerState("isValid")}
              autocompleteProps={{
                options: ["1", "0"],
                getOptionLabel: (option) => (option == "1" ? "true" : "false"),
                isOptionEqualToValue: (option, value) => option === value,
                sx: {
                  "& .MuiAutocomplete-endAdornment": {
                    top: 2,
                  },
                },
              }}
              textFieldProps={{
                label: "Validity Status",
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
              render: (rowdata) => {
                return (
                  <button
                    className="text-indigo-500 underline"
                    onClick={(e) => handleClick(e, rowdata)}
                  >
                    {rowdata.name}
                  </button>
                );
              },
              width: "300%",
            },
            { title: "Email", field: "email" },
            { title: "Mobile", field: "mobile" },
            { title: "Package", field: "package" },
            { title: "University", field: "university", filtering: false },
            { title: "Profession", field: "profession", filtering: false },
            // { title: "Company", field: "company" },
            // { title: "Experience", field: "experience" },
            { title: "Enrollment Status", field: "isEnrolled" },
            { title: "Validity Status", field: "isValid" },
            // { title: "Enrolled At", field: "enrolledAt" },
          ]}
          data={studentsData}
          actions={[
            {
              icon: () => <MdEdit />,
              tooltip: "Edit Student",
              onClick: (event, rowData) =>
                router.push(
                  `/dashboard/student/edit/${rowData?.id}?courseId=${rowData?.courseId}&package=${rowData?.package}`
                ),
            },
            {
              icon: () => <MdPayment />,
              tooltip: "Add Payment",
              onClick: (event, rowData) => {
                handleClick(event, rowData);
              },
            },
            {
              icon: () => <MdDeleteForever />,
              tooltip: "Remove Student",
              onClick: (event, rowData) => {
                handleRmvClick(event, rowData);
              },
              disabled: role !== "admin",
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            filtering: true,
            // tableLayout: "fixed"
          }}
          // detailPanel={[
          //   {
          //     // icon: "Show Name",
          //     tooltip: "Show Surname",
          //     render: (rowData) => {
          //       return (
          //         <div
          //           style={{
          //             fontSize: 14,
          //             // textAlign: "center",
          //             color: "black",
          //             backgroundColor: "#00000",
          //           }}
          //         >
          //           Name: {rowData.name} Email: {rowData.email} Mobile: {rowData.mobile}
          //          <br/>
          //          University:{rowData.university} Profession: {rowData.profession}
          //         </div>
          //       );
          //     },
          //   },
          // ]}
        />
        {message != "" && <Alert variant="success" message={message} />}
        {err != "" && <Alert variant="error" message={err} />}
        {isError && <Alert variant="error" message={(error as any)?.data?.message} />}
        {/* {editState.isError && <Alert variant="error" message={editState.error} />} */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="Student information and add payment."
          aria-describedby="This modal will show student information and add payment of individual student."
        >
          <div className="flex h-screen items-center justify-center text-blue-400">
            <div className="mt-5 flex max-h-screen w-5/6 flex-col items-center justify-center self-center overflow-y-auto bg-dark-400">
              <form className="flex-col-3 flex w-full flex-wrap gap-3 p-5">
                <div className="flex-col-3 flex w-full flex-wrap  justify-center gap-3 border-2 border-solid border-teal-300 bg-teal-300 p-1">
                  <p className="text-xl font-bold text-black">Student Information</p>
                </div>
                <div className="flex-col-3 flex w-full flex-wrap gap-3 p-5">
                  <label className="relative mt-3 flex-1 flex-col">
                    <span className="mb-3 font-bold">Course Name</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="courseName"
                      placeholder="course name"
                      value={studentId?.courseTitle}
                      readOnly
                    />
                  </label>

                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Student id</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="studentId"
                      placeholder="student id"
                      value={studentId?.id}
                      readOnly
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Student name</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="studentName"
                      placeholder="student name"
                      value={studentId?.name}
                      readOnly
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Batch no</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="batchNo"
                      placeholder="Batch No"
                      value={studentId?.batch}
                      readOnly
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Profession</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="profession"
                      placeholder="profession"
                      value={studentId?.profession}
                      readOnly
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Company</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={studentId?.company}
                      readOnly
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Experience</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="experience"
                      placeholder="Experience"
                      value={studentId?.experience}
                      readOnly
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">City</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="city"
                      placeholder="city"
                      value={studentId?.city}
                      readOnly
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Enrolled At</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="enrolled at"
                      placeholder="enrolled at"
                      value={studentId?.enrolledAt}
                      readOnly
                    />
                  </label>
                </div>
                <div className="flex-col-3 flex w-full flex-wrap justify-center gap-3 border-2 border-solid border-teal-300 bg-teal-300 p-1 ">
                  <p className="0 text-xl font-bold text-black">Add New Payment</p>
                </div>

                <div className="flex-col-3 flex w-full flex-wrap gap-3 p-5">
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Installment no</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="installment"
                      placeholder="installment"
                      value={installmentNo}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setInstallmentNo(Number(e.target.value));
                      }}
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Installment Amount</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="installment"
                      placeholder="installment"
                      value={installment}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setInstallment(Number(e.target.value));
                      }}
                    />
                  </label>

                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Discount</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="discount"
                      placeholder="Discount"
                      value={discount}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setDiscount(Number(e.target.value));
                      }}
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Paid Amount</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="amount"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setAmount(Number(e.target.value));
                      }}
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Due Amount</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="due"
                      placeholder="Due"
                      value={due}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setDue(Number(e.target.value));
                      }}
                    />
                  </label>
                  <label className="relative flex flex-1 flex-col">
                    <span className="mb-3 font-bold">Comment</span>
                    <input
                      className="peer rounded-md border-2 border-gray-200 py-2 pr-2 text-black placeholder-gray-300"
                      type="text"
                      name="comment"
                      placeholder="comment"
                      value={comment}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        setComment(e.target.value);
                      }}
                    />
                  </label>

                  <div className="mt-2 mb-2 flex w-full justify-around">
                    <button
                      className="rounded-xl bg-green-600 px-4 py-3 text-white"
                      onClick={handlePayment}
                    >
                      Submit
                    </button>
                    <button
                      className="rounded-xl bg-red-600 px-4 py-3 text-white"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
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
                      Are you sure wanted to delete the student with id {studentId?.id} and name{" "}
                      {studentId?.name}
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
                      onClick={handleRmvStudent}
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

export default withPermissions(["admin", "instructor"])(Students);
