/**
To be used in chart components 
*/

interface ChartConfig {
    yValue: { label: string };
    [key: string]: { label: string; color?: string };
}