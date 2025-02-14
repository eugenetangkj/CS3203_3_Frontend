"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import { CategoryColorMap } from "@/utils/CategoryColourMap"

interface LineChartMultipleProps {
    chartData: LineChartMultiplePoint[];
}


export function LineChartMultiple({ chartData }: LineChartMultipleProps) {
    //Chart config
    const chartConfig = { } satisfies ChartConfig


    
    return (
        <ChartContainer config={chartConfig} className='max-h-[250px] lg:max-h-[350px] w-full'>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                left: 12,
                right: 12,
                }}
            >
                <CartesianGrid vertical={true} />
                    <YAxis />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8} 
                        padding={{left: 7}}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                    { Object.entries(CategoryColorMap).map(([category, color]) => (
                        <Line
                            key={category}
                            dataKey={category}
                            type="monotone"
                            stroke={color}
                            strokeWidth={2}
                            dot={false}
                        />
                    ))}
            </LineChart>
            </ChartContainer>
    )
}
