import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { Wrapper, Button } from "./";
import { inputItems } from "../variables";

const Container = tw(Wrapper)`
  grid 
  gap-6 
  items-center
  md:grid-cols-2 
`;

const Input = tw.input`
  w-full 
  rounded-md 
  shadow-md
  border-gray-300 
  dark:border-gray-900 
  dark:bg-gray-700 
`;

const TextArea = tw.textarea`
  w-full 
  rounded-md 
  shadow-lg
  min-h-[150px] 
  border-gray-300 
  dark:border-gray-900 
  dark:bg-gray-700 
`;

const SubmitButton = tw(Button)`
  w-full 
  text-white 
  bg-primary-800 
  dark:bg-dark-600/50
  hover:shadow-primary-800/50 
  dark:hover:shadow-dark-600/50
`;

const Contact = ({ initialState = { firstName: "", lastName: "", email: "", message: "" } }) => {
  const [formData, setFormdata] = useState(initialState);

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="contact" className="scroll-mt-20 bg-primary-200 py-16 dark:bg-dark-600/20">
      <Container>
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-bold">কোনো প্রশ্ন আছে?</h3>
          <p>যেকোনো প্রয়োজনে যোগাযোগ করুন</p>
        </div>
        <div className="">
          <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
            {inputItems.map((inputItem, index) => (
              <div className="" key={index}>
                <label htmlFor={inputItem.item} className="mb-2 block">
                  {inputItem.label}
                </label>
                <Input
                  name={inputItem.item}
                  type={inputItem.type}
                  placeholder={inputItem.placeholder}
                  autoComplete={inputItem.item}
                  value={formData[inputItem.item]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="mb-2 block">
                আপনার প্রশ্নটি করুন
              </label>
              <TextArea
                name="message"
                type="text"
                placeholder="Your question"
                autoComplete="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <SubmitButton type="submit">Send question</SubmitButton>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
