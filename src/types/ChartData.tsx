/**
Abstraction of chart data that is used to render a line chart with multiple lines
*/
export interface LineChartMultiplePoint {
    month: string;
    [key: string]: number | string;
}

/**
Abstraction of chart data that is used to render a barchart
*/
export interface BarChartNegativePoint {
    xValue: string;
    [key: string]: number | string;
}


/**
 * Abstraction of chart data that is used to render a pie chart
 */
export interface PieChartLegendPoint {
    label: string;
    value: number;
    fill: string;
}
