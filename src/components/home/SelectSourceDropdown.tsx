"use client";

import { useState, useRef, useEffect } from "react";
import { sources } from "@/constants/searchFields";

/**
This component represents the dropdown in main page that allows users to select the source of the posts they want to see. 
*/
export default function SelectSourceDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(sources);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle dropdown
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Handle checkbox selection
    const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prev) =>
        prev.includes(option)
        ? prev.filter((item) => item !== option) // Remove if already selected
        : [...prev, option] // Add if not selected

        //TODO: Logic change here
    );
    };

    // Close dropdown when clicking outside
    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    
    return (
        <div className="relative w-fit" ref={dropdownRef}>
        {/* Dropdown Button */}
        <button
            onClick={toggleDropdown}
            className="w-full flex justify-between items-center bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full px-4 py-0.5 text-white shadow-sm"
        >
            Source
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 ml-2"
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
            <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <ul className="py-1">
                {sources.map((source) => (
                <li key={source} className="px-4 py-2 text-sm text-yap-gray-900 hover:bg-gray-100 flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    id={source}
                    checked={selectedOptions.includes(source)}
                    onChange={() => handleCheckboxChange(source)}
                    className="mr-2 rounded-md ring-1 ring-yap-brown-900 checked:ring-yap-brown-900 checked:bg-yap-brown-900 cursor-pointer"
                    />
                    <label htmlFor={source}>{source}</label>
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
}
