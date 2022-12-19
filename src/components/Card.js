import React, {useState} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import tw from "tailwind-styled-components";
import {MdPlayArrow} from "react-icons/md";
import {NextImage, Anchor2} from "./";

import "react-modal-video/css/modal-video.css";
import {useGetPackagesQuery} from "../state/services";
import LoadingOverlay from "react-loading-overlay-ts";

const ModalVideo = dynamic(() => import("react-modal-video"), {ssr: false});

const Container = tw.div`
  flex 
  flex-col 
  h-full 
  bg-white
  justify-between 
  shadow-lg 
  rounded-lg 
  overflow-hidden 
  transition-all 
  duration-300 
  hover:shadow-xl 
  dark:bg-dark-600/20
`;

const Play = tw.button`
  absolute 
  left-1/2 
  top-1/2 
  -translate-x-1/2 
  -translate-y-1/2 
  rounded-full 
  bg-primary-200/60 
  p-4 
  transition-all 
  duration-300 
  hover:bg-primary-200/90 
  hover:shadow-lg 
  dark:bg-dark-200/50 
  dark:hover:bg-dark-200/90
`;

const Card = ({data, actionType}) => {
    const {id, batch, courseTitle, description, image, video, totalClass, price, students} =
    data || {};

    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const thumbnail = `https://img.youtube.com/vi/${video}/maxresdefault.jpg`;
    const priceData = price;
    // const priceData = [{'student':2500, 'jobHolder':3000}];
    let _package = undefined;

    let {data: packagesData, isLoading: isPackageLoading} = useGetPackagesQuery({courseId: id});
    _package = packagesData?.[packagesData?.length -1];
    console.log(packagesData);

    // const _package = packagesData?.find((item) => item.packageName === 'Diamond') ?? packagesData?.[0];
    


    const jobHolderFee =  priceData?.jobHolderFee??_package?.jobHolderFee ?? 0;

    const studentFee =   priceData?.studentFee ??_package?.studentFee?? 0;
    const packageName =   priceData?.packageName ??_package?.packageName?? "";

    return (
        <LoadingOverlay active={isPackageLoading} spinner text="Loading...">
            <Container>
                <div>
                    <div className="relative">
                        {video === 'h' ? (
                            <>
                                <NextImage
                                    src={thumbnail}
                                    alt={video}
                                    width={640}
                                    height={360}
                                    layout="responsive"
                                    priority
                                />
                                <Play onClick={handleClick}>
                                    <MdPlayArrow size={36}/>
                                </Play>
                                <ModalVideo channel="youtube" isOpen={isOpen} videoId={video} onClose={handleClick}/>
                            </>
                        ) : image ? (
                            <NextImage src={image} alt={video} width={640} height={360} layout="responsive"/>
                        ) : null}
                    </div>

                    {(courseTitle || description) && (
                        <div className="px-6 pt-6">
                            {courseTitle && <h6 className="font-bold">{courseTitle + " ("+packageName +")"}</h6>}
                            {batch && <p>ব্যাচ {batch}</p>}
                            {description && <p className="mt-4 text-justify">{description}</p>}
                        </div>
                    )}
                </div>
                <div className="p-6">
                    <div className="mt-4 flex justify-between">
                        {totalClass && (
                            <p>
                                ক্লাসঃ <span className="font-bold">{totalClass} টি</span>
                            </p>
                        )}
                        {students && (
                            <p>
                                শিখছেনঃ <span className="font-bold">{students} জন</span>
                            </p>
                        )}
                    </div>
                    {price && (
                        <h6 className="mt-6 text-center font-bold">
                            কোর্স ফিঃ <span>{jobHolderFee} টাকা</span>
                        </h6>
                    )}
                    <div className="mt-6 text-center font-bold">
                        <div>{studentFee} টাকা শুধুমাত্র ছাত্র এবং ফ্রেশ গ্রাজুয়েট দের জন্য।</div>
                    </div>

                    <div className="mt-6 flex">
                        {actionType === "enroll" ? (
                            <Link href={`/enroll/${id}`} passHref>
                                <Anchor2 className="w-full bg-primary-800 text-center text-primary-200">
                                    এনরোল করুন
                                </Anchor2>
                            </Link>
                        ) : (
                            <Link href={`/course/${id}`} passHref>
                                <Anchor2 className="w-full bg-primary-800 text-center text-primary-200">
                                    বিস্তারিত দেখুন
                                </Anchor2>
                            </Link>
                        )}
                    </div>
                </div>
            </Container>
        </LoadingOverlay>

    );
};

export default Card;
