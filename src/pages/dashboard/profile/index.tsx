import * as React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

import { useUser } from "../../../hooks/useUser";
import { useGetStudentQuery } from "../../../state/services";
import { Dashboard, withAuth } from "../../../components";

function index() {
  const { role, email, id } = useUser();

  const router = useRouter();

  const { data, isLoading } = useGetStudentQuery(
    {
      id,
    },
    {
      skip: role?.toLowerCase() !== "student",
    }
  );

  return (
    <LoadingOverlayWrapper active={isLoading}>
      <Dashboard>
      <div className="grid max-w-sm grid-cols-2 gap-4 p-4  bg-gray-700 rounded text-white">
        <div className="space-y-6">
        <div className="flex flex-col space-y-2">
            <h6 className="text-lg font-medium text-white">Id:</h6>
            <p >{id}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <h6 className="text-lg font-medium text-white">EMAIL:</h6>
            <p >{email}</p>
          </div>
          
          {data && (
            <>
              <div className="flex flex-col space-y-2">
                <h6 className="text-lg font-data text-white">NAME</h6>
                <p >{data.name}</p>
              </div>

              <div className="flex flex-col space-y-2">
                <h6 className="text-lg font-data text-white">COURSE</h6>
                <p >{data.courseTitle}</p>
              </div>

              <div className="flex flex-col space-y-2">
                <h6 className="text-lg font-data text-white">PACKAGE</h6>
                <p >{data.package}</p>
              </div>

              <div className="flex flex-col space-y-2">
                <h6 className="text-lg font-data text-white">BATCH</h6>
                <p >{data.batch}</p>
              </div>
            </>
            
          )}
          

          <Button
            onClick={() => {
              router.push("/reset-password/me");
            }}
            variant="contained"
            className="bg-gradient-to-r from-indigo-700"
            color="secondary"
          >
            Reset Password
          </Button>
          </div>
        </div>
      </Dashboard>
    </LoadingOverlayWrapper>
  );
}

export default withAuth(index);
