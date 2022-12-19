import React from "react";

import withStudent from "../../../components/withStudent";
import { Dashboard, withAuth } from "../../../components";

const index = () => {
  return <Dashboard>this is attendance page</Dashboard>;
};

export default withStudent(withAuth(index));
