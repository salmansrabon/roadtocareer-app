import React from "react";
import { useRouter } from "next/router";
import { resetServerContext } from "react-beautiful-dnd";
import { Button, Backdrop, CircularProgress, Modal } from "@material-ui/core";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { useGetModulesQuery } from "../../../state/services";
import { withAuth, Head, Dashboard, MaterialTable, Alert } from "../../../components";
import { useSeatchList } from "../../../hooks/useSearchList";
import { HookAutoComplete, useDialog, useHookForm } from "mui-react-hook-form-plus";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { LoginInput, LoginInputBlock, LoginTextArea } from "../../login";
import { useEditModuleMutation, useGetModuleQuery, useDeleteModuleMutation } from "../../../state/services/modulesApi";
import { useFieldArray } from "react-hook-form";
import { Add, Remove } from "@mui/icons-material";
import withPermissions from "../../../components/withPermissions";
import { useUser } from "../../../hooks/useUser";

const defaultValues = {
  packageId: null as string | null,
  courseId: null as string | null,
};
type DefaultValues = typeof defaultValues;

const Modules = () => {
  const router = useRouter();
  const { query } = router;
  const { register, open, close } = useDialog();
  const { role } = useUser();
  const [removeModule, editRmvState] = useDeleteModuleMutation();
  const [moduleId, setModuleId] = React.useState(null);
  const [rmvOpen, setROpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [err, setError] = React.useState("");
  const handleRmvClose = () => {
    setModuleId(null)
    setROpen(false);
  };
  const handleRmvClick = (event, rowData) => {
    setModuleId(rowData);
    setROpen(true);
  };
  const handleRmvModule = (e) => {
    e.preventDefault();
    const stData = {
      id: moduleId?.id,
    };
    try {
      removeModule(stData)
        .unwrap()
        .then((payload) => {
          refetchList();
          setError("");
          setMessage("Remove module successfull.");
        })
        .catch((error) => {
          setMessage("");
          setError("Remove module unsuccessfull! Please try again..");
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
      module: {
        module: [{ title: "", description: "" }] as { title: string; description: string }[],
      },
    },
  });

  const { fields, remove, append, update } = useFieldArray({
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
  } = useGetModulesQuery(filterRef);

  const tableData = data?.map((_module) => {
    const copy = { ..._module };

    return copy;
  });

  const [activeModuleId, setActiveModuleId] = React.useState<any | string>(null);

  const { data: moduleData, isFetching: isModuleFetching } = useGetModuleQuery(
    { id: activeModuleId },
    {
      skip: !activeModuleId,
    }
  );

  React.useEffect(() => {
    if (activeModuleId && !!moduleData) {
      let module = [];

      try {
        module = JSON.parse(JSON.parse(moduleData?.module));
      } catch (error) {
        console.log(error);
      }

      module.forEach((item, i) => update(i, item));

      open();
    }
  }, [activeModuleId, moduleData]);

  const { registerState } = useSeatchList({
    setFilterRef,
    listData: data,
    defaultValues,
  });

  const packageIds = data?.map((_module: any) => _module.packageId) ?? [];
  const courseIds = data?.map((_module: any) => _module.courseId) ?? [];

  const courseIdsUnique = [...(new Set<string>(courseIds) as any)];
  const packageIdsUnique = [...(new Set<string>(packageIds) as any)];

  const [editModule, { isLoading: isModuleLoading }] = useEditModuleMutation();

  return (
    <>
      <Backdrop
        className="z-[9999]"
        open={isFetching || isModuleFetching || isModuleLoading || isLoading || isModuleLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        {...register({
          onClose: () => {
            setActiveModuleId(null);
            setValue("module.module", [{ title: "", description: "" }]);
          },
        })}
      >
        <DialogTitle className="text-black">Edit Module</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h6 className="mb-2 text-black">
                Module{" "}
                <Add
                  onClick={() => append({ title: "", description: "" })}
                  className="text-black rounded cursor-pointer bg-slate-300"
                />
              </h6>
              {fields.map((field, index) => (
                <Grid container spacing={2} key={field.id}>
                  <Grid item xs={5}>
                    <LoginTextArea
                      className="w-full p-2 text-black dark:text-white"
                      placeholder="Title"
                      {...formRegister(`module.module.${index}.title`)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LoginTextArea
                      placeholder="Description"
                      className="w-full p-2 text-black dark:text-white"
                      {...formRegister(`module.module.${index}.description`)}
                    />
                  </Grid>
                  <Grid className="flex items-center justify-evenly" item xs={1}>
                    {index !== 0 && (
                      <Remove
                        onClick={() => remove(index)}
                        className="text-black rounded cursor-pointer bg-slate-300"
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

                editModule({
                  id: activeModuleId,
                  body: {
                    module,
                  },
                }).then(() => {
                  close(e);
                  refetchList();
                  setActiveModuleId(null);
                });
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Head title="Module" />
      <Dashboard>
        <div className="flex items-center justify-between mb-6">
          <h5>Module</h5>
        </div>

        <div className="p-4 mb-4 bg-white">
          <Grid container gap={2}>
            <HookAutoComplete
              gridProps={{
                xs: 6,
                md: 3,
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
                label: "Package Id",
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
          </Grid>
        </div>

        <MaterialTable
          title="All Modules"
          columns={[
            { title: "Module ID", field: "id" },
            { title: "Course ID", field: "courseId" },
            { title: "Package ID", field: "packageId" },
            {
              title: "Module",
              field: "module",
              render: (rowData: any) => {
                const module = JSON.parse(JSON.parse(rowData.module));

                return (
                  <div>
                    {module?.map?.((module: any, index: number) => (
                      <div key={index} className="mb-2">
                        <p className="mb-1 text-sm text-black">{module.title}</p>
                        <p className="text-gray-500">{module.description}</p>
                      </div>
                    ))}
                  </div>
                );
              },
            },

          ]}
          data={tableData}
          actions={[
            {
              icon: () => <MdEdit />,
              tooltip: "Edit Module",
              onClick: (_event, rowData) => setActiveModuleId(rowData.id),
            },
            {
              icon: () => <MdDeleteForever />,
              tooltip: "Remove Module",
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
        {query.message && <Alert variant="success" message={query.message} />}
        {isError && <Alert variant="error" message={(error as any)?.data?.message} />}
        {message != "" && <Alert variant="success" message={message} />}
        {err != "" && <Alert variant="error" message={err} />}
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
                      Are you sure wanted to delete the module {moduleId?.id} of course{" "}
                      {moduleId?.courseId} and package {moduleId?.packageId}.
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
                      onClick={handleRmvModule}
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

export default withPermissions(["admin", "instructor"])(Modules);
