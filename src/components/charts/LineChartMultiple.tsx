"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LineChartMultiplePoint } from "@/types/ChartInterface"

interface LineChartMultipleProps {
    chartData: LineChartMultiplePoint[],
    colourMap: Record<string, string>
}


export function LineChartMultiple({ chartData, colourMap }: LineChartMultipleProps) {
    //Chart config
    const chartConfig = { } satisfies ChartConfig

    return (
        <ChartContainer config={chartConfig} className='max-h-[400px] w-full'>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                left: 0,
                right: 12,
                }}
            >
                <CartesianGrid vertical={true} />
                    <YAxis domain={['auto', (max: number) => max * 1.05]} />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8} 
                        padding={{left: 7}}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                    {Object.entries(colourMap).map(([category, colour]) => (
                        <Line
                            key={category}
                            dataKey={category}
                            type="monotone"
                            stroke={colour}
                            strokeWidth={2}
                            dot={false}
                        />
                    ))}


                    
            </LineChart>
            </ChartContainer>
    )
}
