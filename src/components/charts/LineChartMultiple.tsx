"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LineChartMultiplePoint } from "@/types/ChartData"
import { CategoryColorMap } from "@/utils/CategoryColourMap"

// Turns out not need to visually render the graph correctly
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


interface LineChartMultipleProps {
    chartData: LineChartMultiplePoint[];
}


export function LineChartMultiple({ chartData }: LineChartMultipleProps) {
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
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8} 
              padding={{left: 7}}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {Object.entries(CategoryColorMap).map(([category, color]) => (
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
