import React from "react";
import Slider from "react-slick";
import { Wrapper, Review } from "./";
import { reviews } from "../variables";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div id="reviews" className="scroll-mt-20 py-16">
      <Wrapper>
        <h3 className="mb-12 text-center font-bold">রিভিউ</h3>
        <Slider {...settings}>
          {reviews.map((item, index) => (
            <Review data={item} key={index} />
          ))}
        </Slider>
      </Wrapper>
    </div>
  );
};

export default SliderComponent;
