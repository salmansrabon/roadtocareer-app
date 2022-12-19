import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { MdCheckBox } from "react-icons/md";
import { Wrapper, Card } from ".";
import { useGetModulesQuery, useGetPackagesQuery } from "../state/services";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaSortDown } from "react-icons/fa";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Anchor2 } from "./Teachers";
import Link from "next/link";
import Grid from "@mui/material/Grid";

const Container = tw.div`
  flex
  flex-col
  justify-center 
  grid-cols-1 
  items-center
  gap-10 
`;

const Ul = tw.ul`
  grid 
  grid-cols-1 
  items-start 
  gap-x-4 
  gap-y-10 
  md:grid-cols-2
`;

const WhatDoYouLearn = ({ course }) => {
  const { id, contentSyllabus } = course || {};

  const { data, isLoading } = useGetPackagesQuery({ courseId: id });
  const [value, setValue] = React.useState((data?.length || 1)-1);
  
  
  useEffect(() => {
   if(!isLoading){
    setValue(data?.length-1)
   }
  }, [isLoading])
  

  const packageId = data?.[value]?.id;
  // console.log(data?.[value])
  const {
    data: moduleData,
    isLoading: isModuleLoading,
    isFetching: isModuleFetching,
  } = useGetModulesQuery({ packageId }, { skip: !packageId });

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <LoadingOverlayWrapper active={isLoading}>
      <Wrapper className="py-16">
        {/* <h3 className="mb-10 font-bold text-center">এই কোর্স থেকে কি কি শিখতে পারবে:</h3> */}
        <Container>
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={5} md={4}>
              <Card data={{...course, 'price': data?.[value]}} actionType="enroll" />
            </Grid>

            <Grid item xs={7} md={8}>
              <h3 className="mb-6 text-center font-bold">
                কোর্সের {data?.[value]?.packageName} প্যাকেজে যা কিছু আছে
              </h3>
              <div className="w-full max-w-4xl">
                <Ul>
                  {contentSyllabus &&
                    JSON.parse(contentSyllabus).map((item, index) => (
                      <li className="flex" key={index}>
                        <MdCheckBox className="mt-0.5 h-full w-6 flex-none" />
                        <span className="ml-2">{item}</span>
                      </li>
                    ))}
                </Ul>

                <Tabs
                  scrollButtons="auto"
                  value={value}
                  onChange={handleChange}
                  aria-label="wrapped label tabs example"
                  className="bg-gray-800"
                >
                  {data?.slice()?.reverse()?.map((item, index) => (
                    <Tab
                      key={data?.length - 1 -index}
                      value={data?.length - 1 -index}
                      label={
                        <div className="flex items-center gap-2">
                          <Typography color="white">{item.packageName}</Typography>
                          <Typography color="antiquewhite">৳{item.studentFee}</Typography>
                        </div>
                      }
                      className="gap-2 "
                    />
                  ))}
                </Tabs>
                <LoadingOverlayWrapper active={isModuleLoading || isModuleFetching}>
                  <Box className="mt-8 min-h-[200px]">
                    {moduleData?.map((item) => {
                      const { module } = item;

                      let list = [];

                      try {
                        const parsed = JSON.parse(JSON.parse(module));

                        if (Array.isArray(parsed)) {
                          list.push(...parsed);
                        }
                      } catch (error) {
                        // console.log(error);
                      }

                      return list.map(({ title, description }, index) =>
                        !title ? null : (
                          <Accordion
                            className="border-b border-gray-700 bg-gray-900 text-gray-300"
                            key={index}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon className="text-gray-300 " />}
                              aria-controls="panel2a-content"
                              id="panel2a-header"
                            >
                              <Typography>{title || "-----"}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>{description || "-----"}</Typography>
                            </AccordionDetails>
                          </Accordion>
                        )
                      );
                    })}
                  </Box>
                </LoadingOverlayWrapper>
              </div>
              {/* <Link href={`/enroll/${id}`} passHref>
            <Anchor2 className="w-full text-center bg-primary-800 text-primary-200">
              এনরোল করুন
            </Anchor2>
          </Link> */}
            </Grid>
          </Grid>
        </Container>
      </Wrapper>
    </LoadingOverlayWrapper>
  );
};

export default WhatDoYouLearn;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
