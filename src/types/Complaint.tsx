export interface Complaint {
    oid: string,
    id: string,
    title: string,
    description: string,
    date: string,
    category: string,
    source: string,
    sentiment: number,
    url: string
}

export interface ComplaintStatistics {
    count: number,
    avg_sentiment: number
}

export interface MonthlyComplaintStatistics {
    date: string,
    data: ComplaintStatistics 
}

export interface ComplaintStatisticsByDate {
    date: string;
    data: Record<string, ComplaintStatistics>;
}