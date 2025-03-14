"use client";

import { Complaint } from "@/types/Complaint";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { CategoryDropdown } from "./CategoryDropdown";
import { Category } from "@/types/Category";
import { doesComplaintExistInList, findCategoryObjectFromListGivenName } from "@/utils/HelperFunctions";


/**
This component represents the table used to display all complaints used in the all complaints page
*/
interface ComplaintsTableProps {
    complaints: Complaint[],
    selectedComplaints: Complaint[],
    setSelectedComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>,
    allCategories: Category[]
}

export default function ComplaintsTable({ complaints, selectedComplaints, setSelectedComplaints, allCategories }: ComplaintsTableProps) {

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
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 min-w-16"></TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 min-w-40">Title</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 min-w-40 max-w-60">Description</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 min-w-40">Posted</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 min-w-40">Category</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 min-w-20">Source</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 min-w-20">Sentiment</TableHead>
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
                            <p className='line-clamp-1'>{ complaint.source }</p>
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