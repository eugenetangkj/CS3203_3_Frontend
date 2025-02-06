"use client"


import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


interface PieChartWithLabelProps {
  chartData: { xValue: string; yValue: number; fill: string }[];
}


export function PieChartWithLabel({ chartData }: PieChartWithLabelProps) {
  const chartConfig: ChartConfig = {
    yValue: { label: "yValue" },
    ...Object.fromEntries(
      chartData.map((item) => [
        item.xValue.toLowerCase(),
        { label: item.xValue, color: item.fill },
      ])
    ),
  } satisfies ChartConfig;


  return (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey={Object.keys(chartData[0])[1] } label nameKey={Object.keys(chartData[0])[0]} />
          </PieChart>
        </ChartContainer>
  )
}
