import React from "react";

import { Head, withAuth } from "../../../components";
import Dashboard from "../../../components/Dashboard";
import withStudent from "../../../components/withStudent";

const Resources = () => {
  return (
    <Dashboard>
      <Head title="Student Resources" hasMaterialTable={undefined} />
      Resources
    </Dashboard>
  );
};

export default withStudent(withAuth(Resources));
