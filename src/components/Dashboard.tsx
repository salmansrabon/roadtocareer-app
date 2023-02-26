import React, { useState, useEffect } from "react";
import Link from "next/link";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { MdDarkMode, MdWbSunny, MdMenu, MdClose, MdAccountCircle } from "react-icons/md";
import { Button } from ".";
import { logout } from "../state/user";
import { toggleDashboard } from "../state/dashboard";
import { brandName, userMenuMap } from "../variables";
import { useUser } from "../hooks/useUser";
import { Avatar, IconButton, Menu } from "@mui/material";
import { useMenu } from "mui-react-hook-form-plus";
import { useGetStudentQuery } from "../state/services";

const Drawer = tw.div`
  relative 
  flex
  flex-col
  justify-between
  h-screen 
  bg-dark-400 
  p-4 
  pt-6 
  duration-300 
  dark:bg-dark-600/40
`;

const Topbar = tw.div`
  flex 
  items-center 
  justify-between
`;

const Logo = tw.span`
  origin-left 
  text-white 
  duration-300
`;

const DarkMode = tw(Button)`
  bg-primary-600/50 
  dark:bg-dark-600/50
`;

const MenuItem = tw.a`
  -ml-4 
  -mr-4 
  flex 
  h-10 
  cursor-pointer 
  items-center 
  gap-x-4 
  p-4 
  text-white 
  duration-300
  hover:bg-dark-200
`;

const Contents = tw.div`
  min-h-screen
  ml-auto 
  duration-300 
  bg-dark-400/20 
  p-6
`;

const Dashboard = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isDashboardOpen } = useSelector((state: any) => state.dashboardReducer);

  const { id, role, email, isAuthenticated } = useUser();
  const getStudentQuery = useGetStudentQuery({ id }, { skip: !id });

  const [theme, setTheme] = useState("");

  const { register, handleOpen } = useMenu();

  let initialData = {
    id,
    batch: 0,
    name: "",
    email,
    mobile: "",
    city: "",
    university: "",
    profession: "",
    company: "",
    experience: 0,
    isEnrolled: false,
    isValid: false,
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add("dark");
    }

    if (getStudentQuery.isSuccess) {
      const {
        batch,
        name,
        email,
        mobile,
        city,
        university,
        profession,
        company,
        experience,
        isEnrolled,
        isValid,
      } = getStudentQuery.data;

      initialData = {
        ...initialData,
        batch,
        name,
        email,
        mobile,
        city,
        university,
        profession,
        company,
        experience,
        isEnrolled,
        isValid,
      };
    }
  }, [setTheme, getStudentQuery]);

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

  const handleClick = () => {
    window.location.replace("/");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const menu = React.useMemo(() => {
    if (!isAuthenticated) {
      return [];
    }

    return userMenuMap[role] ?? [];
  }, [role, isAuthenticated]);

  return (
    <div className="flex">
      <Drawer className={`fixed h-screen ${isDashboardOpen ? "w-72" : "w-14"}`}>
        <div>
          <Topbar>
            <div className="cursor-pointer" onClick={() => dispatch(toggleDashboard())}>
              {isDashboardOpen ? (
                <MdClose className="text-white" size={24} />
              ) : (
                <MdMenu className="text-white" size={24} />
              )}
            </div>
            <Button
              className={`${!isDashboardOpen && "scale-0"} text-white hover:shadow-none`}
              onClick={handleClick}
            >
              {brandName}
            </Button>
            <DarkMode className={`${!isDashboardOpen && "scale-0"}`} onClick={toggleDarkMode}>
              {theme ? <MdDarkMode size={24} /> : <MdWbSunny size={24} />}
            </DarkMode>
          </Topbar>
          <ul className="pt-6">
            {menu.map((item, index) => (
              <li key={index} className={`${item.gap && "mt-6"}`}>
                <Link href={`/dashboard${item.link}`} passHref>
                  <MenuItem
                    className={
                      router.pathname.includes(`/dashboard${item.link}`)
                        ? "bg-dark-600 shadow-md"
                        : ""
                    }
                  >
                    <span>
                      <item.icon size={20} color="white" />
                    </span>
                    <span className={`${!isDashboardOpen && "scale-0"} origin-left duration-300`}>
                      {item.title}
                    </span>
                  </MenuItem>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <MenuItem onClick={handleLogout} className="bg-gray-900 dark:bg-black">
          <span>
            <MdLogout size={20} />
          </span>
          <span className={`${!isDashboardOpen && "scale-0"} origin-left duration-300`}>
            Logout
          </span>
        </MenuItem> */}
      </Drawer>

      {/* @ts-ignore */}
      <Contents className={isDashboardOpen ? "w-[calc(100%-18rem)]" : "w-[calc(100%-3.5rem)]"}>
        <div className="flex items-center justify-between mb-6">
          <div></div>
          <div className="pl-2 text-lg text-black border-2 border-solid rounded-lg rounded-r-full text-bold border-sky-500 bg-sky-500 dark:border-sky-700 dark:bg-sky-600 dark:text-white">
            Welcome, {getStudentQuery.isSuccess ? getStudentQuery.data.name.split(" ")[0] : email}
            <IconButton size="small" onClick={handleOpen}>
              <Avatar className="cursor-pointer">
                <MdAccountCircle size={24} color="sky" />
              </Avatar>
            </IconButton>
            <Menu
              {...register()}
              id="basic-menu"
              MenuListProps={{
                "aria-labelledby": "basic-button",
                className: "bg-gray-700 rounded-none w-48 border border-gray-500 px-4 py-2",
              }}
            >
              <MenuItem
                className="border-b border-gray-500"
                onClick={() => {
                  router.push("/dashboard/profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem className="border-b border-gray-500" onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
        {children}
      </Contents>
    </div>
  );
};

export default Dashboard;
