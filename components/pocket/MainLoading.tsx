"use client";

import React, { useEffect, useState } from "react";
import ColorfullSpinner from "./ColourfullSpinner";
import { motion } from "framer-motion";

export default function MainLoading() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);

  return (
    <motion.div
      initial={{ y: "100%", borderBottomLeftRadius: 0, borderBottomRightRadius: 0 ,opacity: 0, }}
      animate={{
        y: "0%",
        opacity: 1,
        borderBottomLeftRadius: fontsReady ? 100 : 0,
        borderBottomRightRadius: fontsReady ? 100 : 0,
        transition: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }
      }}
      exit={{
        opacity: 0,
        y: "-100%",
        transition: { duration: 0.8 }
      }}
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
    >
      <div
        className={`transition-opacity duration-700 ${
          fontsReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <ColorfullSpinner />
      </div>
    </motion.div>
  );
}
