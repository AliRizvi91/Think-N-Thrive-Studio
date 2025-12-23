'use client'

import React from "react";
import { useMediaQuery } from 'react-responsive';
import HeroSection from "@/components/homePage/HeroSection";
import Homepart1 from "@/components/homePage/Homepart1";
import ReviewHome from "@/components/homePage/ReviewHome";
import Image from "next/image";
import { motion } from "framer-motion";


export default function Home() {
  const [mounted, setMounted] = React.useState(false);
  const isSm = useMediaQuery({ query: '(max-width: 650px)' });
  const ContainerPosition = useMediaQuery({ query: '(max-width: 1024px)' });

  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <HeroSection />
      <div className={`relative w-full ${mounted && ContainerPosition ? 'h-full' : 'h-[360vh]'}`}>
        <div className={`top-0 w-full  ${mounted && ContainerPosition ? 'relative' : 'fixed'}`}>
          <Homepart1 />
        </div>
      </div>
      <ReviewHome />


      {/* <motion.button
        onClick={() =>
          window.open("https://wa.me/923045959225", "_blank")
        }
        whileTap={{
          scale: 0.02,
        }}
        className="fixed bottom-14 right-10 mx-auto w-20 h-20 cursor-pointer z-500">
        <Image
          src={`/assets/images/Whatsup.png`}
          alt="Whatsup"
          fill
          className="relative object-contain w-full"
        />
      </motion.button> */}
    </>
  );
}
