export {
  studentApi,
  useGetStudentQuery,
  useGetStudentsQuery,
  useAddStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
  useAddAttendanceMutation,
} from "./studentApi";
export {
  courseApi,
  useGetCourseQuery,
  useGetCoursesQuery,
  useAddCourseMutation,
  useEditCourseMutation,
  useDeleteCourseMutation,
} from "./courseApi";
export {
  paymentApi,
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useGetAllPaymentsQuery,
  useAddPaymentMutation,
  useEditPaymentMutation,
  useDeletePaymentMutation,
} from "./paymentApi";

export {
  packageApi,
  useGetPackagesQuery,
  useAddPackageMutation,
  useEditPackageMutation,
  useDeletePackageMutation,
} from "./packageApi";

export {
  modulesApi,
  useGetModulesQuery,
  useAddModuleMutation,
  useEditModuleMutation,
  useDeleteModuleMutation,
} from "./modulesApi";

export {
  resetPasseordApi,
  useResetPasswordMutation,
  useSendResetLinkMutation,
  useValidatePCTokenMutation,
  useChangePasswordMutation,
} from "./resetPassword";

export {
  assignmentApi,
  useGetAssignmentsQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentQuery,
  useDeleteAssignmentMutation,
} from "./assignmentApi";

export {
  quizApi,
  useGetQuizzesQuery,
  useGetAnswersQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useGetQuizQuery,
  useDeleteQuizMutation,
  useGetRandomQuizQuery,
  useGetQuestionsQuery,
  useGetMarksQuery,
} from "./quizApi";

export {
  teachersApi,
  useGetTeachersQuery,
  useAddTeacherMutation,
  useEditTeacherMutation,
  useGetTeacherQuery,
  useDeleteTeacherMutation,
} from "./teachersApi";
