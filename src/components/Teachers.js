import React from "react";
import tw from "tailwind-styled-components";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Wrapper, NextImage } from "./";
import { teachers } from "../variables";

export const Anchor2 = tw.a`
  p-2
  rounded
  transition
  duration-300
  hover:shadow-lg
`;

const Teachers = () => {
  return (
    <div id="teachers" className="scroll-mt-20 bg-primary-200 py-16 dark:bg-dark-600/20">
      <h3 className="mb-12 text-center font-bold">আমাদের টীম</h3>
      <Wrapper className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className="flex h-full flex-col overflow-hidden rounded-lg bg-white p-6 shadow-lg dark:bg-dark-600/20"
          >
            <NextImage
              src={teacher.image}
              alt="profile"
              width={640}
              height={560}
              layout="responsive"
              className="rounded-lg"
            />
            <p className="my-4 text-center">{teacher.designation}</p>
            <h6 className="mb-4 text-center font-bold">{teacher.name}</h6>
            <p className="mb-4 text-center">{teacher.description}</p>
            <div className="flex justify-center gap-4">
              {teacher.facebook && (
                <Anchor2
                  className="bg-primary-600/50 dark:bg-dark-600/50"
                  style={{ textAlign: "center" }}
                  href={teacher.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={24} />
                </Anchor2>
              )}
              {teacher.twitter && (
                <Anchor2
                  className="bg-primary-600/50 dark:bg-dark-600/50"
                  href={teacher.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter size={24} />
                </Anchor2>
              )}
              {teacher.linkedin && (
                <Anchor2
                  className="bg-primary-600/50 dark:bg-dark-600/50"
                  href={teacher.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={24} />
                </Anchor2>
              )}
              {teacher.whatsapp && (
                <Anchor2
                  className="bg-primary-600/50 dark:bg-dark-600/50"
                  href={teacher.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={24} />
                </Anchor2>
              )}
            </div>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default Teachers;
