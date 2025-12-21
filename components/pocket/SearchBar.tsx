"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleChange = (text: string) => {
    setValue(text);
    onSearch(text); // 🔥 live search
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Search courses..."
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-12 pr-4 py-6 rounded-full  bg-[#0c0c0cc9] text-white border-none outline-none focus:border-none focus:outline-none"
      />

      <button
        type="button"
        onClick={() => onSearch(value)}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
      >
        <FiSearch size={20} />
      </button>
    </div>
  );
}
