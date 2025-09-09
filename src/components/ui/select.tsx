"use client"

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export const Select = ({ value, onChange, className, children }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<SelectItemProps> => 
      React.isValidElement(child)
  );
  
  const selectedOption = options.find(child => child.props.value === value);

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${className} flex items-center justify-between w-full text-left`}
      >
  <span className="text-[16px] font-poppins font-light">{selectedOption?.props.children || value}</span>
  <ChevronDown className={`w-8 h-8 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#191a1d] border border-[#404040] rounded-2xl overflow-hidden z-50 shadow-lg">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(option.props.value)}
              className="w-full text-left px-6 py-4 text-white hover:bg-[#2a2d35] transition-colors text-[16px] font-poppins font-light"
            >
              {option.props.children}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const SelectItem = ({ children, value, className }: { children: React.ReactNode; value: string; className?: string }) => (
  <div data-value={value} className={className}>
    {children}
  </div>
);

export const SelectValue = ({ children }: { children: React.ReactNode }) => <>{children};</>;
