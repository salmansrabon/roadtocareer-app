import React from "react";
import Link from "next/link";
import { Wrapper, Anchor2 } from "./";

const CourseContent = ({ course }) => {
  const { id, contents } = course || {};
  return (
    <Wrapper className="py-16">
      {/* <h3 className="mb-6 font-bold text-center">কোর্সে যা কিছু আছে</h3>
      <ul className="pr-6 mb-6 overflow-auto h-96">
        {contents &&
          JSON.parse(contents).map((content, index) => (
            <li
              className="p-4 my-4 rounded-md shadow-lg bg-primary-200 dark:bg-dark-600/20"
              key={index}
            >
              {content}
            </li>
          ))}
      </ul> */}
      <div className="flex">
        <Link href={`/enroll/${id}`} passHref>
          <Anchor2 className="w-full text-center bg-primary-800 text-primary-200">
            এনরোল করুন
          </Anchor2>
        </Link>
      </div>
    </Wrapper>
  );
};

export default CourseContent;
