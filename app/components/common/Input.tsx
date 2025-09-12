"use client";

import { useState } from "react";
import Image from "next/image";

interface InputProps {
  label?: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  className?: string;
  onClick?: () => void;
  icon?: string;
}

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  className = "",
  onClick,
  icon,
}: InputProps) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleClear = () => {
    if (value === undefined) {
      setInternalValue("");
    }
    onChange?.("");
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-white text-sm font-polysans">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Image
              className="w-4 h-4"
              src={icon}
              alt="Input icon"
              width={18}
              height={18}
            />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={currentValue}
          onClick={onClick}
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full py-3 pr-12 rounded-lg bg-[#0B78FD1A] border border-white/[0.04] text-white placeholder-gray-400 font-polysans focus:outline-none focus:ring-2 focus:ring-[#0B78FD]/20 transition-all duration-200 ${
            icon ? "pl-10 px-4" : "px-4"
          }`}
        />
        {currentValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-80 transition-opacity duration-200"
            type="button"
          >
            <Image
              className="w-4 h-4 cursor-pointer"
              src="/assets/icons/clear.svg"
              alt="Clear input"
              width={21}
              height={21}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
