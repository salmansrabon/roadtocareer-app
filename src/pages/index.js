import React from "react";
import { wrapper } from "../state/store";
import { getCourses } from "../state/course";
import { Head, Layout, Hero, Courses, About, Teachers, Slider, Contact } from "../components";

const Home = ({ isSuccess, courseList }) => {
  return (
    <>
      <Head title="Road to Career" />
      <Layout>
        <Hero />
        {isSuccess && <Courses data={courseList} />}
        <About />
        <Teachers />
        <Slider />
        {/* <Contact /> */}
      </Layout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(getCourses());
  const state = store.getState();

  const { isSuccess, isError, error, courseList } = state.courseReducer;

  return {
    props: {
      isSuccess,
      isError,
      error,
      courseList,
    },
  };
});

export default Home;
