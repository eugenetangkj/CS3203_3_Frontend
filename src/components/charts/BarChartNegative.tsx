"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, YAxis } from "recharts"
import { CardContent, CardFooter, } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { BarChartNegativePoint } from "@/types/ChartData"
import { colourMap } from "@/constants/ColourMap"
import { sentimentsRange } from "@/constants/Sentiments"

// Not needed
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig


interface BarChartNegativeProps {
    chartData: BarChartNegativePoint[];
    footerText: String
}


export function BarChartNegative({ chartData, footerText }: BarChartNegativeProps) {
    // Dynamically determine the y-axis label
    const valueKey = Object.keys(chartData[0]).find(key => key !== "xValue") as string;

    // Generate the component
    return (
    <div>
        <CardContent>
            <ChartContainer config={chartConfig} className='max-h-[250px] lg:max-h-[350px] w-full'>
                <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />

                <YAxis domain={ sentimentsRange } />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel hideIndicator />}
                />
                <Bar dataKey={ valueKey }>
                    <LabelList position="top" dataKey="xValue" fillOpacity={1} fill={ colourMap['yap-black-800'] } />
                    
                    {chartData.map((item, index) => {
                        return (
                            <Cell
                                key={index}
                                fill={item[valueKey] as number > 0 ? colourMap['yap-green-900'] : colourMap['yap-orange-900']}
                            />
                        );
                    })}
                </Bar>
                </BarChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-base">
        <div className="leading-none text-muted-foreground text-yap-gray-900">
            { footerText }
        </div>
        </CardFooter>
        </div>
    )
}
