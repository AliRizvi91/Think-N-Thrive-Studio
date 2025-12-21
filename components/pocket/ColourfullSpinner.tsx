import React from "react";
import { motion } from "framer-motion";

type Props = {
  size?: number; // overall size in px
  thickness?: number; // stroke thickness in px
  duration?: number; // seconds per rotation
};

export default function ColorfulSpinner({
  size = 50,
  thickness = 7,
  duration = 0.65,
}: Props) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const visible = circumference * 0.75; // 75% visible
  const gap = circumference - visible; // remaining gap

  return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
        style={{ width: size, height: size }}
        className="relative"
      >
        <svg width={size} height={size} className="absolute inset-0">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation={8} result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="rainbow" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#ff2d95" />   {/* pink */}
              <stop offset="25%" stopColor="#8a2be2" />  {/* purple */}
              <stop offset="50%" stopColor="#ffd400" />  {/* yellow */}
              <stop offset="70%" stopColor="#ff3b3b" />  {/* red */}
              <stop offset="100%" stopColor="#00c2ff" /> {/* skyblue */}
            </linearGradient>
          </defs>

          {/* black backing circle */}
          <circle cx={size / 6} cy={size / 6} r={radius} fill="#00000" />

          {/* colorful arc (main) */}
          <g>
            {/* blurred glow */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#rainbow)"
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${visible} ${gap}`}
              strokeDashoffset={gap / 2}
              style={{ filter: 'url(#glow)', opacity: 0.1 }}
            />

            {/* crisp top stroke */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#rainbow)"
              strokeWidth={thickness}
              strokeLinecap="round"
              strokeDasharray={`${visible} ${gap}`}
              strokeDashoffset={gap / 2}
            />
          </g>
        </svg>
      </motion.div>
  );
}
