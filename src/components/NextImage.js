import React from "react";
import Image from "next/image";
import tw from "tailwind-styled-components";

const ImageWrapper = tw.div`
  ${({ variant }) =>
    variant === "circular" ? "relative rounded-full ring ring-primary-600 dark:ring-dark-800" : ""}
`;

const NextImage = ({ variant, src, alt, ...rest }) => {
  return (
    <ImageWrapper variant={variant}>
      <Image
        className={variant === "circular" ? "rounded-full" : ""}
        src={src}
        alt={alt}
        {...rest}
      />
    </ImageWrapper>
  );
};

export default NextImage;
