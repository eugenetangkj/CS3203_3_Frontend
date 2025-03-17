export interface CategoryAnalytics {
    id: string,
    name: string,
    suggestions: string[],
    keywords: string[],
    summary: string,
    forecasted_sentiment: number,
    sentiment: number,
    concerns: string[],
    absa_result:  AbsaResult[]
}


export interface AbsaResult {
    theme: string,
    sentiment: string
}