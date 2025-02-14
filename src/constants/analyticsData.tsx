import { CategoryColorMap } from "@/utils/CategoryColourMap"
import { LineChartMultiplePoint } from "@/types/ChartInterface";
import { BarChartNegativePoint } from "@/types/ChartInterface";
import { PieChartLegendPoint } from "@/types/ChartInterface";
// import { BarChartNegativePoint, LineChartMultiplePoint, PieChartLegendPoint } from "@/types/ChartInterface";
import { colourMap } from "./Colours";

export const barChartCustomLabelData = [
    { label: "Health", "# Complaints": 100, fill: CategoryColorMap.Health },
    { label: "Education", "# Complaints": 150, fill: CategoryColorMap.Education },
    { label: "Transport", "# Complaints": 120, fill: CategoryColorMap.Transport },
    { label: "Employment", "# Complaints": 80, fill: CategoryColorMap.Employment },
    { label: "Environment", "# Complaints": 50, fill: CategoryColorMap.Environment },
    { label: "Safety", "# Complaints": 60, fill: CategoryColorMap.Safety },
    { label: "Community", "# Complaints": 70, fill: CategoryColorMap.Community },
    { label: "Recreation", "# Complaints": 65, fill: CategoryColorMap.Recreation },
    { label: "Housing", "# Complaints": 90, fill: CategoryColorMap.Housing },
    { label: "Food", "# Complaints": 110, fill: CategoryColorMap.Food },
    { label: "Others", "# Complaints": 130, fill: CategoryColorMap.Others },
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
    { xLabel: "Health", Sentiment: 0.5 },
    { xLabel: "Education", Sentiment: -0.2 },
    { xLabel: "Transport", Sentiment: 0.1 },
    { xLabel: "Employment", Sentiment: -0.4 },
    { xLabel: "Environment", Sentiment: 0.8 },
    { xLabel: "Safety", Sentiment: -0.7 },
    { xLabel: "Community", Sentiment: 0.3 },
    { xLabel: "Recreation", Sentiment: 0.6 },
    { xLabel: "Housing", Sentiment: -0.5 },
    { xLabel: "Food", Sentiment: 0.4 },
    { xLabel: "Others", Sentiment: -0.1 }
];


export const sentimentsPieChart: PieChartLegendPoint[] = [
    {label: "-0.00 to -0.50", value: 100, fill: colourMap["yap-orange-900"]},
    {label: "-0.50 to 0.00", value: 200, fill: colourMap["yap-yellow-900"]},
    {label: "0.00 to 0.50", value: 140, fill: colourMap["yap-brown-900"]},
    {label: "0.50 to 1.00", value: 150, fill: colourMap["yap-green-900"]}
]

// export const sentimentsOverTimeData: LineChartMultiplePoint[] = [
//     { month: "Jan 24", Health: -0.0, Education: -0.4286, Transport: -0.7143, Employment: -0.2857, Environment: -0.7143, Safety: -0.5714, Community: -0.4286, Recreation: -0.5000, Housing: -0.1429, Food: -0.8571, Others: -0.5714 },
//     { month: "Feb 24", Health: -0.2857, Education: -0.1429, Transport: -0.8571, Employment: -0.1429, Environment: -0.8571, Safety: -0.7143, Community: -0.5714, Recreation: -0.6429, Housing: -0.2143, Food: -0.0, Others: -0.7143 },
//     { month: "Mar 24", Health: -0.4286, Education: -0.2857, Transport: -0.5714, Employment: -0.2143, Environment: -0.6429, Safety: -0.5714, Community: -0.5000, Recreation: -0.4286, Housing: -0.2857, Food: -0.1429, Others: -0.0714 },
//     { month: "Apr 24", Health: -0.7143, Education: -0.0714, Transport: -0.6429, Employment: -0.0714, Environment: -0.5714, Safety: -0.4286, Community: -0.3571, Recreation: -0.2857, Housing: -0.1429, Food: -0.8571, Others: -0.7857 },
//     { month: "May 24", Health: -0.1429, Education: -0.2143, Transport: -0.6786, Employment: -0.3571, Environment: -0.7857, Safety: -0.6429, Community: -0.5000, Recreation: -0.5714, Housing: -0.2143, Food: -0.0, Others: -0.8571 },
//     { month: "Jun 24", Health: -0.2143, Education: -0.2857, Transport: -0.5714, Employment: -0.2857, Environment: -0.7143, Safety: -0.5714, Community: -0.4286, Recreation: -0.3571, Housing: -0.0714, Food: -0.7143, Others: -0.6429 },
//     { month: "Jul 24", Health: 0.0, Education: -0.1000, Transport: -0.5000, Employment: -0.2143, Environment: -0.6429, Safety: -0.5000, Community: -0.3571, Recreation: -0.2857, Housing: -0.9286, Food: -0.5714, Others: -0.5000 },
//     { month: "Aug 24", Health: 0.1429, Education: -0.0714, Transport: -0.4286, Employment: -0.0714, Environment: -0.5714, Safety: -0.4286, Community: -0.2857, Recreation: -0.2143, Housing: -0.7857, Food: -0.4286, Others: -0.4286 },
//     { month: "Sep 24", Health: 0.3571, Education: 0.0, Transport: -0.2857, Employment: -0.0000, Environment: -0.5000, Safety: -0.3571, Community: -0.2143, Recreation: -0.1429, Housing: -0.6429, Food: -0.2857, Others: -0.2857 },
//     { month: "Oct 24", Health: 0.4286, Education: 0.0714, Transport: -0.2143, Employment: -0.9286, Environment: -0.4286, Safety: -0.2857, Community: -0.1429, Recreation: -0.0714, Housing: -0.5714, Food: -0.1429, Others: -0.1429 },
//     { month: "Nov 24", Health: 0.5714, Education: 0.1429, Transport: -0.1429, Employment: -0.8571, Environment: -0.3571, Safety: -0.2143, Community: -0.0714, Recreation: -0.0000, Housing: -0.5000, Food: 0.0, Others: 0.0 },
//     { month: "Dec 24", Health: 0.7143, Education: 0.2143, Transport: -0.0714, Employment: -0.7857, Environment: -0.2857, Safety: -0.1429, Community: -0.0000, Recreation: -0.9286, Housing: -0.4286, Food: 0.1429, Others: 0.1429 },
// ];


export const sentimentBySourceData = {
    headers: ["Source", "Sentiment"],
    data: [
        { source: "Reddit", sentiment: 0.5 },
        { source: "Just Yap!", sentiment: 0.3 }
    ]
}

export const mostNegativePostsData = {
    headers: ["Title", "Source", "Date", "Category", "Sentiment"],
    data: [
        {
            title: "Public transport delays worsening",
            source: "Reddit",
            date: "02-01-2024",
            category: "Transport",
            sentiment: -0.95
        },
        {
            title: "Housing prices are unaffordable",
            source: "Just Yap!",
            date: "02-03-2024",
            category: "Housing",
            sentiment: -0.92
        },
        {
            title: "Long waiting times at public hospitals",
            source: "Facebook",
            date: "02-02-2024",
            category: "Health",
            sentiment: -0.88
        },
        {
            title: "Noise pollution getting out of control",
            source: "Twitter",
            date: "02-04-2024",
            category: "Environment",
            sentiment: -0.71
        },
        {
            title: "Job market struggles for fresh graduates",
            source: "Reddit",
            date: "02-05-2024",
            category: "Employment",
            sentiment: -0.68
        }
    ]
};
  