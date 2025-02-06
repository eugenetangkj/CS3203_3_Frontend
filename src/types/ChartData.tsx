/**
Abstraction of chart data that is used to render charts
*/
export interface LineChartMultiplePoint {
    month: string;
    [key: string]: number | string;
}
