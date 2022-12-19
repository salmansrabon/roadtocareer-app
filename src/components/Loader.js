import React from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { SpinnerCircular } from "spinners-react";

const Loader = ({ active, children }) => {
  return (
    <LoadingOverlay active={active} spinner={<SpinnerCircular />}>
      {children}
    </LoadingOverlay>
  );
};

export default Loader;
