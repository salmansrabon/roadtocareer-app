import React from "react";
import Rate from "rc-rate";
import tw from "tailwind-styled-components";
import { NextImage } from "./";

import "rc-rate/assets/index.css";

const SliderItem = tw.div`
  relative 
  flex 
  flex-col 
  items-center  
  h-full
  shadow-md 
  bg-primary-200
  rounded-xl 
  cursor-pointer
  p-6
  dark:bg-dark-600/20 
`;

const Review = ({ data }) => {
  const { image, name, batch, rating, description } = data || {};

  return (
    <SliderItem>
      <div className="absolute -top-10 w-20">
        <NextImage
          variant="circular"
          src={image}
          alt={image}
          width={80}
          height={80}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <h5 className="mt-10 text-center">
        {name}{" "}
        {batch && <span className="text-xl text-gray-700 dark:text-gray-300">(Batch {batch})</span>}
      </h5>
      <Rate count={5} defaultValue={rating} allowHalf disabled className="rating mt-4" />
      <p className="mt-4 text-justify">{description}</p>
    </SliderItem>
  );
};

export default Review;
