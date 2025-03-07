export interface CategoryAnalytics {
    id: string,
    name: string,
    suggestions: string[],
    keywords_per_category: string[],
    summary: string,
    forecasted_score: Number,
    current_score: Number,
    key_concerns: string[],
    forecasted_label: string
}