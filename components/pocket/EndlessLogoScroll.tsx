"use client";

import { motion } from "framer-motion";
import { FaUniversity, FaGraduationCap } from "react-icons/fa";
import { GiPc, GiSkills } from "react-icons/gi";
import { SiSkillshare, SiGrammarly } from "react-icons/si";
import { HiMicrophone } from "react-icons/hi2";
import { SlBookOpen } from "react-icons/sl";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { HiMiniDocumentMagnifyingGlass } from "react-icons/hi2";
import { GiFeather } from "react-icons/gi";
import { IoJournalSharp } from "react-icons/io5";

export const educationLogos = [
FaUniversity,
FaGraduationCap,
GiPc,
GiSkills,
SiSkillshare,
SiGrammarly,
HiMicrophone,
SlBookOpen,
AiFillSafetyCertificate,
GiNotebook,
HiMiniDocumentMagnifyingGlass,
GiFeather,
IoJournalSharp
];


// Component now accepts icons via props
export default function EndlessLogoScroll({ logos = educationLogos}) {
// Duplicate for smooth infinite scroll
const fullList = [...logos, ...logos];

  return (
    <div className="w-full overflow-hidden py-6 ">
      <motion.div
        className="flex md:gap-28 gap-18"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {fullList.map((Icon, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-24 h-24 flex items-center justify-center text-black text-5xl"
          >
            <Icon />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
