import React, { Fragment } from "react";
import tw from "tailwind-styled-components";
import { MdCheckBox } from "react-icons/md";
import { Wrapper, NextImage } from "./";
import { about } from "../variables";

const Container = tw(Wrapper)`
  grid 
  grid-cols-1 
  gap-10 
  items-center 
  py-16
  md:grid-cols-2 
`;

const Ul = tw.ul`
  grid 
  grid-cols-1 
  items-start 
  gap-x-4 
  gap-y-10 
  md:grid-cols-2
`;

const About = () => {
  return (
    <div id="about" className="scroll-mt-20">
      <Container>
        {about.map((item, index) => (
          <Fragment key={index}>
            <div className="mx-auto w-56 md:w-64">
              <NextImage
                variant="circular"
                src={item.avater}
                alt="#"
                width={400}
                height={400}
                layout="responsive"
                className="mx-auto"
              />
            </div>

            {/*get data into list*/}
            <div className="">
              <h3 className="mb-12 font-bold">{item.name}</h3>
              <Ul>
                {item.details.map((item, index) => (
                  <li className="flex" key={index}>
                    <MdCheckBox className="mt-0.5 h-full w-6 flex-none" />
                    <span className="ml-2">{item}</span>
                  </li>
                ))}
              </Ul>
            </div>
          </Fragment>
        ))}
      </Container>
    </div>
  );
};

export default About;
