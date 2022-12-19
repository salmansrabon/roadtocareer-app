import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export interface UserReducer {
  isAuthenticated: boolean;
  token: string;
  email?: string;
  role?: "admin" | "student" | "instructor";
  isFetching?: boolean;
  isError?: boolean;
  error?: any;
  id: string;
}

export const useUser = (): UserReducer => {
  const user = useSelector<{ userReducer: UserReducer }>(
    (state) => state.userReducer
  ) as UserReducer;

  let decoded: UserReducer = null;

  try {
    if (user.token) {
      decoded = jwt_decode<UserReducer>(user.token ? user.token : "");
    }
  } catch (error) {
    console.log(error);
  }

  return {
    ...user,
    id: decoded?.id,
    role: decoded?.role,
    // role: "student",
    email: decoded?.email,
  };
};
