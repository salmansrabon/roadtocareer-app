import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Backdrop, CircularProgress } from "@material-ui/core";
import {
  useGetStudentQuery,
  useGetCourseQuery,
  useEditStudentMutation,
  useGetPaymentsQuery,
} from "../../../../state/services";
import { withAuth, Head, Dashboard, StudentForm, Alert } from "../../../../components";
import { studentSchema } from "../../../../helpers";

const Edit = () => {
  const router = useRouter();
  const id = router.query.studentId;
  const courseId = router.query.courseId;
  const packageName = router.query.package;

  const [packagePrice, setPackagePrice] = useState(0);
  const [message, setMessage] = useState("");

  const getStudentQuery = useGetStudentQuery({ id }, { skip: !id });
  const getCourseQuery = useGetCourseQuery({ id: courseId }, { skip: !courseId });
  const getPaymentsQuery = useGetPaymentsQuery({ studentId: id, courseId }, { skip: !id });
  const [editStudent, editStudentMutation] = useEditStudentMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseId,
      batch: "",
      name: "",
      email: "",
      mobile: "",
      city: "",
      university: "",
      profession: "",
      company: "",
      experience: "",
      isEnrolled: 1,
      isValid: 0,
      packageName: packageName,
      courseFee: "",
      passingYear: "01, 2022",
      // paid: "",
      // installment1: "",
      // installment2: "",
      // installment3: "",
      // discount1: "",
      // discount2: "",
      // discount3: "",
      // installmentComment1: "",
      // installmentComment2: "",
      // installmentComment3: "",
    },
    resolver: yupResolver(studentSchema),
  });

  useEffect(() => {
    if (editStudentMutation.isSuccess) {
      router.push({
        pathname: "/dashboard/student",
        query: { message: "Student updated successfully" },
      });
    }

    let initialData = { courseId };

    if (getStudentQuery.isSuccess) {
      const {
        batch,
        name,
        email,
        mobile,
        city,
        university,
        profession,
        company,
        experience,
        isEnrolled,
        isValid,
        passingYear,
      } = getStudentQuery.data;

      initialData = {
        ...initialData,
        batch,
        name,
        email,
        mobile,
        city,
        university,
        profession,
        company,
        experience,
        isEnrolled,
        isValid,
        passingYear,
      };
    }

    if (getPaymentsQuery.isSuccess) {
      // const installment1 = getPaymentsQuery.data.find((payment) => payment.installmentNo === 1);
      // const installment2 = getPaymentsQuery.data.find((payment) => payment.installmentNo === 2);
      // const installment3 = getPaymentsQuery.data.find((payment) => payment.installmentNo === 3);

      initialData = {
        ...initialData,
        // ...(installment1 && {
        //   installment1: installment1.installmentAmount,
        //   discount1: installment1.discount,
        //   installmentComment1: installment1.comment,
        // }),
        // ...(installment2 && {
        //   installment2: installment2.installmentAmount,
        //   discount2: installment2.discount,
        //   installmentComment2: installment2.comment,
        // }),
        // ...(installment3 && {
        //   installment3: installment3.installmentAmount,
        //   discount3: installment3.discount,
        //   installmentComment3: installment3.comment,
        // }),
      };
    }

    if (getCourseQuery.isSuccess) {
      const { price } = getCourseQuery.data;
      const formattedPrice = JSON.parse(price);

      const packageDetails = formattedPrice.find(
        (item) => item.packageName.toLowerCase() === packageName.toLowerCase()
      );
      const packagePrice =
        getStudentQuery?.data?.profession.toLowerCase() === "Job Holder"
          ? packageDetails.jobHolderFee
          : packageDetails.studentFee;

      initialData = { ...initialData, courseFee: packagePrice };
      setPackagePrice(packagePrice);
    }
    reset(initialData, { keepDefaultValues: true });
  }, [
    router,
    reset,
    packageName,
    getStudentQuery,
    editStudentMutation,
    getCourseQuery,
    getPaymentsQuery,
  ]);

  const onSubmit = (data) => {
    editStudent({ id, student: data });
    // console.log('hello')
    // setMessage("Student information scucessfully edited.")
    // setTimeout(
    //   ()=>setMessage(""), 2000
    // )
  };

  return (
    <>
      <Head title="Edit Course" />
      <Dashboard>
        <Backdrop
          className="z-50"
          open={
            getStudentQuery.isLoading ||
            getStudentQuery.isFetching ||
            editStudentMutation.isLoading ||
            editStudentMutation.isFetching ||
            false
          }
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <h5 className="mb-6">Edit Student</h5>
        <StudentForm
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          payments={getPaymentsQuery.data}
          packagePrice={packagePrice}
        />
        {getStudentQuery.isError && (
          <Alert variant="error" message={getStudentQuery.error?.data?.message} />
        )}
        {editStudentMutation.isError && (
          <Alert variant="error" message={editStudentMutation.error?.data?.message} />
        )}
        {message != "" && <Alert variant="Successs" message={message} />}
      </Dashboard>
    </>
  );
};

export default withAuth(Edit);
