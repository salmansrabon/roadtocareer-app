import React from "react";
import { wrapper } from "../../state/store";
import { getCourse } from "../../state/course";
import { Layout, Head, NextBatchSchedule, WhatDoYouLearn } from "../../components";

const Course = ({ isSuccess, isError, error, course }) => {
  return (
      <>
      {course.isEnabled ? (
        <>
      <Head title="Road to Career" />
      <Layout>
        {isSuccess && (
          <>
            <NextBatchSchedule data={course} />
            <WhatDoYouLearn course={course} />
          </>
        )}
        {isError && <div className="flex justify-center text-red-500">{error}</div>}
      </Layout></>)
      :
      <div class='h-screen w-screenm-auto text-center'>
      <p className="font-bold text-red-500">Sorry the course is not available.</p>
      </div>
      }
      </>
    
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { id } = ctx.query;
  await store.dispatch(getCourse({ id }));
  const state = store.getState();
  const { isSuccess, isError, error, course } = state.courseReducer;
  return {
    props: {
      isSuccess,
      isError,
      error,
      course,
    },
  };
});

export default Course;
