import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { format } from "date-fns";
import { useGetCourseQuery, useEditCourseMutation } from "../../../../state/services";
import { withAuth, Head, Dashboard, CourseForm, Alert } from "../../../../components";
import { courseSchema } from "../../../../helpers";

const Edit = () => {
  const router = useRouter();
  const id = router.query.courseId;
  const getCourseQuery = useGetCourseQuery({ id }, { skip: !id });
  const [editCourse, editState] = useEditCourseMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      batch: "",
      courseTitle: "",
      courseInitial: "",
      description: "",
      enrollmentStartDate: "",
      enrollmentEndDate: "",
      orientationDate: "",
      classStartDate: "",
      classDays: [],
      classTime: "21:00",
      image: "",
      video: "",
      isEnabled: 1,
      notice: "",
      // package1: "",
      // package2: "",
      // courseFeeStudent1: "",
      // courseFeeJobHolder1: "",
      // courseFeeStudent2: "",
      // courseFeeJobHolder2: "",
      // certificate: "",
      // resourceVideos: [{ name: "" }],
      // resourcePdfs: [{ name: "" }],
      // resourcePpts: [{ name: "" }],
      // resourcePackages: [{ package: "", student: "", jobHolder: "" }],
    },
    resolver: yupResolver(courseSchema),
  });

  // const {
  //   fields: packageField,
  //   append: packageAppend,
  //   remove: packageRemove,
  // } = useFieldArray({ control, name: "resourcePackages" });

  // const {
  //   fields: videosField,
  //   append: videosAppend,
  //   remove: videosRemove,
  // } = useFieldArray({ control, name: "resourceVideos" });
  // const {
  //   fields: pdfsField,
  //   append: pdfsAppend,
  //   remove: pdfsRemove,
  // } = useFieldArray({ control, name: "resourcePdfs" });
  // const {
  //   fields: pptsField,
  //   append: pptsAppend,
  //   remove: pptsRemove,
  // } = useFieldArray({ control, name: "resourcePpts" });

  useEffect(() => {
    if (editState.isSuccess) {
      router.push({
        pathname: "/dashboard/course",
        query: { message: "Course updated successfully" },
      });
    }

    if (getCourseQuery.isSuccess) {
      const { data } = getCourseQuery;

      const timeData = JSON.parse(data.classTime);
      const daysData = JSON.parse(data.classDays);
      // const priceData = JSON.parse(data.price);
      // const resourceData = JSON.parse(data.resources);

      reset({
        batch: data.batch || "",
        courseTitle: data.courseTitle || "",
        courseInitial: data.courseInitial || "",
        description: data.description || "",
        enrollmentStartDate: data?.enrollmentStartDate
          ? format(new Date(data.enrollmentStartDate), "yyyy-MM-dd")
          : "",
        enrollmentEndDate: data?.enrollmentEndDate
          ? format(new Date(data.enrollmentEndDate), "yyyy-MM-dd")
          : "",
        orientationDate: data?.orientationDate
          ? format(new Date(data.orientationDate), "yyyy-MM-dd")
          : "",
        classStartDate: data?.classStartDate
          ? format(new Date(data.classStartDate), "yyyy-MM-dd")
          : "",
        classDays: daysData || [],
        classTime: timeData?.start || "21:00",
        image: data.image || "",
        video: data.video || "",
        isEnabled: data?.isEnabled?? true,
        notice: data.notice || "",
        // package1: priceData?.[0]?.package || "",
        // courseFeeStudent1: priceData?.[0]?.student || "",
        // courseFeeJobHolder1: priceData?.[0]?.jobHolder || "",
        // package2: priceData?.[1]?.package || "",
        // courseFeeStudent2: priceData?.[1]?.student || "",
        // courseFeeJobHolder2: priceData?.[1]?.jobHolder || "",
        // certificate: data.certificate || "",
        // resourceVideos: resourceData?.videos?.map((video) => ({ name: video })) || [{ name: "" }],
        // resourcePdfs: resourceData?.pdfs?.map((pdf) => ({ name: pdf })) || [{ name: "" }],
        // resourcePpts: resourceData?.ppts?.map((ppt) => ({ name: ppt })) || [{ name: "" }],
        // resourcePackages: priceData?.map((price) => ({
        //   package: price?.package,
        //   student: price?.student,
        //   jobHolder: price?.jobHolder,
        // })) || [{ package: "", student: "", jobHolder: "" }],
      });
    }
  }, [router, reset, getCourseQuery, editState]);

  const onSubmit = (data) => {
    // const price = data.resourcePackages.map((item) => ({
    //   package: item.package,
    //   student: item.student,
    //   jobHolder: item.jobHolder,
    // }));

    const course = {
      courseTitle: data.courseTitle,
      courseInitial: data.courseInitial,
      batch: data.batch,
      image: data.image,
      video: data.video,
      description: data.description,
      classTime: {
        start: data.classTime,
      },
      classDays: data.classDays,
      isEnabled: data.isEnabled,
      notice: data.notice,
    };

    editCourse({ id, course });
  };

  return (
    <>
      <Head title="Add Course" />
      <Dashboard>
        <Backdrop
          className="z-50"
          open={
            getCourseQuery.isLoading ||
            getCourseQuery.isFetching ||
            editState.isLoading ||
            editState.isFetching ||
            false
          }
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <h5 className="mb-6">Edit Course</h5>
        <CourseForm
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          // videosField={videosField}
          // videosAppend={videosAppend}
          // videosRemove={videosRemove}
          // pptsField={pptsField}
          // pptsAppend={pptsAppend}
          // pptsRemove={pptsRemove}
          // pdfsField={pdfsField}
          // pdfsAppend={pdfsAppend}
          // pdfsRemove={pdfsRemove}
          // packageField={packageField}
          // packageAppend={packageAppend}
          // packageRemove={packageRemove}
        />
        {getCourseQuery.isError && (
          <Alert variant="error" message={getCourseQuery.error?.data?.message} />
        )}
        {editState.isError && <Alert variant="error" message={editState.error?.data?.message} />}
      </Dashboard>
    </>
  );
};

export default withAuth(Edit);
