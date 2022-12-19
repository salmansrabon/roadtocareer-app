import dynamic from "next/dynamic";

const Alert = dynamic(() => import("./Alert"), { ssr: false });
const MaterialTable = dynamic(() => import("./MaterialTable"), { ssr: false });
const StudentForm = dynamic(() => import("./StudentForm"), { ssr: false });
const CourseForm = dynamic(() => import("./CourseForm"), { ssr: false });

export { Alert, MaterialTable, StudentForm, CourseForm };
export {
  Wrapper,
  Anchor1,
  Anchor2,
  Button,
  InputBlock,
  Input,
  TextArea,
  Select,
  SubmitButton,
} from "./Styled";
export { default as withAuth } from "./WithAuth";
export { default as NextImage } from "./NextImage";
export { default as Loader } from "./Loader";
export { default as Layout } from "./Layout";
export { default as Head } from "./Head";
export { default as Header } from "./Header";
export { default as Footer } from "./Footer";
export { default as Hero } from "./Hero";
export { default as Card } from "./Card";
export { default as Courses } from "./Courses";
export { default as About } from "./About";
export { default as Teachers } from "./Teachers";
export { default as Review } from "./Review";
export { default as Slider } from "./Slider";
export { default as Contact } from "./Contact";
export { default as NextBatchSchedule } from "./NextBatchSchedule";
export { default as WhatDoYouLearn } from "./WhatDoYouLearn";
export { default as CourseContent } from "./CourseContent";
export { default as Dashboard } from "./Dashboard";
