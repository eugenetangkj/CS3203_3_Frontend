"use client"

import { useState, useRef, useEffect } from "react";
import { searchFields } from "@/constants/searchFields";

/**
This component represents the search bar used to search for a specific post in the home page. It has various search
capabilities where the user can decide what field to search for.
*/
export default function SearchBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(searchFields[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Handle option selection
  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside the input field
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  return (
    <div className="w-full max-w-lg xl:max-w-xl min-w-[200px]">
        <div className="relative mt-2">
            {/* Dropdown Button */}
            <div className="absolute top-1 left-1 flex items-center" ref={dropdownRef}>
                <button
                    onClick={toggleDropdown}
                    className="rounded border border-transparent py-1 px-1.5 text-center flex items-center transition-all text-yap-black-800"
                >
                    <span className="text-ellipsis overflow-hidden">{selectedOption}</span>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 ml-1"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>

                <div className="h-6 border-l border-yap-gray-100 ml-1"></div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute left-0 mt-10 min-w-[150px] bg-white border border-slate-200 rounded-md shadow-lg z-10">
                        <ul className="py-1">
                            {searchFields.map((option) => (
                            <li
                                key={option}
                                onClick={() => handleSelect(option)}
                                className="px-4 py-2 text-sm text-yap-gray-900 hover:bg-gray-100 cursor-pointer"
                            >
                                {option}
                            </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Search Input */}
            <input
            type="text"
            className="w-full bg-transparent placeholder:text-yap-gray-900 text-yap-black-800 border border-yap-gray-200 rounded-full pl-28 pr-14 py-2 transition duration-200 focus:border-yap-brown-900 focus:ring-1 focus:ring-yap-brown-100 shadow-sm focus:shadow"
            placeholder="Search for post..."
            />

            {/* Search Button */}
            <button
            className="absolute top-1 right-1 flex items-center rounded-full bg-yap-brown-900 py-1 px-1 mr-1 border border-transparent text-center text-sm text-white transition-all hover:bg-yap-brown-800 duration-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6">
                <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
                />
            </svg>
            </button>
      </div>
    </div>
  );
}
