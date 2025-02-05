"use client"; // Required for Next.js 13+ client components

import { useState, useRef, useEffect } from "react";
import { orderByFilters } from "@/constants/searchFields";


/**
This component represents the dropdown which allows users to select how they want to order and sort the posts.
*/
export default function OrderByFilter() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(orderByFilters[0]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Handle option selection
    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        console.log("Sorting by:", option); // TODO: Replace with actual sorting logic
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
            className="w-full flex justify-between items-center bg-yap-brown-900 rounded-full px-4 py-1 text-white shadow-sm hover:bg-yap-brown-800 duration-200"
        >
            Sort by: {selectedOption}
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
                {orderByFilters.map((option) => (
                <li
                    key={option}
                    onClick={() => handleSelect(option)}
                    className="px-4 py-2 text-yap-gray-900 hover:bg-gray-100 text-sm cursor-pointer"
                >
                    {option}
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
}
