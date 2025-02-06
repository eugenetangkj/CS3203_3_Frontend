/**
Abstraction of chart data that is used to render charts
*/
export interface LineChartMultiplePoint {
    month: string;
    [key: string]: number | string;
}

/**
Abstraction of chart data that is used to render charts
*/
export interface BarCharNegativePoint {
    xValue: string;
    [key: string]: number | string;
}
