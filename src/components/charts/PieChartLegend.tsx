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
import { CardContent, CardFooter } from "../ui/card";

interface PieChartLegendProps {
    chartData: PieChartLegendPoint[],
    footerText: string
}


export function PieChartLegend({ chartData, footerText }: PieChartLegendProps) {
    //Generate chart config using chart data
    const chartConfig = chartData.reduce((acc, { label, fill }) => {
        acc[label] = { label, color: fill };
        return acc;
    }, {} as Record<string, { label: string; color: string }>) satisfies ChartConfig;
      

    //Generate the pie chart
    return (
        <div className='flex flex-col space-y-4'>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto min-h-[350px] max-h-[400px] w-full pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Pie data={ chartData } dataKey="value" label nameKey="label"/>
                    <ChartLegend
                        content={<ChartLegendContent nameKey="label" />}
                        className="flex flex-wrap gap-2 [&>*]:w-1/3 sm:[&>*]:w-1/6 [&>*]:flex [&>*]:justify-center text-sm mt-8"
                    />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-base">
                <div className="leading-normal text-muted-foreground text-yap-gray-900">
                    { footerText }
                </div>
            </CardFooter>
        </div>
    )
}