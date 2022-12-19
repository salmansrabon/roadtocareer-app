import React, { useState, useEffect } from "react";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { useSelector } from "react-redux";
import { MdOutlineMenu, MdClose, MdWbSunny, MdDarkMode } from "react-icons/md";
import { Wrapper, Anchor1, Anchor2, Button } from ".";
import { brandName, navMenu, navButtons } from "../variables";
import { useUser } from "../hooks/useUser";
import { useRole } from "../hooks/useRole";

const Appbar = tw.div`
  fixed 
  w-full 
  bg-primary-200/80
  shadow-md
  z-10
  before:absolute
  before:w-full
  before:h-full
  before:backdrop-blur-lg
  before:z-[-1]
  dark:bg-dark-200/80
`;

const Container = tw(Wrapper)`
  flex 
  justify-between 
  items-center 
  gap-6 
  py-4
  lg:gap-16
`;

const Nav = tw.div`
  flex-grow
  z-10 
  absolute 
  bg-primary-400/80
  shadow-lg
  backdrop-blur-lg 
  transition-all
  duration-300
  inset-x-0
  mx-6
  rounded-lg 

  md:static
  md:bg-transparent
  md:shadow-none
  md:backdrop-blur-none
  md:inset-x-auto
  md:mx-0
  md:rounded-none
  md:opacity-100 
  md:visible
  md:translate-y-0

  dark:bg-dark-400/80
  dark:md:bg-transparent
`;

const NavContainer = tw(Wrapper)`
  flex
  flex-col 
  items-start
  gap-6
  px-0
  py-8 

  md:flex-row
  md:justify-between
  md:items-center
  md:py-0
`;

const Ul = tw.ul`
  flex 
  gap-6
  items-center
  flex-col 

  md:flex-row
`;

const ButtonGroup = tw.div`
  flex
  gap-6
  mt-6 
  flex-col 
  items-start 
  
  md:flex-row
  md:mt-0
  md:items-center
`;

const A = tw(Anchor2)`
  min-w-[6rem] 
  text-center 
  text-white 
  bg-primary-800 
  dark:text-black 
  dark:bg-dark-800
  hover:shadow-primary-800/50
  dark:hover:shadow-dark-800/50
`;

const Header = () => {
  const [theme, setTheme] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useUser();

  const role = useRole();

  const handleClick = () => setIsOpen(!isOpen);

  const toggleDarkMode = () => {
    if (!theme) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("");
      localStorage.removeItem("theme");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add("dark");
    }
  }, [setTheme]);

  return (
    <Appbar>
      <Container>
        <Button className="bg-primary-600/50 dark:bg-dark-600/50 md:hidden" onClick={handleClick}>
          {isOpen ? <MdClose size={24} /> : <MdOutlineMenu size={24} />}
        </Button>

        <Link href="/">
          <a className="text-2xl">{brandName}</a>
        </Link>

        <Nav
          className={
            isOpen ? "visible translate-y-56 opacity-100" : "invisible translate-y-52 opacity-0"
          }
        >
          <NavContainer>
            <Ul>
              {navMenu &&
                Array.isArray(navMenu) &&
                navMenu.map((menuItem, index) => (
                  <li key={index}>
                    <Link href={menuItem.href} passHref>
                      <Anchor1 onClick={handleClick}>{menuItem.title}</Anchor1>
                    </Link>
                  </li>
                ))}
            </Ul>

            <ButtonGroup>
              {navButtons &&
                Array.isArray(navButtons) &&
                navButtons.map((button, index) => (
                  <Link
                    href={
                      isAuthenticated
                        ? role === "student"
                          ? "/dashboard/studentpayment"
                          : "/dashboard/student"
                        : button.href
                    }
                    passHref
                    key={index}
                  >
                    <A>{isAuthenticated ? "Dashboard" : "Login"}</A>
                  </Link>
                ))}
            </ButtonGroup>
          </NavContainer>
        </Nav>

        <Button className="bg-primary-600/50 dark:bg-dark-600/50" onClick={toggleDarkMode}>
          {theme ? <MdDarkMode size={24} /> : <MdWbSunny size={24} />}
        </Button>
      </Container>
    </Appbar>
  );
};

export default Header;
