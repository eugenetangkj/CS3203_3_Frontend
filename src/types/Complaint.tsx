import { Category } from "./Category"
import { Source } from "./Source"

export interface Complaint {
    id: string,
    title: string,
    description: string,
    postedOn: string,
    category: Category,
    source: Source,
    sentiment: number,
    url: string
}