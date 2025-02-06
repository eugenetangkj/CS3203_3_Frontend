import { CategoryColorMap } from "@/utils/CategoryColourMap"
import { BarChartNegativePoint, LineChartMultiplePoint, PieChartLegendPoint } from "@/types/ChartData";
import { colourMap } from "./ColourMap";


// export const pieChartWithLabelData = [
//     { xValue: "Health", yValue: 275, fill: CategoryColorMap.Health },
//     { xValue: "Education", yValue: 200, fill: CategoryColorMap.Education },
//     { xValue: "Transport", yValue: 187, fill: CategoryColorMap.Transport },
//     { xValue: "Employment", yValue: 173, fill: CategoryColorMap.Employment },
//     { xValue: "Environment", yValue: 90, fill: CategoryColorMap.Environment },
//     { xValue: "Safety", yValue: 100, fill: CategoryColorMap.Safety },
//     { xValue: "Community", yValue: 50, fill: CategoryColorMap.Community },
//     { xValue: "Recreation", yValue: 120, fill: CategoryColorMap.Recreation },
//     { xValue: "Housing", yValue: 40, fill: CategoryColorMap.Housing },
//     { xValue: "Food", yValue: 30, fill: CategoryColorMap.Food },
//     { xValue: "Others", yValue: 100, fill: CategoryColorMap.Others },
// ]

export const barChartCustomLabelData = [
    { label: "Health", "No. of Posts": 100, fill: CategoryColorMap.Health },
    { label: "Education", "No. of Posts": 150, fill: CategoryColorMap.Education },
    { label: "Transport", "No. of Posts": 120, fill: CategoryColorMap.Transport },
    { label: "Employment", "No. of Posts": 80, fill: CategoryColorMap.Employment },
    { label: "Environment", "No. of Posts": 50, fill: CategoryColorMap.Environment },
    { label: "Safety", "No. of Posts": 60, fill: CategoryColorMap.Safety },
    { label: "Community", "No. of Posts": 70, fill: CategoryColorMap.Community },
    { label: "Recreation", "No. of Posts": 65, fill: CategoryColorMap.Recreation },
    { label: "Housing", "No. of Posts": 90, fill: CategoryColorMap.Housing },
    { label: "Food", "No. of Posts": 110, fill: CategoryColorMap.Food },
    { label: "Others", "No. of Posts": 130, fill: CategoryColorMap.Others },
  ];
  



export const categoriesOverTimeData: LineChartMultiplePoint[] = [
    { month: "Jan 24", Health: 100, Education: 150, Transport: 120, Employment: 80, Environment: 50, Safety: 60, Community: 70, Recreation: 65, Housing: 90, Food: 110, Others: 130 },
    { month: "Feb 24", Health: 200, Education: 180, Transport: 110, Employment: 90, Environment: 40, Safety: 50, Community: 60, Recreation: 55, Housing: 85, Food: 100, Others: 120 },
    { month: "Mar 24", Health: 180, Education: 160, Transport: 140, Employment: 85, Environment: 55, Safety: 60, Community: 65, Recreation: 70, Housing: 80, Food: 90, Others: 95 },
    { month: "Apr 24", Health: 120, Education: 190, Transport: 130, Employment: 95, Environment: 60, Safety: 70, Community: 75, Recreation: 80, Housing: 90, Food: 110, Others: 115 },
    { month: "May 24", Health: 220, Education: 175, Transport: 125, Employment: 70, Environment: 45, Safety: 55, Community: 65, Recreation: 60, Housing: 85, Food: 100, Others: 105 },
    { month: "Jun 24", Health: 210, Education: 160, Transport: 140, Employment: 80, Environment: 50, Safety: 60, Community: 70, Recreation: 75, Housing: 95, Food: 120, Others: 125 },
    { month: "Jul 24", Health: 250, Education: 185, Transport: 150, Employment: 85, Environment: 55, Safety: 65, Community: 75, Recreation: 80, Housing: 105, Food: 130, Others: 140 },
    { month: "Aug 24", Health: 270, Education: 190, Transport: 160, Employment: 100, Environment: 60, Safety: 70, Community: 80, Recreation: 85, Housing: 115, Food: 140, Others: 150 },
    { month: "Sep 24", Health: 300, Education: 200, Transport: 180, Employment: 110, Environment: 65, Safety: 75, Community: 85, Recreation: 90, Housing: 125, Food: 150, Others: 160 },
    { month: "Oct 24", Health: 310, Education: 210, Transport: 190, Employment: 120, Environment: 70, Safety: 80, Community: 90, Recreation: 95, Housing: 130, Food: 160, Others: 170 },
    { month: "Nov 24", Health: 330, Education: 220, Transport: 200, Employment: 130, Environment: 75, Safety: 85, Community: 95, Recreation: 100, Housing: 135, Food: 170, Others: 180 },
    { month: "Dec 24", Health: 350, Education: 230, Transport: 210, Employment: 140, Environment: 80, Safety: 90, Community: 100, Recreation: 105, Housing: 140, Food: 180, Others: 190 },
  ];


export const sentimentsOfCategories: BarChartNegativePoint[] = [
    { xValue: "Health", Sentiment: 0.5 },
    { xValue: "Education", Sentiment: -0.2 },
    { xValue: "Transport", Sentiment: 0.1 },
    { xValue: "Employment", Sentiment: -0.4 },
    { xValue: "Environment", Sentiment: 0.8 },
    { xValue: "Safety", Sentiment: -0.7 },
    { xValue: "Community", Sentiment: 0.3 },
    { xValue: "Recreation", Sentiment: 0.6 },
    { xValue: "Housing", Sentiment: -0.5 },
    { xValue: "Food", Sentiment: 0.4 },
    { xValue: "Others", Sentiment: -0.1 }
];


export const sentimentsPieChart: PieChartLegendPoint[] = [
    {label: "-1.00 to -0.50", value: 100, fill: colourMap["yap-orange-900"]},
    {label: "-0.50 to 0.00", value: 200, fill: colourMap["yap-yellow-900"]},
    {label: "0.00 to 0.50", value: 140, fill: colourMap["yap-brown-900"]},
    {label: "0.50 to 1.00", value: 150, fill: colourMap["yap-green-900"]}
]