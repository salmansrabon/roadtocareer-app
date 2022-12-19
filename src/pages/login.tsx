import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { useDispatch } from "react-redux";
import { Head, Layout, Wrapper, Loader, Button } from "../components";
import { useRouter } from "next/router";
import { login } from "../state/user/action";
import { useToggle } from "../hooks/useToggle";
import { useUser } from "../hooks/useUser";
import { useRole } from "../hooks/useRole";
import { useSendResetLinkMutation } from "../state/services";
import { Collapse } from "@mui/material";

export const LoginContainer = tw(Wrapper)`
  flex 
  h-[800px]
  min-h-screen 
  flex-col 
  items-center 
  justify-center
`;

const LoginCard = tw.div`
  w-full 
  max-w-[600px] 
  rounded-lg 
  p-12 
  shadow-xl
  dark:bg-dark-600/20
`;

export const LoginInputBlock = tw.div`
  flex
  items-center
  gap-4
`;

export const LoginInput = tw.input`
  rounded-md 
  shadow-md
  border-gray-300 
  dark:border-gray-900 
  dark:bg-gray-700 
`;

export const LoginTextArea = tw.textarea`
  rounded-md 
  shadow-md
  border-gray-300 
  dark:border-gray-900 
  dark:bg-gray-700 
`;

const LoginSubmitButton = tw(Button)`
  w-28
  text-white 
  bg-blue-500 
  shadow-lg 
  dark:bg-dark-600/50
  hover:shadow-dark-600/50
  dark:hover:shadow-cyan-500/50
`;

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useUser();

  const isReset = router.query.reset === "true";

  const [isForgotPassword, toggleIsForgotPassword] = useToggle(isReset);

  const [formData, setFormData] = useState({ email: "", password: "", id: "" });

  const role = useRole();

  const [sendResetLink, { isLoading, isSuccess, isError }] = useSendResetLinkMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isForgotPassword) {
      await sendResetLink({
        id: formData.id,
      }).unwrap();
      return;
    }

    dispatch(
      // @ts-ignore
      login({
        data: {
          email: formData.email,
          password: formData.password,
        },
      })
    );
  };

  useEffect(() => {
    if (user.isAuthenticated && !isReset) {
      if (role.toLowerCase() === "student") {
        router.push("/dashboard/studentpayment");
        return;
      }

      router.push("/dashboard/student");
    }
  }, [user, router, isReset]);

  return (
    <>
      <Head title="Login" />
      <Layout>
        <Loader active={user.isFetching || isLoading}>
          <LoginContainer>
            <LoginCard>
              <h3 className="mb-6 text-center font-bold">
                {!isForgotPassword ? "লগ ইন" : "পাসওয়ার্ড রিসেট"}
              </h3>
              <form className="mb-4 space-y-6" onSubmit={handleSubmit}>
                <div className="justify-item-center grid space-y-6">
                  {!isForgotPassword && (
                    <div>
                      <LoginInputBlock>
                        <label htmlFor="email" className="w-[100px] flex-shrink-0">
                          স্টুডেন্ট আইডি
                        </label>
                        <LoginInput
                          name="email"
                          type="text"
                          placeholder="আপনার স্টুডেন্ট আইডি লিখুন"
                          value={formData.email}
                          onChange={handleChange}
                          className="flex-grow"
                          required
                        />
                      </LoginInputBlock>
                    </div>
                  )}
                  {isForgotPassword ? (
                    <div>
                      <LoginInputBlock>
                        <label htmlFor="id" className="w-[100px] flex-shrink-0">
                          ইউজার আইডি নম্বর
                        </label>
                        <LoginInput
                          name="id"
                          type="text"
                          placeholder="আপনার ইউজার আইডি নম্বর লিখুন"
                          value={formData.id}
                          onChange={handleChange}
                          className="flex-grow"
                          required
                        />
                      </LoginInputBlock>
                    </div>
                  ) : (
                    <div>
                      <LoginInputBlock>
                        <label htmlFor="password" className="w-[100px] flex-shrink-0">
                          পাসওয়ার্ড
                        </label>
                        <LoginInput
                          name="password"
                          type="password"
                          placeholder="আপনার পাসওয়ার্ড লিখুন"
                          value={formData.password}
                          onChange={handleChange}
                          className="flex-grow"
                          required
                        />
                      </LoginInputBlock>
                    </div>
                  )}

                  {user.isError && (
                    <div className="w-full text-center text-red-600">{user.error}</div>
                  )}
                  <div className="w justify-self-center">
                    <LoginSubmitButton type="submit">সাবমিট</LoginSubmitButton>
                  </div>
                </div>
              </form>
              {isReset ? null : isForgotPassword ? (
                <div
                  className="cursor-pointer select-none"
                  onClick={() => {
                    toggleIsForgotPassword();
                    // do something
                  }}
                >
                  Back to login
                </div>
              ) : (
                <div
                  className="cursor-pointer select-none"
                  onClick={() => {
                    toggleIsForgotPassword();
                    // do something
                  }}
                >
                  Forgot your password?
                </div>
              )}
              {isForgotPassword && (
                <>
                  <Collapse in={isSuccess}>
                    <div className="my-3 rounded-sm bg-green-500 p-3 text-center text-lg text-white">
                      Reset link sent to your email
                    </div>
                  </Collapse>
                  <Collapse in={isError}>
                    <div className="my-3 rounded-sm bg-red-500 p-3 text-center text-lg text-white">
                      Sorry! User ID not found
                    </div>
                  </Collapse>
                </>
              )}
            </LoginCard>
          </LoginContainer>
        </Loader>
      </Layout>
    </>
  );
};

export default Login;
