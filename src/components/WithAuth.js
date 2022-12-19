import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "../hooks/useUser";
import { authenticate } from "../state/user";

const withAuth = (Component) => {
  const AuthComponent = ({ props }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useUser();

    // track status

    useEffect(() => {
      dispatch(authenticate());
      // is exicuted only once

      if (!isAuthenticated) {
        window.location.href = "/";
      }
    }, [dispatch, isAuthenticated]);

    // loading...

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
