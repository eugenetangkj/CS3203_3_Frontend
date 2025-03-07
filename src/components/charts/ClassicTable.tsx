import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
  

/**
This component represents a classic table that is used for visualisation.
*/
interface ClassicTableProps {
    headers: string[];
    data: { [key: string]: string | number }[];
}


export function ClassicTable({ headers, data }: ClassicTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow className='hover:bg-transparent font-bold'>
                {headers.map((header) => (
                    <TableHead className='text-yap-brown-900 font-bold text-lg pl-0' key={header}>{header}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
        <TableBody>
            {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                    {headers.map((header, colIndex) => (
                        <TableCell key={colIndex} className='text-yap-black-800 text-base pl-0'>{
                            (header === "Title")
                            ? <a href={row['url'] as string} className='underline line-clamp-2' target='_blank'>{row[header.toLowerCase()]}</a>
                            : (header == "Description")
                            ? <p className='line-clamp-2'>{row[header.toLowerCase()] === '' ? '[No description]' : row[header.toLowerCase()] }</p>
                            : <p>{row[header.toLowerCase()]}</p>
                        } 
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}
