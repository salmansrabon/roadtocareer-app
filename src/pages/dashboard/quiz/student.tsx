import * as React from "react";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

import withPermissions from "../../../components/withPermissions";
import { useUser } from "../../../hooks/useUser";
import { Dashboard } from "../../../components";
import { useGetQuizzesQuery, useGetStudentQuery } from "../../../state/services";
import Link from "next/link";

const Student = () => {
  const { id, role } = useUser();

  const { isLoading, isFetching, data } = useGetQuizzesQuery({ id, role });

  const {
    data: studentData,
    isLoading: isStudentLoading,
    refetch: refetchStudent,
    isFetching: isStudentFetching,
  } = useGetStudentQuery({ id }, { skip: role !== "student" });

  const quizAnswers = studentData?.quizAnswers ? JSON.parse(studentData?.quizAnswers) : {};

  const isAllLoading = isLoading || isFetching || isStudentLoading || isStudentFetching;

  return (
    <LoadingOverlayWrapper active={isAllLoading}>
      <Dashboard>
        <div className="grid gap-4 auto-cols-max auto-rows-max grid-auto-fit">
          {data?.map((quiz) => {
            const isSubmitted = quizAnswers[quiz.id]?.submitted;

            const running = !!quizAnswers[quiz.id]?.startTime && !isSubmitted;

            return (
              <Link key={quiz.id} href={`/dashboard/quiz/view/${quiz.id}`}>
                <div
                  className={`block max-w-sm cursor-pointer space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow transition-all hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}
                >
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                    {quiz.title}
                  </h5>
                  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    Start Date: {new Date(quiz.quizStartDate).toDateString()}
                  </p>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    End Date: {new Date(quiz.quizEndDate).toDateString()}
                  </p>

                  <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                  <div className="flex items-center justify-between">
                    <div
                      className={`inline-block rounded py-1 px-3 text-sm text-gray-50 ${
                        running ? "bg-yellow-600" : isSubmitted ? "bg-green-600" : "bg-gray-600"
                      }`}
                    >
                      {running ? "Running" : isSubmitted ? "Graded" : "No Attempt"}
                    </div>

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-1 text-sm font-medium text-center text-white bg-blue-900 rounded hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Go to Quiz
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Dashboard>
    </LoadingOverlayWrapper>
  );
};

export default withPermissions(["student"])(Student);
