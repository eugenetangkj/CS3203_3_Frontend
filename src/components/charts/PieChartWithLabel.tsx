"use client"

import { Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

/**
This component represents a PieChartWithLabel taken from ShadCN.
*/
interface PieChartWithLabelProps {
    chartData: { 
        xLabel: string,
        yValue: number,
        fill: string
    }[];
}


export function PieChartWithLabel({ chartData }: PieChartWithLabelProps) {
    //Chart config
    const chartConfig: ChartConfig = {
        yValue: { label: "yValue" },
        ...Object.fromEntries(
        chartData.map((item) => [
            item.xLabel.toLowerCase(),
            { label: item.xLabel, color: item.fill },
        ])
        ),
    } satisfies ChartConfig;


  return (
        <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] md:max-h-[350px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey={Object.keys(chartData[0])[1] } label nameKey={Object.keys(chartData[0])[0]} />
            </PieChart>
        </ChartContainer>
    )
}
