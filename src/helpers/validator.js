import { yearPickerClasses } from "@mui/x-date-pickers";
import * as yup from "yup";
import { urlRegx } from "../variables";

export const studentSchema = yup.object().shape({
  batch: yup.number().required("Batch is required"),
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(/^[a-z0-9]((\.|\+)?[a-z0-9]){4,}@g(oogle)?mail\.com$/, "Invalid email")
    .required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
  city: yup.string().nullable(),
  university: yup.string().required("University is required"),
  profession: yup.string().required("Profession is required"),
  company: yup.string().nullable(),
  experience: yup.string().nullable(),
  passingYear: yup.string().required("Passing year be in month, year format (ex:11, 2022)"),
});

export const courseSchema = yup.object().shape(
  {
    batch: yup
      .number()
      .typeError("Amount must be a number")
      .positive("Number must be positive")
      .integer("Number must be an integer")
      .required("Required"),
    courseTitle: yup.string().required("Required"),
    description: yup.string().required("Required"),
    classDays: yup.array().min(1, "Select at least one day").required("Required"),
    classTime: yup.string().required("Required"),
    // image: yup.string().when("image", {
    //   is: (value) => value?.length,
    //   then: (rule) => rule.matches(urlRegx, "Must be a valid url"),
    // }),
    video: yup.string().when("video", {
      is: (value) => value?.length,
      then: (rule) => rule.min(11).max(11),
    }),
    notice: yup.string(),
    // package1: yup.string(),
    // package2: yup.string(),
    // courseFeeStudent1: yup
    //   .number()
    //   .typeError("Amount must be a number")
    //   .positive("Number must be positive")
    //   .integer("Number must be an integer")
    //   .required("Required"),
    // courseFeeJobHolder1: yup
    //   .number()
    //   .typeError("Amount must be a number")
    //   .positive("Number must be positive")
    //   .integer("Number must be an integer")
    //   .required("Required"),
    // courseFeeStudent2: yup
    //   .number()
    //   .typeError("Amount must be a number")
    //   .positive("Number must be positive")
    //   .integer("Number must be an integer")
    //   .required("Required"),
    // courseFeeJobHolder2: yup
    //   .number()
    //   .typeError("Amount must be a number")
    //   .positive("Number must be positive")
    //   .integer("Number must be an integer")
    //   .required("Required"),
    //   certificate: yup.string().when("certificate", {
    //     is: (value) => value?.length,
    //     then: (rule) => rule.matches(urlRegx, "Must be a valid url"),
    //   }),
    //   resourcePackages: yup.array().of(
    //     yup.object().shape({
    //       package: yup.string(),
    //       student: yup.number(),
    //       jobHolder: yup.number(),
    //     })
    //   ),

    //   resourceVideos: yup.array().of(
    //     yup.object().shape(
    //       {
    //         name: yup.string().when("name", {
    //           is: (value) => value?.length,
    //           then: (rule) => rule.matches(urlRegx, "Must be a valid url"),
    //         }),
    //       },
    //       ["name", "name"]
    //     )
    //   ),
    //   resourcePdfs: yup.array().of(
    //     yup.object().shape(
    //       {
    //         name: yup.string().when("name", {
    //           is: (value) => value?.length,
    //           then: (rule) => rule.matches(urlRegx, "Must be a valid url"),
    //         }),
    //       },
    //       ["name", "name"]
    //     )
    //   ),
    //   resourcePpts: yup.array().of(
    //     yup.object().shape(
    //       {
    //         name: yup.string().when("name", {
    //           is: (value) => value?.length,
    //           then: (rule) => rule.matches(urlRegx, "Must be a valid url"),
    //         }),
    //       },
    //       ["name", "name"]
    //     )
    //   ),
  },
  [
    ["image", "image"],
    ["video", "video"],
    // ["certificate", "certificate"],
  ]
);

export const packageSchema = yup.object().shape({
  package: yup.object().shape({
    packageName: yup.string().required("Package name required."),
    studentFee: yup
      .number()
      .typeError("Student Fee must be a number")
      .positive("Student Fee must be positive")
      .integer("Student Fee must be an integer")
      .required("Student fee required"),
  }),
});
