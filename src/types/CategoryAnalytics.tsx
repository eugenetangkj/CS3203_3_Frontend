export interface CategoryAnalytics {
    id: string,
    name: string,
    suggestions: string[],
    keywords_per_category: string[],
    summary: string,
    forecasted_score: number,
    current_score: number,
    key_concerns: string[],
    forecasted_label: string
    absa_result:  AbsaResult[]
}


export interface AbsaResult {
    theme: string,
    sentiment: string
}