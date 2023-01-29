import React from "react";
import { resetServerContext } from "react-beautiful-dnd";
import { format } from "date-fns";
import { Backdrop, CircularProgress, Modal } from "@material-ui/core";
import { withAuth, Head, Dashboard, Alert, MaterialTable } from "../../components";
import { useGetAllPaymentsQuery } from "../../state/services";
import { Grid } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";

import { useDeletePaymentMutation } from "../../state/services";
import { HookAutoComplete } from "mui-react-hook-form-plus";
import { useSeatchList } from "../../hooks/useSearchList";
import withPermissions from "../../components/withPermissions";
import { useUser } from "../../hooks/useUser";

const defaultValues = {
  courseId: null as string | null,
  studentId: null as string | null,
  name: null as string | null,
  batch: null as string | null,
};
type DefaultValues = typeof defaultValues;

const Payment = () => {
  const [filterRef, setFilterRef] = React.useState<Partial<DefaultValues>>({});
  const [showDues, setShowDues] = React.useState(false);
  const {
    isLoading,
    isFetching,
    isError,
    data,
    error,
    refetch: refetchList,
  } = useGetAllPaymentsQuery({ filterRef, showDues });
  const [message, setMessage] = React.useState("");
  const [err, setError] = React.useState("");
  const { role } = useUser();
  const [removeStudent, editRmvState] = useDeletePaymentMutation();
  const [paymentId, setPaymentId] = React.useState(null);
  const [rmvOpen, setROpen] = React.useState(false);

  const handleRmvClose = () => {
    setPaymentId(null);
    setROpen(false);
  };
  const handleRmvClick = (event, rowData) => {
    setPaymentId(rowData);
    setROpen(true);
  };
  const handleRmvPayment = (e) => {
    e.preventDefault();
    const stData = {
      id: paymentId?.id,
    };
    try {
      removeStudent(stData)
        .unwrap()
        .then((payload) => {
          setMessage("Remove payment successfull.");
          refetchList();
        })
        .catch((error) => {
          setError("Remove payment unsuccessfull! Please try again..");
          // console.log(err);
        });
    } catch (e) {
      // console.log("error");
    }

    handleRmvClose();
  };

  const payments = React.useMemo(() => {
    return data?.map((payment: any) => ({
      ...payment,
      updatedAt: format(new Date(payment.updatedAt), "dd MMM yyyy, hh:mm a"),
    }));
  }, [data]);

  const { registerState } = useSeatchList({
    setFilterRef,
    listData: payments,
    defaultValues,
  });
  const names = data?.map((payment: any) => payment.name) ?? [];
  const studentIds = data?.map((payment: any) => payment.studentId) ?? [];
  const courseIds = data?.map((payment: any) => payment.courseId) ?? [];
  const batches = data?.map((payment: any) => `${payment.batch}`) ?? [];

  const courseIdsUnique = [...(new Set<string>(courseIds) as any)];
  const studentIdsUnique = [...(new Set<string>(studentIds) as any)];
  const namesUnique = [...(new Set<string>(names) as any)];
  const batchesUnique = [...(new Set<string>(batches) as any)].sort((a, b) => a - b);
  const handleChecked = (e) => {
    const { checked } = e.target;
    setShowDues(checked);
    refetchList();
  };
  return (
    <>
      <Head title="Payments" />
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
              {...registerState("courseId")}
              autocompleteProps={{
                sx: {
                  "& .MuiAutocomplete-endAdornment": {
                    top: 2,
                  },
                },
                options: courseIdsUnique,
                isOptionEqualToValue: (option, value) => option === value,
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
              {...registerState("studentId")}
              autocompleteProps={{
                sx: {
                  "& .MuiAutocomplete-endAdornment": {
                    top: 2,
                  },
                },
                options: studentIdsUnique,
                isOptionEqualToValue: (option, value) => option === value,
              }}
              textFieldProps={{
                label: "Student ID",
              }}
            />
            <HookAutoComplete
              gridProps={{
                xs: 6,
                md: 3,
              }}
              {...registerState("name")}
              autocompleteProps={{
                sx: {
                  "& .MuiAutocomplete-endAdornment": {
                    top: 2,
                  },
                },
                options: namesUnique,
                isOptionEqualToValue: (option, value) => option === value,
              }}
              textFieldProps={{
                label: "Student Name",
              }}
            />
            <HookAutoComplete
              gridProps={{
                xs: 6,
                md: 2,
              }}
              {...registerState("batch")}
              autocompleteProps={{
                sx: {
                  "& .MuiAutocomplete-endAdornment": {
                    top: 2,
                  },
                },
                options: batchesUnique,
                isOptionEqualToValue: (option, value) => option === value,
              }}
              textFieldProps={{
                label: "Batch Number",
              }}
            />
            Show Dues
            <input type="checkbox" onChange={handleChecked} />
          </Grid>
        </div>

        <MaterialTable
          title="Payments"
          columns={[
            // { title: "ID", field: "id" },
            { title: "Student ID", field: "studentId" },
            { title: "Course ID", field: "courseId" },
            { title: "Student Name", field: "name" },
            { title: "Batch", field: "batch" },
            { title: "Installment No.", field: "installmentNo" },
            { title: "Installment Amount", field: "installmentAmount" },
            { title: "Discount", field: "discount" },
            { title: "Paid Amount", field: "paidAmount" },
            { title: "Due", field: "due" },
            { title: "Remarks", field: "comment", filtering: false },
            { title: "Datetime", field: "updatedAt" },
          ]}
          data={payments}
          actions={[
            {
              icon: () => <MdDeleteForever />,
              tooltip: "remove payment",
              onClick: (event, rowData) => {
                handleRmvClick(event, rowData);
              },
              disabled: role !== "admin",
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            filtering: true,
          }}
        />
        {message != "" && <Alert variant="success" message={message} />}
        {err != "" && <Alert variant="error" message={err} />}
        {isError && <Alert variant="error" message={(error as any)?.data?.message!} />}
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
                      Are you sure wanted to delete the {paymentId?.installmentNo} of student{" "}
                      {paymentId?.name} with id {paymentId?.studentId}.
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
                      onClick={handleRmvPayment}
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

export default withPermissions(["admin"])(Payment);
