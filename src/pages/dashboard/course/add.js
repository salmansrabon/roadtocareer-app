import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddCourseMutation } from "../../../state/services";
import { withAuth, Head, Dashboard, CourseForm, Alert } from "../../../components";
import { courseSchema, } from "../../../helpers";
import { api } from "../../../variables";
import {useUser} from "../../../hooks/useUser"

const Add = () => {
  const router = useRouter();
  const [addCourse, { isFetching, isLoading, isSuccess, isError, error }] = useAddCourseMutation();
  const [fileName, setFileName] = React.useState("");
  const { token} = useUser();
  const {
    control,
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
      classTime: "20:00",
      image: "",
      video: "",
      isEnabled: true,
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

  // console.log(errors);

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

  if (isSuccess) {
    router.push({
      pathname: "/dashboard/course",
      query: { message: "Course added successfully" },
    });
  }

  const onSubmit =  async (data) => {
    // e.preventDefault();
    // console.log('hellooo')
    // const price = data.resourcePackages.map((item) => ({
    //   package: item.package,
    //   student: item.student,
    //   jobHolder: item.jobHolder,
    // }));

    const course = {
      courseTitle: data.courseTitle,
      courseInitial: data.courseInitial,
      batch: data.batch,
      image: `${api}images/course_thumbnails/${data.image.name}`,
      video: data.video,
      description: data.description,
      enrollmentStartDate: data.enrollmentStartDate,
      enrollmentEndDate: data.enrollmentEndDate,
      orientationDate: data.orientationDate,
      classStartDate: data.classStartDate,
      classDays: data.classDays,
      classTime: {
        start: data.classTime,
      },
      // price,
      // resources: {
      //   videos: data.resourceVideos.map((video) => video.name),
      //   ppts: data.resourcePpts.map((ppt) => ppt.name),
      //   pdfs: data.resourcePdfs.map((pdf) => pdf.name),
      // },
      isEnabled: data.isEnabled,
      notice: data.notice,
    };
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('destination', 'course_thumbnails');

    try {
      await axios.post(`${api}upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization' : `Bearer ${token}`
        },
      });
      console.log('Image uploaded successfully!');
    } catch (err) {
      console.log(err.message);
    }
    addCourse({ course });
  };

  return (
    <>
      <Head title="Add Course" />
      <Dashboard>
        <Backdrop className="z-50" open={isFetching || isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <h5 className="mb-6">Add Course</h5>
        <CourseForm
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          setFileName={setFileName}
          fileName={fileName}
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
        {isError && <Alert variant="error" message={error?.data?.message} />}
      </Dashboard>
    </>
  );
};

export default withAuth(Add);
