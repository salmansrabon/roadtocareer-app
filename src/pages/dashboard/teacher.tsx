import React from "react";

import { withAuth, Dashboard, MaterialTable, Head, Loader } from "../../components";
import { useGetTeachersQuery } from "../../state/services";

const Teachers = () => {
  const { data, isLoading } = useGetTeachersQuery({});

  const teachers = data?.map((teacher) => ({
    ...teacher,
    createdAt: new Date(teacher.createdAt).toLocaleString(),
    updatedAt: new Date(teacher.updatedAt).toLocaleString(),
  }));

  return (
    <Loader active={isLoading}>
      <Dashboard>
        <Head title="Payments" />

        <MaterialTable
          title="Payments"
          columns={[
            { title: "ID", field: "id" },
            { title: "Name", field: "name" },
            { title: "Module IDs", field: "moduleIds" },
            { title: "Course IDs", field: "courseIds" },
            { title: "University", field: "university" },
            { title: "Phone", field: "mobile" },
            { title: "Email", field: "email" },
          ]}
          data={teachers}
          actions={[]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
      </Dashboard>
    </Loader>
  );
};

export default withAuth(Teachers);
