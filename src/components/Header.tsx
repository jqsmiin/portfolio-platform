"use client";

import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import marketing from "@/images/marketing.png";
import Image from "next/legacy/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Header = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="container mx-auto px-6 mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="mt-[40px] relative">
          <img
            src="https://preview.colorlib.com/theme/ecobit/img/animate_icon/Ellipse_4.png.webp"
            alt="animate icon"
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="absolute animate-bounce animate-duration-1000"
          />
          <h3
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="border-2 border-solid border-primaryColor bg-white rounded-full w-fit text-sm font-medium px-5 py-2"
          >
            Welcome to my portfolio
          </h3>
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="mt-10 font-bold text-4xl md:text-5xl md:leading-[1.5]"
          >
            I Craft <span className="text-secondaryColor">Engaging</span> User
            <span className="text-secondaryColor flex items-baseline gap-2">
              {" "}
              Experiences{" "}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="mt-6 text-lg max-w-[600px] md:leading-8"
          >
            I'm a frontend developer with a passion for turning creative designs
            into interactive web experiences. My journey is all about the fusion
            of design and code, where I meticulously craft user interfaces that
            captivate and engage.
          </p>
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="flex gap-4 mt-12"
          >
            <Link
              className="px-5 py-2 rounded-[23px] hover:text-white bg-white duration-300 border-2 border-solid border-primaryColor hover:bg-primaryColor"
              href="https://www.upwork.com/freelancers/~01ba206336c9c09675"
            >
              Contact Me
            </Link>
            <Link
              className="flex gap-2 px-4 py-2 justify-center items-center font-medium"
              href="/projects"
            >
              View Projects{" "}
              <span className="text-secondaryColor">
                {" "}
                <BsArrowUpRight />{" "}
              </span>
            </Link>
          </div>
          <motion.div
            className="absolute bottom-0 right-40"
            animate={{
              x: [0, -30, -30, 0, 50, 50, 0],
              y: [0, 40, 40, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
            }}
          >
            <img
              src="https://preview.colorlib.com/theme/ecobit/img/animate_icon/Ellipse_8.png.webp"
              alt="animate icon"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
            />
          </motion.div>
        </div>
        <div
          className="lg:flex flex-col justify-center items-center hidden relative"
          data-aos="fade-right"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          <img
            src="https://preview.colorlib.com/theme/ecobit/img/animate_icon/Ellipse_1.png.webp"
            alt="animate icon"
            className="absolute animate-bounce animate-duration-1000"
          />
          <div className="w-full h-full pt-12">
            <Image
              src={marketing}
              layout="responsive"
              priority
              alt="marketing"
            />
          </div>
          <motion.div
            className="absolute top-0"
            animate={{
              x: [0, 70, 70, 0, -50, -50, 0],
              y: [0, 60, 60, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "linear",
            }}
          >
            <img
              src="https://preview.colorlib.com/theme/ecobit/img/animate_icon/Ellipse_2.png.webp"
              alt="animate icon"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Header;
