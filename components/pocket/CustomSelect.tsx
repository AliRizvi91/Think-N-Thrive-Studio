"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GrInstallOption } from "react-icons/gr";

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string; // Controlled value
}

export default function CustomSelect({
  options,
  placeholder = "Select an option",
  onChange,
  value, // controlled
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value) || null;

  const handleSelect = (option: Option) => {
    onChange?.(option.value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#63ccff] px-4 py-3 rounded flex justify-between items-center cursor-pointer"
      >
        <span>{selected ? selected.label : placeholder}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          <GrInstallOption className="text-white" />
        </motion.span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full bg-[#63ccff] mt-1 rounded shadow-lg z-50"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-white/30 cursor-pointer"
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
