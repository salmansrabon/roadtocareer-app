import * as React from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";

import { useUser } from "../../hooks/useUser";
import { Button, Head, Layout, Loader, Wrapper } from "../../components";
import {
  useChangePasswordMutation,
  useResetPasswordMutation,
  useValidatePCTokenMutation,
} from "../../state/services";

function ResetPassword() {
  const { query, push } = useRouter();
  const [successMessage, setSuccessMessage] = React.useState("")

  const token = query.token as string;

  const { isAuthenticated, id } = useUser();

  const [validatePCToken, { isLoading, isError, isSuccess }] = useValidatePCTokenMutation();

  const [
    changePassword,
    {
      isLoading: isChangePasswordLoading,
      isError: isErrorChangePassword,
      isSuccess: isSuccessChangePassword,
    },
  ] = useChangePasswordMutation();

  const [
    resetPassword,
    {
      isLoading: isResetLoading,
      isError: isResetError,

      isSuccess: isResetSuccess,
    },
  ] = useResetPasswordMutation();

  React.useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    if (token) {
      validatePCToken({ token });
    }
  }, [token, validatePCToken]);

  const [formData, setFormData] = React.useState({
    curPassword: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordMatch = formData.password !== "" && formData.password === formData.passwordConfirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordMatch) {
      try {
        if (isAuthenticated) {
          await changePassword({
            id,
            password: formData.password,
            curPassword: formData.curPassword,
          })
            .unwrap()
            .then((payLoad) => {
              // console.log(payLoad);
              push("/dashboard/profile");
            })
            // .catch((err) => console.log(err));
          return;
        }

        await resetPassword({
          password: formData.password,
          token,
          id,
        })
          .unwrap()
          .then((payLoad) => {
            setSuccessMessage("Pasword reset successfull");
            setTimeout(()=>push("/login"), 2000)
            
            // console.log(payLoad);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        // console.log(error);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200">
      <Head title="Reset Password" hasMaterialTable={undefined} />
      <Layout showHeader={false} showFooter={false}>
        <Loader active={isLoading || isResetLoading || isChangePasswordLoading}>
          <ResetContainer>
            <ResetCard>
              {isError && (
                <h5 className="text-center text-red-500">Sorry! Your are unauthorized ❌🔒</h5>
              )}

              {(isSuccess || isAuthenticated) && (
                <>
                  <h4 className="mb-6 text-center font-bold text-black dark:text-white">পাসওয়ার্ড রিসেট করুন</h4>
                  <form className="mb-4 space-y-6" onSubmit={handleSubmit}>
                    {isAuthenticated && (
                      <ResetInputBlock>
                        <label htmlFor="curPassword" className="min-w-[90px] flex-shrink-0">
                          বর্তমান পাসওয়ার্ড
                        </label>
                        <ResetInput
                          name="curPassword"
                          type="password"
                          placeholder="বর্তমান পাসওয়ার্ড"
                          value={formData.curPassword}
                          onChange={handleChange}
                          className="flex-grow text-gray-900"
                          required
                        />
                      </ResetInputBlock>
                    )}

                    <ResetInputBlock>
                      <label htmlFor="password" className="min-w-[90px] flex-shrink-0">
                        পাসওয়ার্ড
                      </label>
                      <ResetInput
                        name="password"
                        type="password"
                        placeholder="আপনার পাসওয়ার্ড"
                        value={formData.password}
                        onChange={handleChange}
                        // validator= {(data=>true)}
                        minLength={8}
                        className="flex-grow text-gray-900"
                        required
                      />
                    </ResetInputBlock>
                    <ResetInputBlock>
                      <label htmlFor="passwordConfirm" className="min-w-[90px] flex-shrink-0">
                        নিশ্চিত করুন
                      </label>
                      <ResetInput
                        name="passwordConfirm"
                        type="password"
                        placeholder="আপনার পাসওয়ার্ড নিশ্চিত করুন"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        className={`flex-grow text-gray-900 ring-4 ${
                          passwordMatch ? "ring-green-500" : "ring-red-500"
                        }`}
                        required
                      />
                    </ResetInputBlock>

                    <ResetSubmitButton
                      disabled={!passwordMatch}
                      type="submit"
                      className="disabled:bg-slate-300"
                    >
                      সাবমিট
                    </ResetSubmitButton>
                  </form>
                </>
              )}

              {(isResetError || isErrorChangePassword) && (
                <h5 className="text-center text-red-500">Sorry! Something went wrong ❌</h5>
              )}
              
              {successMessage!=""?(
                  <h5 className="text-center text-green-500">
                    Password reset successfully ✅<br /> Redirecting...
                  </h5>
              ):""
                }

              {isResetSuccess ||
                ((isSuccessChangePassword) && (
                  <h5 className="text-center text-green-500">
                    Password reset successfully ✅<br /> Redirecting...
                  </h5>
                ))}
            </ResetCard>
          </ResetContainer>
        </Loader>
      </Layout>
    </div>
  );
}

export default ResetPassword;

export const ResetContainer = tw(Wrapper)`
  flex 
  h-[800px]
  min-h-screen 
  flex-col 
  items-center 
  justify-center
`;

const ResetCard = tw.div`
  w-full 
  max-w-[600px] 
  rounded-lg 
  p-12 
  shadow-lg 
  bg-white-300
  dark:bg-gray-900
`;

const ResetInputBlock = tw.div`
  flex
  items-center
  flex-wrap
  gap-4
`;

const ResetInput = tw.input`
  rounded-md 
  shadow-md
  border-gray-300 
  dark:border-gray-900 
  dark:bg-gray-700 
`;

const ResetSubmitButton = tw(Button)`
  w-full 
  text-black
  bg-lime-500
  dark:text-white
  dark:bg-dark-600/50
  hover:shadow-primary-800/50 
  dark:hover:shadow-dark-600/50
`;
