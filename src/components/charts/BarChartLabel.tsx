"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { COLOUR_MAP } from "@/constants/Constants"
import { BarChartLabelPoint } from "@/types/ChartInterface"


const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

/**
A bar chart with label visualisation
*/
interface BarChartLabelProps {
    chartData: BarChartLabelPoint[];
}


export function BarChartLabel({ chartData }: BarChartLabelProps) {
    //Chart config
    const chartConfig = {} satisfies ChartConfig

    //Determine the keys
    const firstObject = chartData[0];
    const keys = Object.keys(firstObject);
    const xKey = keys[0];
    const yKey = keys[1];


    return (
            <ChartContainer config={chartConfig} className='max-h-[200px] w-full'>
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                    top: 20,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey={ xKey }
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    className='text-sm md:text-base text-yap-black-800'
                    
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey={ yKey } fill={ COLOUR_MAP['yap-green-900']} radius={8}>
                    <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                    />
                    </Bar>
                </BarChart>
            </ChartContainer> 
    )
}
