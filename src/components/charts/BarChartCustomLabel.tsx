"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChartCustomLabelPoint } from "@/types/ChartData"


// Does not matter
const chartConfig = {
  desktop: {
    label: "No. of Posts",
    color: "hsl(var(--background))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig


interface BarChartCustomLabelProps {
  chartData: BarChartCustomLabelPoint[];
}


export function BarChartCustomLabel({ chartData }: BarChartCustomLabelProps) {
  // Determine dynamic value key
  const valueKey = Object.keys(chartData[0]).find((key) => key !== "label" && key !== "fill");

  // Generate the bar chart
  return (
    <ChartContainer config={chartConfig} className='max-h-[250px] lg:max-h-[350px] w-full'>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 16,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="label"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey={ valueKey } type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey={ valueKey as string }
          layout="vertical"
          fill="var(--color-desktop)"
          radius={4}
        >
          <LabelList
            dataKey="label"
            position="insideLeft"
            offset={8}
            className="fill-[--color-label]"
            fontSize={12}
          />
          <LabelList
            dataKey={ valueKey as string }
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
