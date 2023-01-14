import React from "react";
import tw from "tailwind-styled-components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  Head,
  Layout,
  Wrapper,
  Loader,
  InputBlock,
  Input,
  Select,
  SubmitButton,
} from "../../components";
import { wrapper } from "../../state/store";
import { getCourse } from "../../state/course";
import { signup } from "../../state/user/action";

const Container = tw(Wrapper)`
  flex 
  h-[800px]
  pt-20 
  min-h-screen 
  flex-col 
  items-center 
  justify-center
  mt-10
`;

const Card = tw.div`
  w-full 
  max-w-[700px] 
  rounded-lg 
  px-12
  py-5
  shadow-lg 
  dark:bg-dark-600/20
`;

const Enroll = (props) => {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, error } = useSelector((state) => state.userReducer);
  const { register, handleSubmit, unregister } = useForm();
  const [selection, setSelection] = React.useState("Fresh Graduate");
  const onSubmit = (student) => {
    // let py = student.passingYear;
    // student.passingYear = new Date(py.split(',')[1], py.split(',')[0]);
    const data = {
      ...student,
      courseId: props.id,
    };
    dispatch(signup({ data }));
  };

  const packages = JSON.parse(props.course.price ?? null);
  const { courseTitle, batch, isEnabled } = props.course;

  return (
    <>
      <Head title="Please fill up the form to enroll with us" />
      <Layout>
        <Loader active={isFetching}>
          <Container>
            <Card>
              {!isSuccess && isEnabled ? (
                <div>
                  <h3 className="mt-4 font-bold text-center">Enrollment Form</h3>
                  <p className="mb-2 text-center">
                    <strong>Please fill up the form to enroll with us</strong>
                  </p>
                  <div className="flex my-3 mb-5 space-x-10  justify-center border-solid border-2 border-sky-500 bg-green-100 dark:bg-black p-2">
                    <p className="text-base font-normal">
                       <span className="text-xl"><strong>Course Name:</strong> {" " +courseTitle}</span>
                    </p>
                    <p className="text-base font-normal">
                    <span className="text-xl"><strong>Batch:</strong> {" " +batch}</span>
                    </p>
                  </div>
                  <form className="flex flex-col mt-2 mb-0 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <InputBlock>
                      <label htmlFor="name" className="min-w-[100px] flex-shrink-0">
                        Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Your Full Name"
                        className="flex-grow"
                        required
                        {...register("name",{
                          required: 'missing required field',
                          setValueAs: v => v.trim(),
                        })}
                      />
                    </InputBlock>

                    <InputBlock>
                      <label htmlFor="email" className="min-w-[100px] flex-shrink-0">
                        Email *
                      </label>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        className="flex-grow"
                        required
                        {...register("email",{
                          required: 'missing required field',
                          setValueAs: v => v.trim(),
                        })}
                      />
                    </InputBlock>
                    <InputBlock>
                      <label htmlFor="mobile" className="min-w-[100px] flex-shrink-0">
                        Mobile *
                      </label>
                      <span>+88</span>
                      <Input
                        type="text"
                        placeholder="Your Mobile Number"
                        className="flex-grow"
                        required
                        {...register("mobile",{
                          required: 'missing required field',
                          setValueAs: v => v.trim(),
                        })}
                      />
                    </InputBlock>

                    <InputBlock>
                      <label htmlFor="profession" className="min-w-[100px] flex-shrink-0">
                        Occupation *
                      </label>
                      <Select
                        className="flex-grow"
                        required
                        {...register("profession")}
                        onChange={(e) => {
                          setSelection(e.target.value)
                          if(e.target.value !="job holder"){
                            unregister("experience");
                            unregister("company")
                          }
                        }}
                      >
                        <option value="Fresh Graduate">Fresh Graduate</option>
                        <option value="Student">Student</option>
                        <option value="Job Holder">Job Holder</option>
                      </Select>
                    </InputBlock>
                    <InputBlock>
                      <label htmlFor="Package" className="min-w-[100px] flex-shrink-0">
                        Package *
                      </label>
                      <Select className="flex-grow" required {...register("package")}>
                        {/* {selection.toLowerCase() != "job holder" ? ( */}
                          {packages.map((item, index) => (
                            <option key={index} value={item.packageName}>
                              {item.packageName}
                            </option>
                          ))}
                        {/* ) : (
                          <option key={0} value={packages[0].package}>
                            {" "}
                            {packages[0].package}{" "}
                          </option>
                        )} */}
                      </Select>
                    </InputBlock>
                    <InputBlock>
                      <label htmlFor="university" className="min-w-[100px] flex-shrink-0">
                        University *
                      </label>
                      <Input
                        type="text"
                        placeholder="Your University"
                        className="flex-grow"
                        required
                        {...register("university",{
                          required: 'missing required field',
                          setValueAs: v => v.trim(),
                        })}
                      />
                    </InputBlock>
                    <InputBlock>
                      <label htmlFor="passingYear" className="min-w-[100px] flex-shrink-0">
                        Passing Year *
                      </label>
                      <Input
                        type="string"
                        placeholder=" month, year (example: 02, 2020)"
                        className="flex-grow"
                        required
                        {...register("passingYear",{
                          required: 'missing required field',
                          setValueAs: v => v.trim(),
                        })}
                      />
                    </InputBlock>
                    {selection.toLowerCase() == "job holder" && (
                      <>
                        <InputBlock>
                          <label htmlFor="company" className="min-w-[100px] flex-shrink-0">
                            Company
                          </label>
                          <Input
                            type="text"
                            placeholder="Your Company Name"
                            className="flex-grow"
                            {...register("company",{
                              required: 'missing required field',
                              setValueAs: v => v.trim(),
                            })}
                          />
                        </InputBlock>

                        <InputBlock>
                          <label htmlFor="experience" className="min-w-[100px] flex-shrink-0">
                            Experience
                          </label>
                          <Input
                            type="text"
                            placeholder="Your Total Job Experience"
                            className="flex-grow"
                            {...register("experience",{
                              required: 'missing required field',
                              setValueAs: v => v.trim(),
                            })}
                          />
                        </InputBlock>
                      </>
                    )}
                    <InputBlock>
                      <label htmlFor="city" className="min-w-[100px] flex-shrink-0">
                        City/Area
                      </label>
                      <Input
                        type="text"
                        placeholder="City Name"
                        className="flex-grow"
                        {...register("city",{
                          // required: 'missing required field',
                          setValueAs: v => v.trim(),
                        })}
                      />
                    </InputBlock>
                    {isError && <div className="w-full text-center text-red-600">{error}</div>}
                    <SubmitButton type="submit" className="w-full">
                      Submit
                    </SubmitButton>
                  </form>
                </div>
              ) : (
                <>
                {!isEnabled?
                <div className="w-full text-center text-green-600">
                  Course is not available.
                </div>
                :<div className="w-full text-center text-green-600">
                Enrollment Successfully. Please check your email.
              </div>
              }
              </>)}
            </Card>
          </Container>
        </Loader>
      </Layout>

    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
  const id = query.id;

  await store.dispatch(getCourse({ id }));

  const state = store.getState();

  const { isSuccess, isError, error, course } = state.courseReducer;

  return {
    props: {
      id: query.id,
      isSuccess,
      isError,
      error,
      course,
    },
  };
});

export default Enroll;
