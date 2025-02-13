"use client";

import { Complaint } from "@/types/Complaint";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { CategoryDropdown } from "./CategoryDropdown";
import { Category } from "@/types/Category";
import { doesComplaintExistInList } from "@/utils/HelperFunctions";


/**
This component represents the table used to display all complaints.
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
            : prev.filter((c) => c.id !== complaintChecked.id) // Remove the complaint object
        );
    };
    

    return (
        <Table>
            <TableHeader>
            <TableRow className='hover:bg-transparent font-bold text-yap-brown-900'>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/12"></TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/4">Title</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/4">Description</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/6">Posted</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/6">Category</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/6">Source</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/6">Sentiment</TableHead>
            </TableRow>
            </TableHeader>

            <TableBody>
                {complaints.map((complaint: Complaint) => (
                    <TableRow key={complaint.id}>

                        {/* Select */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            {/* Checkbox */}
                            <Checkbox id={`checkbox${complaint.id}`} onCheckedChange={(checked: boolean) => handleCheckboxToggle(checked, complaint)} checked={ doesComplaintExistInList(selectedComplaints, complaint) } />
                        </TableCell>

                        {/* Title */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            <a href={ complaint.url }>
                                <p className='line-clamp-1 underline'>{ complaint.title }</p>
                            </a>
                            
                        </TableCell>

                        {/* Description */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            <p className='line-clamp-1'>{ complaint.description }</p>
                        </TableCell>

                        {/* Posted On */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            <p className='line-clamp-1'>{ complaint.postedOn }</p>
                        </TableCell>

                        {/* Category */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            <CategoryDropdown complaintId={ complaint.id } initialCategory={ complaint.category } allCategories={ allCategories } />
                        </TableCell>

             

                        {/* Source */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            <p className='line-clamp-1'>{ complaint.source.name }</p>
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