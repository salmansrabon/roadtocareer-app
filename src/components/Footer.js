import React from "react";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { MdEmail, MdCall } from "react-icons/md";
import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Anchor1, Anchor2, Wrapper } from "./";
import { navMenu } from "../variables";

const social = [
  { icon: FaFacebook, url: "https://facebook.com/roadtosdet" },
  { icon: FaLinkedin, url: "https://bd.linkedin.com/company/road-to-sdet" },
  { icon: FaWhatsapp, url: "https://api.whatsapp.com/send?phone=8801686606909" },
];

const Container = tw(Wrapper)`
  mt-5
  pb-8
  pt-10
  grid 
  gap-8 
  grid-cols-1 
  items-center 
  md:grid-cols-3 
`;

const Footer = () => {
  return (
    <div>
      <Container>
        <div className="">
          <h4>Contact</h4>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center">
              <MdEmail size={24} />
              <p className="ml-4">roadtosdet@gmail.com</p>
            </div>
            <div className="flex items-center">
              <MdCall size={24} />
              <p className="ml-4">+88 01686 606 909</p>
            </div>
          </div>
        </div>

        <ul className="flex flex-col gap-4 md:items-center sm:flex-row">
          {navMenu &&
            Array.isArray(navMenu) &&
            navMenu.map((menuItem, index) => (
              <li key={index}>
                <Link href={menuItem.href} passHref>
                  <Anchor1>{menuItem.title}</Anchor1>
                </Link>
              </li>
            ))}
        </ul>

        <div className="flex gap-6 md:justify-center">
          {social.map((item, index) => (
            <Anchor2
              className="bg-primary-600/50 dark:bg-dark-600/50"
              href={item.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <item.icon size={24} />
            </Anchor2>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Footer;
