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
 * Interface for a data point used in a BarChartMixed chart.
 * Each data point represents a bar in the chart with a label, a value, and a color.
 * 
 * @param label Label for each bar, such as "Healthcare" or "Environment" if the bar chart is used for categories.
 * @param key Key represents what the value represents while the value is the actual value. For example, "# Complaints": 100.
 * @param fill Colour hex code to be used for the given bar
 */
export interface BarChartMixedPoint {
    label: string;
    [key: string]: number | string;
    fill: string;
}


/**
 * Interface for a data point used in a LineChartMultiplePoint chart.
 * @param date Date to be shown on the x-axis
 * @param key Key represents what the value represents while the value is the actual value. For example, "# Complaints": 100
*/
export interface LineChartMultiplePoint {
    date: string;
    [key: string]: number | string;
}


/**
 * Interface for a data point used in a BarChartNegative chart.
 * @param month Month to be shown on the x-axis
 * @param key Key represents what the value represents while the value is the actual value. For example, "# Complaints": 100
*/
export interface BarChartNegativePoint {
    xLabel: string;
    [key: string]: number | string;
}


/**
 * Interface for a data point used in a PieChartLegend chart.
 * @param label Name of the region, such as 0.00 - 0.50
 * @param value Value of the region
 * @param fill Colour of the region
*/
export interface PieChartLegendPoint {
    label: string;
    value: number;
    fill: string;
}

/**
 * Interface for the input used to create a classic table for the classic table chart
 * @param headers The headers to be used in the table
 * @param data The data to be displayed in the table
*/
export interface ClassicTableInput {
    headers: string[];
    data: any[];
}

