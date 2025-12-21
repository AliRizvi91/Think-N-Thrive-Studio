"use client"
import Image from "next/image";
import React from "react";
import Container from "../pocket/Container";
import { useMediaQuery } from 'react-responsive';
import MainButton from "../pocket/MainButton";
import EndlessLogoScroll from "@/components/pocket/EndlessLogoScroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";


function HeroSection() {
  const [mounted, setMounted] = React.useState(false);
  const isSm = useMediaQuery({ query: '(max-width: 650px)' });
  const ContainerPosition = useMediaQuery({ query: '(max-width: 1024px)' });
  const router = useRouter()

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll Animation
  const { scrollYProgress } = useScroll();

  const imgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 0.2], [0, -160]);

  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.3], [0, -160]);

  const btnOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);
  const btnY = useTransform(scrollYProgress, [0.2, 0.4], [0, -160]);

  const handleToMoveAdmissionPage = ()=>{
    router.push('/admission')
  }
  const handleToMoveAuthenticatePage = ()=>{
    router.push('/authenticate')
  }

  return (
    <>
      <div className={`w-full h-[230vh] ${mounted && ContainerPosition ? 'relative' : 'absolute inset-0'} bg-white z-10`}>
        {/* Blurs */}
        <div className="absolute inset-0 top-0 w-full h-full">
          <div className=" sticky top-0 w-full h-screen flex justify-between items-center">
            <div className="bg-[#34F8FF] md:w-60 md:h-60 w-30 h-30 rounded-full relative -top-30 md:blur-[120px] blur-[70px]"></div>
            <div className="bg-[#F32FF6] md:w-60 md:h-60 w-30 h-30 rounded-full relative top-30 md:blur-[140px] blur-[90px]"></div>
          </div>
        </div>
        <div className="w-full h-fit sticky top-0">

          <Container maxWidth="md" className="h-screen flex flex-col justify-center gap-5 items-center relative top-[5vh]" >

            {/* 🔵 Image Animation */}
            <motion.div
              style={{ opacity: imgOpacity, y: imgY }}
              className="relative mx-auto lg:w-full w-[70%] sm:h-[50%] h-[40%] select-none"
            >
              {mounted && (
                <Image
                  src={isSm ? `/assets/images/Hero2.png` : `/assets/images/Hero1.png`}
                  alt="Hero"
                  fill
                  className="relative object-contain w-full"
                />
              )}
            </motion.div>

            {/* 🔵 Paragraph Animation */}
            <motion.p
              style={{ opacity: textOpacity, y: textY }}
              className="md:text-[17px] sm:text-[16px] text-[15px] w-[70%] text-center"
            >
              Welcome! At our institute, teamwork lights the path to success.
              We learn together, grow together, and help every student shine.
              Let’s begin your journey toward a stronger future.
            </motion.p>

            {/* 🔵 Buttons Animation */}
            <motion.div
              style={{ opacity: btnOpacity, y: btnY }}
              className="flex justify-center items-center gap-2"
            >
              <MainButton onClick={handleToMoveAuthenticatePage}>
                Get Started
              </MainButton>
              <MainButton bgColor="transparent" onClick={handleToMoveAdmissionPage}>
                Admission
              </MainButton>
            </motion.div>

          </Container>


          <Container maxWidth="Exl" className="flex flex-row justify-center items-center" >
            <EndlessLogoScroll />
          </Container>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
