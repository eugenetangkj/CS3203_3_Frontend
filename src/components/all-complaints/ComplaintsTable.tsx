"use client";

import { Complaint } from "@/types/Complaint";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"


/**
This component represents the table used to display all complaints.
*/
interface ComplaintsTableProps {
    complaints: Complaint[],
    selectedComplaints: number[],
    setSelectedComplaints: React.Dispatch<React.SetStateAction<number[]>>,
}

export default function ComplaintsTable({ complaints, selectedComplaints, setSelectedComplaints }: ComplaintsTableProps) {

    //Updates the state in parent component that a specific complaint has been selected or not
    const handleCheckboxToggle = (checked: boolean, id: number) => {
        setSelectedComplaints((prev: number[]) => 
            checked
            ? [...prev, id]  // Add ID if checked
            : prev.filter((complaintId: number) => complaintId !== id) // Remove ID if unchecked
        );
    };








    return (
        <Table>
            <TableHeader>
            <TableRow className='hover:bg-transparent font-bold text-yap-brown-900'>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/12"></TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/4">Title</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/3">Description</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/6">Posted On</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/6">Category</TableHead>
                <TableHead className="text-yap-brown-900 font-bold text-lg pl-0 w-1/6">Source</TableHead>
            </TableRow>
            </TableHeader>

            <TableBody>
                {complaints.map((complaint: any) => (
                    <TableRow key={complaint.id}>

                        {/* Select */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            {/* Checkbox */}
                            <Checkbox id={`checkbox${complaint.id}`} onCheckedChange={(checked: boolean) => handleCheckboxToggle(checked, complaint.id)} checked={ selectedComplaints.includes(complaint.id)}  />
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
                            <p className='line-clamp-1'>{ complaint.category }</p>
                        </TableCell>

                        {/* Source */}
                        <TableCell className="text-base text-yap-black-800 pl-0">
                            <p className='line-clamp-1'>{ complaint.source }</p>
                        </TableCell>

                    </TableRow>
                ))}
            </TableBody>       
        </Table>
    )
}