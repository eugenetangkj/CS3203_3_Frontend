"use client";

import { doesCategoryExistInList } from "@/utils/HelperFunctions";
import { useState, useRef } from "react";
import { Complaint } from "@/types/Complaint";
import { Category } from "@/types/Category";
import { areCategoryListsEqual } from "@/utils/HelperFunctions";

/**
This component represents a multiselect filter dropdown for category
*/
interface CategoryFilterDropdown {
    categoryOptions: Category[],
    selectedCategories: Category[]
    stateChangeFunction: (selectedValues: Category[]) => void,
    setSelectedComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    fetchComplaints: () => void
}


export default function CategoryFilterDropdown({ 
    categoryOptions,
    selectedCategories,
    stateChangeFunction,
    setSelectedComplaints,
    currentPage,
    setCurrentPage,
    fetchComplaints} : CategoryFilterDropdown) {

        //States
        const [isOpen, setIsOpen] = useState(false);
        const [selectedCategoriesLocal, setSelectedCategoriesLocal] = useState<Category[]>(selectedCategories);
        const [previousSelectedCategories] = useState<Category[]>(selectedCategories);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const allOptions = categoryOptions


        // Toggle dropdown
        const toggleDropdown = () => setIsOpen(!isOpen);

        // Handle checkbox selection
        const handleCheckboxChange = (option: Category) => {
            // Function that adds the option if it is missing, else removes it
            const filterCategories = (prev: Category[]) => {

                return prev.some((c) => c.id === option.id)
                    ? prev.filter((c) => c.id !== option.id) // Remove if already selected
                    : [...prev, option]; // Add if not selected
            };


            // Get the new selected options
            const newSelectedOptions = filterCategories(selectedCategories);
        
            // Update local state
            setSelectedCategoriesLocal(newSelectedOptions);
        
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
                    if (areCategoryListsEqual(previousSelectedCategories, selectedCategoriesLocal)) {
                        //No changes compared to previous selection
                    } else {
                        //Got changes compared to previous selection
                        setSelectedComplaints([])
                        if (currentPage == 1) {
                            fetchComplaints()
                        } else {
                            setCurrentPage(1)
                        }
                    }
                }
            }}
            className="w-full flex justify-between items-center bg-yap-brown-900 hover:bg-yap-brown-800 duration-200 rounded-full px-4 py-0.5 text-white shadow-sm"
        >
            Category
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
                <li key={currentOption.id} className="px-4 py-2 text-sm text-yap-gray-900 hover:bg-gray-100 flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    id={ currentOption.id }
                    checked={doesCategoryExistInList(selectedCategoriesLocal, currentOption)}
                    onChange={() => handleCheckboxChange(currentOption)}
                    className="mr-2 rounded-md ring-1 ring-yap-brown-900 checked:ring-yap-brown-900 checked:bg-yap-brown-900 cursor-pointer"
                    />
                    <label htmlFor={currentOption.name}>{currentOption.name}</label>
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
}
