import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { resetServerContext } from "react-beautiful-dnd";
import { Button, Backdrop, CircularProgress, Modal } from "@material-ui/core";
import { MdAdd, MdAssignment, MdEdit, MdSchool, MdDeleteForever } from "react-icons/md";
import { useAddModuleMutation, useGetPackagesQuery } from "../../../state/services";
import { useAddPackageMutation } from "../../../state/services";
import { withAuth, Head, Dashboard, MaterialTable, Alert } from "../../../components";
import { useSeatchList } from "../../../hooks/useSearchList";
import { HookAutoComplete, useDialog, useHookForm } from "mui-react-hook-form-plus";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { LoginInput, LoginInputBlock, LoginTextArea } from "../../login";
import {
  useEditPackageMutation,
  useGetPackageQuery,
  useDeletePackageMutation,
} from "../../../state/services/packageApi";
import { useFieldArray } from "react-hook-form";
import { Add, Remove } from "@mui/icons-material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useUser } from "../../../hooks/useUser";

const defaultValues = {
  packageName: null as string | null,
  courseId: null as string | null,
};
type DefaultValues = typeof defaultValues;

const Packages = () => {
  const router = useRouter();
  const { query } = router;
  const { register, open, close } = useDialog();
  const moduleModal = useDialog();
  const [err, setErr] = React.useState("");
  const [message, setMessage] = React.useState("");
  const { role } = useUser();
  const [removePackage, editRmvState] = useDeletePackageMutation();
  const [packageId, setPackageId] = React.useState(null);
  const [rmvOpen, setROpen] = React.useState(false);

  const handleRmvClose = () => {
    setPackageId(null);
    setROpen(false);
  };
  const handleRmvClick = (event, rowData) => {
    setPackageId(rowData);
    setROpen(true);
  };
  const handleRmvPackage = (e) => {
    e.preventDefault();
    const stData = {
      id: packageId?.id,
    };
    try {
      removePackage(stData)
        .unwrap()
        .then((payload) => {
          setErr("");
          setMessage("Remove package successfull.");
        })
        .catch((error) => {
          setMessage("");
          setErr("Remove package unsuccessfull! Please try again..");
          // console.log(err);
        });
    } catch (e) {
      // console.log("error");
    }

    handleRmvClose();
  };

  const [filterRef, setFilterRef] = React.useState<Partial<DefaultValues>>({});

  const {
    register: formRegister,
    setValue,
    getValues,
    control,
  } = useHookForm({
    defaultValues: {
      package: {
        packageName: "",
        studentFee: "",
        jobHolderFee: "",
        courseId: "",
      },
      module: {
        module: [{ title: "", description: "" }] as { title: string; description: string }[],
        courseId: "",
        packageId: "",
      },
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "module.module",
  });

  const {
    isFetching,
    isLoading,
    isError,
    data,
    error,
    refetch: refetchList,
  } = useGetPackagesQuery(filterRef);

  const tableData = data?.map((_package) => {
    return { ..._package };
  });

  const [activePackageId, setActivePackageId] = React.useState<any | string>(null);

  const { data: packageData, isFetching: isPackageFetching } = useGetPackageQuery(
    { id: activePackageId?.id },
    {
      skip: !activePackageId,
    }
  );

  React.useEffect(() => {
    if (activePackageId && !!packageData) {
      setValue("package", packageData);
      open();
    }
  }, [activePackageId, packageData]);

  const { registerState } = useSeatchList({
    setFilterRef,
    listData: data,
    defaultValues,
  });

  const packageNames = data?.map((_package: any) => _package.packageName) ?? [];
  const courseIds = data?.map((_package: any) => _package.courseId) ?? [];

  const courseIdsUnique = [...(new Set<string>(courseIds) as any)];
  const packageNamesUnique = [...(new Set<string>(packageNames) as any)];

  const [editPackage, { isLoading: isPackageLoading }] = useEditPackageMutation();

  const [addModule, { isLoading: isModuleLoading }] = useAddModuleMutation();

  return (
    <>
      <Backdrop
        className="z-[9999]"
        open={isFetching || isPackageFetching || isPackageLoading || isLoading || isModuleLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog {...moduleModal.register({})}>
        <DialogTitle className=" border-b-2 border-solid border-black bg-lime-600 text-center text-black dark:border-white dark:bg-neutral-700 dark:text-white">
          Add Module
        </DialogTitle>
        <DialogContent className="p-5 text-black dark:bg-neutral-600 dark:text-white">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <p className="mb-2 text-lg text-black dark:text-white">
                Module{" "}
                <Add
                  onClick={() => append({ title: "", description: "" })}
                  className="md-slate-300 cursor-pointer rounded text-black dark:text-white"
                />
              </p>
              {fields.map((field, index) => (
                <Grid container spacing={2} key={field.id}>
                  <Grid item xs={5}>
                    <LoginTextArea
                      className="w-full p-2"
                      placeholder="Title"
                      required={true}
                      {...formRegister(`module.module.${index}.title`)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LoginTextArea
                      placeholder="Description"
                      className="w-full p-2"
                      required={true}
                      {...formRegister(`module.module.${index}.description`)}
                    />
                  </Grid>
                  <Grid className="flex items-center justify-evenly" item xs={1}>
                    {index !== 0 && (
                      <Remove
                        onClick={() => remove(index)}
                        className="cursor-pointer rounded bg-slate-300 text-black"
                      />
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                const values = getValues("module");

                values.module = values.module.filter((module: any) => module.title !== "");

                const module = JSON.stringify(values.module);

                addModule({
                  module,
                  courseId: values.courseId,
                  packageId: values.packageId,
                })
                  .unwrap()
                  .then(() => {
                    // router.push({
                    //   pathname: "/dashboard/modules",
                    //   query: { message:"Module added succesfully." },
                    // });
                    // close(e);
                    moduleModal.close(e);

                    setMessage("Module added successfully.");
                    setErr("");
                    setActivePackageId(null);
                  })
                  .catch((err) => {
                    setMessage("");
                    setErr("Something went wrong. Please try again...");
                  });
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Dialog
        {...register({
          onClose: () => {
            setActivePackageId(null);
          },
        })}
      >
        <DialogTitle className="bg-lime-600 p-5 text-black dark:bg-neutral-800 dark:text-white dark:text-white">
          Edit Package
        </DialogTitle>
        <DialogContent className=" p-5 dark:bg-neutral-600 dark:text-white">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="packageName" className="min-w-[100px] flex-shrink-0">
                  Package Name
                </label>
                <LoginInput
                  id="package.packageName"
                  className="p-2 text-black dark:text-white"
                  {...formRegister("package.packageName")}
                />
              </LoginInputBlock>
            </Grid>
            <Grid item xs={12}>
              <LoginInputBlock>
                <label htmlFor="packageFee" className="min-w-[100px] flex-shrink-0">
                  Student Fee
                </label>
                <LoginInput
                  type="number"
                  id="package.studentFee"
                  className="p-2 text-black dark:text-white"
                  {...formRegister("package.studentFee")}
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
                  id="package.jobHolderFee"
                  className="p-2 text-black dark:text-white"
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
                const { ...all } = getValues("package");
                // console.log(all);
                if (getValues("package").packageName != "") {
                  editPackage({
                    id: activePackageId?.id,
                    body: all,
                  })
                    .unwrap()
                    .then(() => {
                      // close(e);
                      close(e);
                      setMessage("Package edit sucessfull.");
                      setErr("");
                      refetchList();
                      setActivePackageId(null);
                    })
                    .catch((err) => {
                      setMessage("");
                      setErr("Something went wrong. Please try again..");
                    });
                }
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Head title="Package" />
      <Dashboard>
        <div className="mb-6 flex items-center justify-between">
          <h5>Package</h5>
        </div>

        <div className="mb-4 bg-white p-4">
          <Grid container gap={2}>
            <HookAutoComplete
              gridProps={{
                xs: 6,
                md: 3,
              }}
              {...registerState("packageName")}
              autocompleteProps={{
                options: packageNamesUnique,
                isOptionEqualToValue: (option, value) => option === value,
                sx: {
                  "& .MuiAutocomplete-endAdornment": {
                    top: 2,
                  },
                },
              }}
              textFieldProps={{
                label: "Package Name",
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
                label: "Course ID",
              }}
            />
          </Grid>
        </div>

        <MaterialTable
          title="All Packages"
          columns={[
            { title: "Package ID", field: "id" },
            { title: "Package Name", field: "packageName" },
            { title: "Student Fee", field: "studentFee" },
            { title: "Job Holder Fee", field: "jobHolderFee" },
            { title: "Course ID", field: "courseId" },
            // { title: "Course Title", field: "courseTitle" },
          ]}
          data={tableData}
          actions={[
            {
              icon: () => <MdEdit />,
              tooltip: "Edit Package",
              onClick: (_event, rowData) => setActivePackageId(rowData),
            },
            {
              icon: () => <MdAdd />,
              tooltip: "Add Module",
              onClick: (_event, rowData) => {
                setValue("module.courseId", rowData.courseId);
                setValue("module.packageId", rowData.id);
                moduleModal.open();
              },
            },
            {
              icon: () => <MdAssignment />,
              tooltip: "Add Assignment",
              onClick: (_event, rowData) => {
                router.push(`/dashboard/assignment/create/${rowData.courseId}/${rowData.id}`);
              },
            },
            {
              icon: () => <MdSchool />,
              tooltip: "Add Quiz",
              onClick: (_event, rowData) => {
                router.push(`/dashboard/quiz/create/${rowData.courseId}/${rowData.id}`);
              },
            },
            {
              icon: () => <MdDeleteForever />,
              tooltip: "Reomve Package",
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
                      Are you sure wanted to delete the {packageId?.packageName} package of course{" "}
                      {packageId?.courseId}.
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
                      onClick={handleRmvPackage}
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

export default withAuth(Packages);
