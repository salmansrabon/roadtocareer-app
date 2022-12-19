import React from "react";
import tw from "tailwind-styled-components";
import { Wrapper, Card } from "./";
import { courses } from "../variables";

const Cards = tw.div`
  pt-16
  grid
  gap-10
  auto-rows-fr
  grid-cols-1
  sm:grid-cols-2
  xl:gap-6
  xl:grid-cols-3
`;

const Courses = ({ data }) => {
  return (
    <div id="courses" className="scroll-mt-20 bg-primary-200 dark:bg-dark-600/20">
      <Wrapper className="py-16">
        <h3 className="text-center font-bold">আমাদের কোর্সসমূহ</h3>
        <Cards>
          {data.map((course, index) => course.isEnabled?(
            
            <Card data={course} key={index} />
          ):"")}
        </Cards>
      </Wrapper>
    </div>
  );
};

export default Courses;
