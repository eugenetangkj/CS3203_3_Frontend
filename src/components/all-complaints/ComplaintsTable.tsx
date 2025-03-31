"use client";

import { Complaint } from "@/types/Complaint";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { CategoryDropdown } from "./actions/CategoryDropdown";
import { Category } from "@/types/Category";
import { capitaliseFirstLetter, doesComplaintExistInList, findCategoryObjectFromListGivenName } from "@/utils/HelperFunctions";
import { MoveUp, MoveDown } from "lucide-react";


/**
This component represents the table used to display all complaints used in the all complaints page
*/
interface ComplaintsTableProps {
    readonly complaints: Complaint[],
    readonly selectedComplaints: Complaint[],
    readonly setSelectedComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>,
    readonly allCategories: Category[],
    readonly dateSort: number,
    readonly setDateSort: React.Dispatch<React.SetStateAction<number>>,
    readonly sentimentSort: number,
    readonly setSentimentSort: React.Dispatch<React.SetStateAction<number>>,

}

export default function ComplaintsTable({ complaints, selectedComplaints, setSelectedComplaints, allCategories, dateSort, setDateSort, sentimentSort, setSentimentSort, }: ComplaintsTableProps) {

    //Updates the state in parent component that a specific complaint has been selected or not
    const handleCheckboxToggle = (checked: boolean, complaintChecked: Complaint) => {
        setSelectedComplaints((prev: Complaint[]) =>
            checked
            ? [...prev, complaintChecked] // Add the complaint object 
            : prev.filter((c) => c.oid !== complaintChecked.oid) // Remove the complaint object
        );
    };
    

    return (
        <Table>
            <TableHeader>
            <TableRow className='hover:bg-transparent font-bold'>
                <TableHead className="table-header min-w-16 2xl:min-w-8"></TableHead>
                <TableHead className="table-header min-w-40">Title</TableHead>
                <TableHead className="table-header min-w-40 max-w-60">Description</TableHead>
                <TableHead className="table-header min-w-40">
                    <div className='flex flex-row justify-start items-center space-x-3'>
                        <p>Posted</p>
                        <div className='flex flex-row space-x-1 justify-center items-center'>
                            <MoveUp className={`h-4 w-4 cursor-pointer duration-200 ${ dateSort === 1 ? 'text-yap-brown-900 hover:text-yap-brown-800' : 'text-yap-gray-900 hover:text-yap-gray-800'}`}
                                onClick={ () => {
                                    setSelectedComplaints([])
                                    setDateSort((prev) => (prev === 1) ? 0 : 1)
                                }} 
                            />
                            <MoveDown className={`h-4 w-4 cursor-pointer duration-200 ${ dateSort === -1 ? 'text-yap-brown-900 hover:text-yap-brown-900' : 'text-yap-gray-900 hover:text-yap-gray-800'}`}
                                onClick={ () => {
                                    setSelectedComplaints([])
                                    setDateSort((prev) => (prev === -1) ? 0 : -1)
                                }}
                            />
                        </div>
                    </div>
                </TableHead>
                <TableHead className="table-header min-w-40">Category</TableHead>
                <TableHead className="table-header min-w-20">Source</TableHead>
                <TableHead className="table-header min-w-20">
                    <div className='flex flex-row justify-start items-center space-x-3'>
                        <p>Sentiment</p>
                        <div className='flex flex-row space-x-1 justify-center items-center'>
                            <MoveUp className={`h-4 w-4 cursor-pointer duration-200 ${ sentimentSort === 1 ? 'text-yap-brown-900 hover:text-yap-brown-800' : 'text-yap-gray-900 hover:text-yap-gray-800'}`}
                                onClick={ () => {
                                    setSelectedComplaints([])
                                    setSentimentSort((prev) => (prev === 1) ? 0 : 1)
                                }}
                            />
                            <MoveDown className={`h-4 w-4 cursor-pointer duration-200 ${ sentimentSort === -1 ? 'text-yap-brown-900 hover:text-yap-brown-900' : 'text-yap-gray-900 hover:text-yap-gray-800'}`}
                                onClick={ () => {
                                    setSelectedComplaints([])
                                    setSentimentSort((prev) => (prev === -1) ? 0 : -1)
                                }}
                            />
                        </div>
                    </div>
                </TableHead>
            </TableRow>
            </TableHeader>

            <TableBody>
                {complaints.map((complaint: Complaint) => (
                    <TableRow key={complaint.oid}>
                        {/* Select */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            {/* Checkbox */}
                            <Checkbox id={`checkbox${complaint.oid}`} onCheckedChange={(checked: boolean) => handleCheckboxToggle(checked, complaint)} checked={ doesComplaintExistInList(selectedComplaints, complaint) } />
                        </TableCell>

                        {/* Title */}
                        <TableCell className="text-base text-yap-black-800 pl-0 max-w-60">
                            <a href={ complaint.url } target='_blank'>
                                <p className='line-clamp-1 underline'>{ complaint.title }</p>
                            </a>
                        </TableCell>

                        {/* Description */}
                        <TableCell className="text-base text-yap-black-800 pl-0 max-w-40">
                            <p className='line-clamp-1'>{ complaint.description === '' ? '[No description]' : complaint.description }</p>
                        </TableCell>

                        {/* Posted On */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            <p className='line-clamp-1'>{ complaint.date }</p>
                        </TableCell>

                        {/* Category */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            <CategoryDropdown complaint={ complaint }  allCategories={ allCategories } initialCategory={ findCategoryObjectFromListGivenName(allCategories, complaint.category) } />
                        </TableCell>

                        {/* Source */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            <p className='line-clamp-1'>{ capitaliseFirstLetter(complaint.source) }</p>
                        </TableCell>

                        {/* Sentiment */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            <p className='line-clamp-1'>{ complaint.sentiment }</p>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>       
        </Table>
    )
}