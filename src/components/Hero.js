import React from "react";
import Image from "next/image";
import tw from "tailwind-styled-components";
import { Wrapper } from "./";

const images = [
  "/images/hero-1.png",
  "/images/hero-2.png",
  "/images/hero-3.png",
  "/images/hero-4.png",
  "/images/hero-5.png",
];

const Container = tw(Wrapper)`
  py-16
  grid
  grid-cols-1
  gap-10
  items-center

  sm:grid-cols-2
  sm:gap-6
`;

const Hero = () => {
  return (
    <div className="pt-20">
      <Container>
        <div>
          <h2 className="font-bold">হয়ে উঠুন ইন্ডাস্ট্রি এক্সপার্ট </h2>
          <p className="mt-6 text-justify">
            আমাদের চলার পথ খুব বেশিদিন না, মাত্র ১ বছর। এই ১ বছরে আপনাদের সাপোর্ট এবং ভালোবাসায় আমরা মুগ্ধ। এই মুগ্ধতার রেশ যাতে কখনো হারিয়ে না যায়, তার জন্য আমাদের আপ্রাণ প্রচেষ্টা থাকে আপনাকে 
            সেরা ইন্সট্রাক্টর দিয়ে সফটওয়্যার ইন্ডাস্ট্রির প্রফেশনাল বিষয় গুলো হাতে কলমে শিখানো যাতে করে আপনি যথেষ্ট স্কিল্ড হয়ে সেরা কোম্পানি গুলোতে নিজের অবস্থান সুনিশ্চিত করতে পারেন। 
            সফটওয়্যার ইন্ডাস্ট্রি তে ক্ষুদ্র অবদান রাখতে আমরা এখন পর্যন্ত নিয়ে এসেছি ২ টি কোর্স (SDET এবং DevOPS) আর খুব শিঘ্রী আসতে যাচ্ছে বর্তমান সময়ের আলোচিত Data Visualization এর উপরে কোর্স।
            সাথেই থাকুন। 
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src={images[0]}
            alt="hero"
            width={500}
            height={400}
            objectFit="contain"
            priority
          />
        </div>
      </Container>
    </div>
  );
};

export default Hero;
