import tw from "tailwind-styled-components";

export const Wrapper = tw.div`
  container
  mx-auto
  px-6
`;

export const Anchor1 = tw.a`
  relative
  before:bg-primary-800
  before:-bottom-2
  before:h-1
  before:inset-x-0 
  before:absolute 
  before:transform 
  before:origin-center 
  before:transition-all 
  before:duration-500
  before:scale-x-0
  hover:before:scale-x-100
  dark:before:bg-dark-800
`;

export const Anchor2 = tw.a`
  p-2
  rounded
  transition
  duration-300
  hover:shadow-lg
`;

export const Button = tw.button`
  p-2
  rounded
  transition
  duration-300
  hover:shadow-md
`;

export const InputBlock = tw.div`
  flex
  items-center
  gap-4
`;

export const Input = tw.input`
  rounded-md 
  shadow-md
  border-gray-300 
  dark:border-gray-900 
  dark:bg-gray-700 
`;

export const TextArea = tw.textarea`
  rounded-md 
  shadow-md
  border-gray-300 
  min-h-[100px]
  dark:border-gray-900 
  dark:bg-gray-700 
`;

export const Select = tw.select`
  rounded-md 
  shadow-md
  border-gray-300 
  dark:border-gray-900 
  dark:bg-gray-700 
`;

export const SubmitButton = tw(Button)`
  text-white 
  bg-primary-800 
  dark:bg-dark-600/50
  hover:shadow-primary-800/50 
  dark:hover:shadow-dark-600/50
`;
