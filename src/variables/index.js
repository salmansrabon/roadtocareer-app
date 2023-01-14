import {
  MdCalendarToday,
  MdOutlineCalendarToday,
  MdMonitor,
  MdPeopleAlt,
  MdPayment,
  MdAssignment,
  MdSchool,
  MdViewModule,
  MdShoppingBag,
} from "react-icons/md";
import { BiListUl } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { SiAwesomelists, SiCoursera } from "react-icons/si";
import { FaChalkboardTeacher } from "react-icons/fa";
//

// export const api = process.env.NEXT_PUBLIC_API_URL;
export const api = process.env.NEXT_PUBLIC_API_URL||"http://localhost:8081/";

export const brandName = "ROAD TO CAREER";

export const navMenu = [
  {
    title: "Courses",
    href: "/#courses",
  },
  {
    title: "About Us",
    href: "/#about",
  },
  {
    title: "Teachers",
    href: "/#teachers",
  },
  {
    title: "Reviews",
    href: "/#reviews",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
];

export const navButtons = [
  {
    title: "Log in",
    href: "/login",
  },
];

export const dashboardMenus = [
  {
    title: "Students",
    icon: MdPeopleAlt,
    link: "/student",
  },
  {
    title: "Attendance",
    icon: MdSchool,
    link: "/attendance",
  },
  {
    title: "Payment",
    icon: MdPayment,
    link: "/payment",
  },
  {
    title: "Courses",
    icon: SiCoursera,
    link: "/course",
    gap: true,
  },
  {
    title: "Packages",
    icon: MdShoppingBag,
    link: "/packages",
    gap: true,
  },
  {
    title: "Modules",
    icon: MdViewModule,
    link: "/modules",
    gap: true,
  },
  {
    title: "Assignments",
    icon: MdAssignment,
    link: "/assignment",
  },
  {
    title: "Teachers",
    icon: FaChalkboardTeacher,
    link: "/teacher",
  },
  {
    title: "Quizzes",
    icon: MdSchool,
    link: "/quiz",
  },
];

export const studentMenus = [
  {
    title: "Payments",
    icon: MdPayment,
    link: "/studentpayment",
  },
  {
    title: "Attendance",
    icon: MdSchool,
    link: "/attendance",
  },
  // {
  //   title: "Resources",
  //   icon: BiListUl,
  //   link: "/resources",
  // },
  // {
  //   title: "Assignments",
  //   icon: MdAssignment,
  //   link: "/assignment",
  // },
  // {
  //   title: "Quizzes",
  //   icon: MdSchool,
  //   link: "/quiz",
  // },
];

export const instructorMenus = [
  {
    title: "Students",
    icon: MdPeopleAlt,
    link: "/student",
  },
  {
    title: "Courses",
    icon: SiCoursera,
    link: "/course",
  },
  {
    title: "Packages",
    icon: MdShoppingBag,
    link: "/packages",
  },
  {
    title: "Modules",
    icon: MdViewModule,
    link: "/modules",
  },
  {
    title: "Assignments",
    icon: MdAssignment,
    link: "/assignment",
  },
  {
    title: "Quizzes",
    icon: MdSchool,
    link: "/quiz",
  },
];

export const userMenuMap = {
  admin: dashboardMenus,
  student: studentMenus,
  instructor: instructorMenus,
};

export const courses = [
  {
    id: "1",
    thumbnail: "/images/demo-cover.webp",
    video: "mSC6GwizOag",
    name: "Styling Forms with Tailwind CSS",
    summery:
      "অর্থহীনতা আর অর্থদ্যোতনার সেই ঈর্ষাকাতর মোহাবিষ্টতা তাই তৈরি করে নাও নিজের মাঝে- চাই একটুখানি ঔৎসুক্য। নিজেই ঠিক করো, নিজের ভাষাটা কি অর্থহীন, নাকি কিছু সত্যিই বলছে!",
    totalClass: 10,
    students: 50,
    courseFee: 4000,
  },
  {
    id: "2",
    thumbnail: "/images/demo-cover.webp",
    video: "LA1tah85dvA",
    name: "Styling Forms with Tailwind CSS",
    summery:
      "অর্থহীনতা আর অর্থদ্যোতনার সেই ঈর্ষাকাতর মোহাবিষ্টতা তাই তৈরি করে নাও নিজের মাঝে- চাই একটুখানি ঔৎসুক্য। নিজেই ঠিক করো, নিজের ভাষাটা কি অর্থহীন, নাকি কিছু সত্যিই বলছে!",
    totalClass: 10,
    students: 50,
    courseFee: 4000,
  },
  {
    id: "3",
    thumbnail: "/images/demo-cover.webp",
    video: "mSC6GwizOag",
    name: "Styling Forms with Tailwind CSS",
    summery:
      "অর্থহীনতা আর অর্থদ্যোতনার সেই ঈর্ষাকাতর মোহাবিষ্টতা তাই তৈরি করে নাও নিজের মাঝে- চাই একটুখানি ঔৎসুক্য। নিজেই ঠিক করো, নিজের ভাষাটা কি অর্থহীন, নাকি কিছু সত্যিই বলছে!",
    totalClass: 10,
    students: 50,
    courseFee: 5000,
  },
];

export const reviews = [
  {
    image: "/images/nahid.jpg",
    name: "Mahmudur Rahman Nahid",
    batch: 5,
    rating: 5,
    description:"In my opinion, this is the best platform to learn Manual and Automation testing. Also specially for fresh graduates who are confused about their future path and willing to take a shot at SQA this is the place I recommend. The instructors in this course, the slides, and the examples shown in class are standard. If you do the projects and classes properly, I can surely say that you will have an advantage in the entry-level sector. Also if you get stuck while solving a problem you can easily get one-to-one help from them. You can give mock interviews, which are also taken by reputed QA experts from different companies which will give you an idea before applying for real jobs."
  },
  {
    image: "/images/istiak.jpg",
    name: "Istiak Ahmed",
    batch: 5,
    rating: 5,
    description:"In my opinion, This is the Best platform in our country to learn both Manual & Automation Testing. The mentor of Road to SDET, Salman Bhai is one of the best. He taught us from the root briefly. Also He emphasized us to complete all the 12 projects which was very helpful for me to get my first job and also to work in my job. Anybody who will be serious throughout the course will be surely benefited. In this course there is Java Programming module is also included, That also helped me a lot. And lastly there is mock interview sessions available which is based upon real life scenario. This is very helpful to find out the lacking. I recommend anyone to join this course to become a successful Full Stack SQA & Test Automation Engineer."
  },
  {
    image: "/images/rakib.jpg",
    name: "Abdullah Al Rakib",
    batch: 4,
    rating: 5,
    description:"This is the  Best platform in our country to learn both Manual & Automation Testing .The mentor of Road to SDET Salman Bhai is one of the best. I recommend anyone to join this course to become a successful Full Stack SQA & Test Automation Engineer."
  },
  {
    image: "/images/salauddin.jpg",
    name: "Md. Salauddin Sany",
    batch: 4,
    rating: 5,
    description:
    "Salman Rahman Bhai, Senior Software Engineer at Cefalo Bangladesh Limited, is a mentor of Road to SDET.  He is one of the best instructors I have ever seen."+ 
    "Salman bhai meticulously explains every topics and gives assignments. He is very proficient in his field. He is not only a learned man but also a very helpful individual. I have worked hard for 3 months for completing the assignments and submitted before due dates."
  },
  {
    image: "/images/shoheb.jpg",
    name: "Hasan Shoheb",
    batch: 3,
    rating: 5,
    description:
      "The course was very comprehensive and easy to understand. Very well composed. Covered all related concepts from basics to advance in a very precise manner.",
  },
  {
    image: "/images/rony.jpg",
    name: "Mehedi Hasan Rony",
    batch: 3,
    rating: 5,
    description:
      "একজন 𝐅𝐮𝐥𝐥 𝐬𝐭𝐚𝐜𝐤 𝐒𝐐𝐀 𝐄𝐧𝐠𝐢𝐧𝐞𝐞𝐫 হতে হলে ২টা জিনিস অনেক বেশি গুরুত্বপূর্ণ। প্রথমটি হচ্ছে নিজের প্রবল ইচ্ছাশক্তি ও কঠোর পরিশ্রম করার মানসিকতা এবং অন্যটি হচ্ছে গাইডলাইন বা একজন ভালো মানের মেন্টর। এখন ইন্টারনেটে সব কিছুই পাওয়া যায় এবং শেখাও যায় কিন্তু সেখানে মারাত্মক কিছু জিনিসের অভাব থেকেই যায় আর সেটা হল বাস্তবে কোম্পানিগুলোতে কিভাবে কাজ করা হয় তা সঠিকভাবে জানতে হলে অবশ্যই অভিজ্ঞতাসম্পন্ন এমন একজনকে দরকার যিনি একেবারে Basic থেকে Advance পর্যন্ত Project করানোর মাধ্যমে হাতে-কলমে শিখিয়ে দিবেন এবং Individual Assignment করতে দিবেন। আবার শুধু Assignment করতে দিয়েই কাজটা শেষ হয়ে যাবে না বরং সেগুলো ঠিক-ঠাক আছে কিনা বা ভুল হলে কোথায় কেন ভুল হচ্ছে সেটা বুঝিয়েও দিবেন। এভাবে না হলে জবের জন্য নিজেকে প্রস্তুত করা অনেকটাই অসম্ভব বলে আমি মনে করি। আর এই জিনিস গুলোর জন্য এখন পর্যন্ত সালমান ভাইয়ার থেকে অন্য কেউ উপযুক্ত কিনা আমার জানা নেই।",
  },
  {
    image: "/images/fariha.jpg",
    name: "Fariha Jabin",
    batch: 2,
    rating: 5,
    description:
      "আমি এইটুকু বলতে পারি প্রফেশনাল লাইফে কোন কোর্স আপনাকে স্কিল গিলে খাওয়াবে না। আপনার আগ্রহ, চেষ্টা থাকলে এই কোর্স আপনাকে বুস্ট আপ করবে দারুণ ভাবে। আর সালমান ভাইয়ের মত মেন্টর পাওয়া খুব লাকের ব্যাপার। আমি খুবই অবাক হতাম এতো গুলা স্টুডেন্টের এসাইনমেন্ট দেখা, আবার কেউ পারসোনাল নক দিলে সেটার রিপ্লাই দেয়া, কিভাবে এতো কিছু সামাল দেন উনি!! কোর্স শেষ করেছি দুই/তিন মাস আগে, কিন্তু এখনো কোন সমস্যায় পরলে ভাইয়া হেল্প তো করেনই, সাথে আরো কি সমস্যায় পড়তে পারি সেটাও আগে বুঝে সমাধান দিয়ে দেন। আল্লাহ ভাইয়া উত্তম প্রতিদান দিক।",
  },
  {
    image: "/images/moshiur.jpg",
    name: "Moshiur Rahman",
    batch: 1,
    rating: 5,
    description:
      "If you ask me this question about how can build a carrier in software automation, I must tell him about Salman Bhai, the mentor of road to SDET. I got all the benefits from Salman Bhai on my job getting journey .How to make a cv, face to interview. In my opinion, I see him as one of the best SQA professionals and mentor in Bangladesh. If anyone wants to do carrier in SQA. I must ask him to do a class of Road to SDET.",
  },
  {
    image: "/images/nazmul.jpg",
    name: "Nazmul Hoque",
    batch: 1,
    rating: 5,
    description:
      "Salman bhai, mentor of Road to SDET, is one of the best instructors I have ever seen. He is a great automation professional and helps me how to make a professional cv, how to write good test case, Web, API and mobile App automation script. I think that anyone can easily build his or her career if he or she follows salman vai’s guideline and enroll Road to SDET course.",
  }
  
  
];

export const about = [
  {
    avater: "/images/logo.png",
    name: "আমাদের বিশেষত্ব",
    details: [
      "প্রত্যেক ক্লাস এর পর Google Classroom এর মাধ্যমে Assignment দেয়া হয় এবং মূল্যায়ন করা হয়। কোথাও ভুল করলে কি ভুল হল সেটা সাথে সাথে বুঝিয়ে দেয়া হয়।",
      "গিটহাবে ১০ থেকে ১২ টি প্রোজেক্ট কমপ্লিট করানো হবে। যাতে করে যে কোন Interviewer আপনার দক্ষতা এবং Coding Capability সম্পর্কে ধারণা করতে পারে।",
      "মাঝে মধ্যেই থাকবে প্রব্লেম সল্ভিং ক্লাস যেগুলো আপনার আগের ক্লাস গুলো সম্পর্কে যেকোন Confusion দূর করে দিবে।",
      "প্রত্যেক ক্লাস এর PDF, PPT and Class Recording google drive এ দেয়া হবে এবং যেখানে থাকবে আপনার আজীবন Access!",
      "প্রত্যেক মাসে Performance এর উপর ভিত্তি করে Top 5 নির্ধারণ করা হবে এবং ৫০০ টাকা Performance reward দেয়া হবে। Performance নির্ধারণ করা হবে আপনার উপস্থিতি এবং সঠিক সময়ে সঠিকভাবে Assignment submit করার উপরে।",
      "তাছাড়া জব রেফারেন্স, সিভি এবং Linkedin Profile আপডেট সহ Interview তে ভালো করার জন্য সব ধরনের সহযোগিতা করা হবে।",
      "Course শেষ করার পর একটি Course Completion certificate provide করা হবে।",
      "পরবর্তী যেকোন ব্যাচ এ যেকোনো ক্লাস করতে পারবেন একদম ফ্রী তে!",
    ],
  },
];

export const teachers = [
  {
    name: "Salman Rahman",
    designation: "Founder & Instructor",
    image: "/images/Salman.png",
    description:
      "Sr. Software Engineer, Cefalo Bangladesh Ltd. \nSoftware test automation professional \n7+ years of experience in fintech and software industry.",
    facebook: "https://www.facebook.com/profile.php?id=100070104707980",
    linkedin: "https://www.linkedin.com/in/kmsalmanrahman/",
    whatsapp: "https://api.whatsapp.com/send?phone=8801686606909",
  },
  {
    name: "Pollab Ahmed",
    designation: "Instructor",
    image: "/images/pollab.jpg",
    description: "ISTQB certified SQA Engineer, having 2 years of experience in software industry.",
    facebook: "https://www.facebook.com/ahmedpollab",
    linkedin: "https://www.linkedin.com/in/pollab-ahmed/",
    whatsapp: "https://api.whatsapp.com/send?phone=8801948563837",
  },
  {
    name: "Asif Shahriar",
    designation: "Isstructor & Teaching Associate",
    image: "/images/Asif-2.jpg",
    description: "Ex Notredemian, BRAC Univ, SQA Engineer at DSI ",
    facebook: "https://www.facebook.com/asif.shahriar.79",
    linkedin: "https://www.linkedin.com/in/a-shahriar/",
    whatsapp: "https://api.whatsapp.com/send?phone=8801971819475",
  },
  {
    name: "Nibraz Khan",
    designation: "Instructor & Teaching Associate",
    image: "/images/Nibraz.jpeg",
    description: "BRAC Univ, SQA Engineer at DSI ",
    facebook: "https://www.facebook.com/farhanfuhad.nibraj",
    linkedin: "https://www.linkedin.com/in/nibraz-khan/",
    whatsapp: "https://api.whatsapp.com/send?phone=8801864778871",
  },
  {
    name: "Fardin Amin Arpon",
    designation: "Business Analyst & Support Associate",
    image: "/images/Arpon-3.jpeg",
    description: "Software Engineer [QA-Test], Freelancer at Fiverr, Level-1",
    facebook: "https://www.facebook.com/FardinAminArpon",
    linkedin: "https://www.linkedin.com/in/fardinarpon/",
    whatsapp: "https://api.whatsapp.com/send?phone=8801902179445",
  },
  {
    name: "Mahidul Hasan",
    designation: "Instructor",
    image: "/images/Mahidul.png",
    description:
      "DevOps professional, AVP and Team lead at Progoti Systems Ltd having 12+ years of experience in fintech industry and software firm.",
    facebook: "https://www.facebook.com/mahidul.hasan.56",
    linkedin: "https://www.linkedin.com/in/mahidul-hasan-95678137/",
    whatsapp: "https://api.whatsapp.com/send?phone=8801675009723",
  },
];

export const inputItems = [
  {
    item: "firstName",
    type: "text",
    label: "নামের প্রথম অংশ",
    placeholder: "First Name",
    required: true,
  },
  {
    item: "lastName",
    type: "text",
    label: "নামের শেষ অংশ",
    placeholder: "Last Name",
    required: true,
  },
  {
    item: "email",
    type: "email",
    label: "ইমেইল",
    placeholder: "Email",
    required: true,
  },
];

export const nextBatchSchedule = [
  {
    icon: MdCalendarToday,
    text: "এনরোলমেন্ট শুরু: জুন ১০, ২০২২ (শুক্রবার)",
  },
  {
    icon: MdMonitor,
    text: "ব্যাচের ওরিয়েন্টশন: জুন ২৮, ২০২২ (মঙ্গলবার)",
  },
  {
    icon: MdOutlineCalendarToday,
    text: "এনরোলমেন্ট শেষ: জুন ২৪, ২০২২ (শুক্রবার)",
  },
  {
    icon: BsBellFill,
    text: "ক্লাস শুরু: জুন ৩০, ২০২২ (বৃহস্পতিবার)",
  },
];

export const whatDoYouLearn = [
  "টেস্টিং কি, কেন, কত প্রকার ও কি কি, কিভাবে করতে হয়, তারপর টেস্টিং স্ট্র্যাটেজী, বাগ বের করার কৌশল, টেস্ট প্লান, টেস্টিং মেথডস, বাগ রিপোর্ট করা এবং অনেক ধরনের টেস্টিং যেমন Smoke testing, regression testing, gorilla testing, performance testing ইত্যাদি হাতে কলমে শিখতে পারবেন",
  "পারফরমেন্স টেস্টিং কি, জেমিটার দিয়ে কিভাবে লোড ও স্ট্রেস টেস্টিং করতে হয়, জেমিটার দিয়ে ডাটাবেস টেস্টিং, ডিস্ট্রিবিউটেড লোড টেস্টিং,  জেমিটার এর বিভিন্ন কন্ট্রোলার এবং জেমিটারে স্ক্রিপ্ট লিখার প্রসেস শিখতে পারবেন",
  "API কি, কিভাবে টেস্ট করতে হয়, API এর বিভিন্ন মেথড, API চেইনিং, API Gateway, API endpoint, route, Postman এর মাধ্যমে কিভাবে কালেকশন তৈরি করে API টেস্ট করতে হয়, API কল করে রেসপন্স বডি থেকে ডাটা রিড করা, Postman এ স্ক্রিপ্ট লিখে Assertion করা, Microservice Architecture এর ধারনা ইত্যাদি সব শিখতে পারবেন ",
  "Newman tool ব্যাবহার করে Automated API রিপোর্ট কিভাবে জেনারেট করবেন থাকবে সেটারও বিস্তারিত",
  "MySQL ডাটাবেস এর DML সংক্রান্ত সমস্ত কুয়েরি যা দিয়ে অনায়াসে যেকোন জটিল ডাটাবেস থেকে ডাটা কুয়েরি করতে পারবেন",
  "Java SE এর সমস্ত বেসিক যেমন Conditional Logic, Loop, Array,  String, Function, JSON, File management এবং OOP খুব ভালোভাবে শিখানো হবে যাতে Automation করতে কোন রকম অসুবিধার সম্মুখীন না হতে হয় ",
  "Selenium ইন্সটলেশন থেকে শুরু করে যেকোন একটা ওয়েবসাইট অথবা ওয়েব অ্যাপ্লিকেশান কিভাবে অটোমেট করে টেস্ট কেস কভার করবেন সেটা Junit, TestNG, Cucumber এগুলো দিয়ে রিয়েল লাইফ প্রোজেক্ট করে শিখানো হবে",
  "Rest Assured এবং Axios এর মাধ্যমে API automation কিভাবে করবেন তার বিস্তারিত ",
  "Appium configuration করে রিয়েল ডিভাইসে অথবা ইমুলাটোরে কিভাবে মোবাইল অ্যাপ অটোমেশন করবেন তা দুইটি প্রজেক্ট করে শিখানো হবে।",
  "এছাড়াও NodeJS এর বেসিক সহ Cypress দিয়ে ওয়েব অ্যাপ এবং API অটোমেশন শিখতে পারবেন",
];

export const courseContent = [
  "Module 1: Manual Testing part 1",
  "Module 1: Manual Testing part 2",
  "Module 1: Manual Testing Advanced",
  "Module 1: Introduction to ISTQB syllabus",
  "Module 2: API testing using Postman part 1",
  "Module 2: API testing with postman and report generate with newman part 2",
  "Module 3: Performance testing with JMeter part 1",
  "Module 3: Performance testing with JMeter part 2",
  "Module 4: MySQL Database",
  "Module 5: Java Basic part 1",
  "Module 5: Java Basic part 2",
  "Module 5: Java Basic part 3",
  "Module 5: Java Basic part 4",
  "Module 5: Java Basic part 5",
  "Module 5: Java OOP part 6",
  "Module 6: Selenium with JUnit part 1",
  "Module 6: Selenium with JUnit part 2",
  "Module 6: Selenium with JUnit part 3",
  "Module 6: Selenium with JUnit part 4",
  "Module 7: Selenium with TestNG part 1",
  "Module 7: Selenium with TestNG part 2",
  "Module 7: Selenium with TestNG part 3",
  "Module 8: API automation with Rest Assured",
  "Module Diamond",
  "Module 9: Mobile app automation with appium part 1",
  "Module 9: Mobile app automation with appium part 2",
  "Module 10: BDD and TDD test automation with Cucumber",
  "Module 11: Basic JavaScript with NodeJS part 1",
  "Module 11: Basic JavaScript with NodeJS part 2",
  "Module 11: Basic JavaScript with NodeJS part 3",
  "Module 11: Basic JavaScript with NodeJS part 4",
  "Module 11: JavaScript OOP part 5",
  "Module 12: API testing using Axios",
  "Module 13: Web automation using cypress part 1",
  "Module 13: Web automation using cypress part 2",
  "Module 14: CICD with Jenkins and Github",
  "Module 15: Basic security testing",
];

export const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thurstday", "Friday"];
export const urlRegx =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
