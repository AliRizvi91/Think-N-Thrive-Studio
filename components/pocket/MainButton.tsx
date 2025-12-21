import React from "react";
import { motion } from "framer-motion";

interface MainButtonProps {
  className?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: React.ReactNode;
}

function MainButton({
  className = "",
  bgColor = "#000",
  textColor = "#fff",
  borderColor = "#000",
  onClick,
  disabled = false,
  children,
}: MainButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      initial={{
        backgroundColor: bgColor,
        color: bgColor === "transparent" ? "#000" : textColor,
        transition: { duration: 0.1, ease: "easeIn" },
      }}
      whileHover={!disabled ? {
        backgroundColor: "#313030",
        color: "#fff",
        scale: 1.05,
        transition: { duration: 0.2, ease: "easeOut" },
        borderColor: "#313030",
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`px-6 py-2 rounded-full font-medium cursor-pointer border-2 transition-all duration-300
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}`}
      style={{ borderColor }}
    >
      {children}
    </motion.button>
  );
}

export default MainButton;
