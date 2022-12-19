import React, { useEffect } from "react";

import { useRole } from "../hooks/useRole";

const withAdmin = <T,>(Component: React.FC<T>) => {
  const AuthComponent = ({ props }) => {
    const role = useRole();

    useEffect(() => {
      if (role !== "admin") {
        window.location.href = "/";
      }
    }, [role]);

    return <Component {...props} />;
  };

  return AuthComponent;
};

export default withAdmin;
