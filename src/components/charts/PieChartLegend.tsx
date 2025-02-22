"use client"

import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { PieChartLegendPoint } from "@/types/ChartInterface"

interface PieChartLegendProps {
    chartData: PieChartLegendPoint[];
}


export function PieChartLegend({ chartData }: PieChartLegendProps) {
    //Generate chart config using chart data
    const chartConfig = chartData.reduce((acc, { label, fill }) => {
        acc[label] = { label, color: fill };
        return acc;
    }, {} as Record<string, { label: string; color: string }>) satisfies ChartConfig;
      

    //Generate the pie chart
    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square min-h-[350px] max-h-[400px] pb-0 [&_.recharts-pie-label-text]:fill-foreground w-full"
        >
            <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={ chartData } dataKey="value" label nameKey="label" />
            <ChartLegend
                content={<ChartLegendContent nameKey="label" />}
                className="flex flex-wrap gap-2 [&>*]:w-1/3 sm:[&>*]:w-1/6 [&>*]:flex [&>*]:justify-center text-sm mt-8"
            />
            </PieChart>
        </ChartContainer>
    )
}