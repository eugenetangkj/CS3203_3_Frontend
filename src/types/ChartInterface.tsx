/**
This file stores the interfaces used to represent data points in charts imported from ShadCN
*/


/**
 * Interface for a data point used in a BarChartCustomLabel chart.
 * Each data point represents a bar in the chart with a label, a value, and a color.
 * 
 * @param label Label for each bar, such as "Healthcare" or "Environment" if the bar chart is used for categories.
 * @param key Key represents what the value represents while the value is the actual value. For example, "# Complaints": 100.
 * @param fill Colour hex code to be used for the given bar
 */
export interface BarChartCustomLabelPoint {
    label: string;
    [key: string]: number | string;
    fill: string;
}


/**
 * Interface for a data point used in a LineChartMultiplePoint chart.
 * @param month Month to be shown on the x-axis
 * @param key Key represents what the value represents while the value is the actual value. For example, "# Complaints": 100
*/
export interface LineChartMultiplePoint {
    month: string;
    [key: string]: number | string;
}






/**
Abstraction of chart data that is used to render a barchart
*/
// export interface BarChartNegativePoint {
//     xValue: string;
//     [key: string]: number | string;
// }


/**
 * Abstraction of chart data that is used to render a pie chart
 */
// export interface PieChartLegendPoint {
//     label: string;
//     value: number;
//     fill: string;
// }


