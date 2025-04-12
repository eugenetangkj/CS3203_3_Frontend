import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { capitaliseFirstLetter } from "@/utils/HelperFunctions";
  

/**
This component represents a classic table that is used for visualisation. Useful for displaying complaints.
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
                    <TableHead className={`table-header ${header === "Title" || header === "Description" || header === "Posted" ? "min-w-40 max-w-60" : "min-w-20"}`}
                        key={header}>{header}</TableHead>
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
                            : (header == "Source")
                            ? <p>{capitaliseFirstLetter(row[header.toLowerCase()] as string)}</p>
                            : (header == "Sentiment")
                            ? <p>{(row[header.toLowerCase()] as number).toFixed(3)}</p>
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
