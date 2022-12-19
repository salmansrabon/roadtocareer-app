import React, { useEffect } from "react";

import { useRole } from "../hooks/useRole";

const withPermissions = <T,>(roles: ("admin" | "student" | "instructor")[]) => {
  return (Component: React.FC<T>) => (props: T) => {
    const role = useRole();

    useEffect(() => {
      if (!roles.includes(role)) {
        window.location.href = "/";
      }
    }, [roles, role]);

    return <Component {...props} />;
  };
};

export default withPermissions;
