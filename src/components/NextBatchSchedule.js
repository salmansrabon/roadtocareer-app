import React from "react";
import tw from "tailwind-styled-components";
import { format } from "date-fns";
import { MdCalendarToday, MdOutlineCalendarToday, MdMonitor } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";
import { Wrapper } from "./";

const Container = tw(Wrapper)`
  my-16 
  rounded-lg 
  bg-gradient-to-br 
  from-primary-200 
  to-primary-400 
  p-6 
  shadow-md 
  dark:from-dark-600/20 
  dark:to-dark-600/40 
  md:p-10
`;

const NextBatchSchedule = ({ data }) => {
  const { enrollmentStartDate, enrollmentEndDate, orientationDate, classStartDate, classTime } = data || {};
  return (
    <Wrapper className="pt-20">
      <Container>
        <h3 className="mb-10 text-center font-bold">পরবর্তী ব্যাচের সময় সূচি</h3>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
          <div className="flex items-center">
            <div className="rounded bg-primary-400 p-1.5 dark:bg-dark-600/50">
              <MdCalendarToday />
            </div>
            <p className="ml-4">
              এনরোলমেন্ট শুরুর তারিখ {format(new Date(enrollmentStartDate), "dd MMM yyyy")}
            </p>
          </div>
          <div className="flex items-center">
            <div className="rounded bg-primary-400 p-1.5 dark:bg-dark-600/50">
              <MdOutlineCalendarToday />
            </div>
            <p className="ml-4">
              এনরোলমেন্ট এর শেষ তারিখ {format(new Date(enrollmentEndDate), "dd MMM yyyy")}
            </p>
          </div>
          <div className="flex items-center">
            <div className="rounded bg-primary-400 p-1.5 dark:bg-dark-600/50">
              <MdMonitor />
            </div>
            <p className="ml-4">
              ওরিয়েন্টেশন এর তারিখ {format(new Date(orientationDate), "dd MMM yyyy")}
              {"\t"} এবং সময় 8:00PM
            </p>
          </div>
          <div className="flex items-center">
            <div className="rounded bg-primary-400 p-1.5 dark:bg-dark-600/50">
              <BsBellFill />
            </div>
            <p className="ml-4">
              ক্লাস শুরুর তারিখ {format(new Date(classStartDate), "dd MMM yyyy")}
              {"\t"} এবং সময় 8:30PM
            </p>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default NextBatchSchedule;
