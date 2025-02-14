/**
This file stores the interfaces used to represent data points in charts imported from ShadCN
*/


/**
 * Interface for a data point used in a BarChartCustomLabel chart.
 * Each data point represents a bar in the chart with a label, a value, and a color.
 */
export interface BarChartCustomLabelPoint {
    //Label for each bar, such as "Healthcare" or "Environment" if the bar chart is used for categories.
    label: string;

    //Represents additional numeric or string properties for the bar chart data.
    //The key is dynamic and can be any string.

    [key: string]: number | string;

    //Colour hex code to be used for the given bar.
    fill: string;
}






























/**
Abstraction of chart data that is used to render a line chart with multiple lines
*/
// export interface LineChartMultiplePoint {
//     month: string;
//     [key: string]: number | string;
// }

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


