"use client";

import { checkIfArraysAreEqual } from "@/utils/HelperFunctions";
import { useState, useRef } from "react";

/**
This component represents a multiselect dropdown.
*/
interface MultiSelectDropdownProps {
    label: string,
    options: string[],
    selectedOptions: string[]
    stateChangeFunction: (selectedValues: string[]) => void,
    setSelectedComplaints: React.Dispatch<React.SetStateAction<number[]>>,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,

}



export default function MultiSelectDropdown({ label, options, selectedOptions, stateChangeFunction, setSelectedComplaints, setCurrentPage} : MultiSelectDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptionsLocal, setSelectedOptions] = useState<string[]>(selectedOptions);
    const [previousSelectedOptions] = useState<string[]>(selectedOptions);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const allOptions = options

    // Toggle dropdown
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Handle checkbox selection
    const handleCheckboxChange = (option: string) => {
        // Function that adds the option if it is missing, else removes it
        const filterOptions = (prev: string[]) => {
            return prev.includes(option)
                ? prev.filter((item) => item !== option) // Remove if already selected
                : [...prev, option]; // Add if not selected
        };
    
        // Get the new selected options
        const newSelectedOptions = filterOptions(selectedOptions);
    
        // Update local state
        setSelectedOptions(newSelectedOptions);
    
        //Update global state
        stateChangeFunction(newSelectedOptions);
    };


    return (
        <div className="relative w-fit" ref={dropdownRef}>
        {/* Dropdown Button */}
        <button
            onClick={ () => {
                toggleDropdown()
                if (isOpen) {
                    if (checkIfArraysAreEqual(previousSelectedOptions, selectedOptionsLocal)) {
                        //No changes compared to previous selection
                    } else {
                        //Got changes compared to previous selection
                        setSelectedComplaints([])
                        setCurrentPage(1)
                    }
                }
            }}
            className="w-full flex justify-between items-center bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full px-4 py-0.5 text-white shadow-sm"
        >
            { label }
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
            <div className="absolute left-0 mt-2 w-36 border border-gray-300 bg-white rounded-md shadow-lg z-10 multiselectdropdown">
            <ul className="py-1">
                {allOptions.map((currentOption) => (
                <li key={currentOption} className="px-4 py-2 text-sm text-yap-gray-900 hover:bg-gray-100 flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    id={currentOption}
                    checked={selectedOptionsLocal.includes(currentOption)}
                    onChange={() => handleCheckboxChange(currentOption)}
                    className="mr-2 rounded-md ring-1 ring-yap-brown-900 checked:ring-yap-brown-900 checked:bg-yap-brown-900 cursor-pointer"
                    />
                    <label htmlFor={currentOption}>{currentOption}</label>
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
}
