"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, YAxis } from "recharts"
import { CardContent, CardFooter, } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { BarChartNegativePoint } from "@/types/ChartInterface"
import { COLOUR_MAP } from "@/constants/Constants"
import { SENTIMENTS_RANGE } from "@/constants/Constants"
import { useState, useEffect } from "react"
import { CategoryMultiSelect } from "../common/others/CategoryMultiSelect"


interface BarChartNegativeProps {
    chartData: BarChartNegativePoint[];
    allLabels: string[]
    footerText: string
}

//Break into multiple lines if got more than 1 word
const breakLabel = (label: string) => {
    const words = label.split(' ');
    if (words.length > 1) {
        return words.join('\n');
    }
    return label;
};


export function BarChartNegative({ chartData, allLabels, footerText }: BarChartNegativeProps) {
    const [selectedLabels, setSelectedLabels] = useState<string[]>(allLabels)
    const [currentChartData, setCurrentChartData] = useState<BarChartNegativePoint[]>(chartData)


    //Dynamically determine the y-axis label by taking the key that is not called xLabel
    const valueKey = Object.keys(chartData[0]).find(key => key !== "xLabel") as string;

    //Chart config
    const chartConfig = {} satisfies ChartConfig



    //Set up a useEffect. When the selectedLabels change, update the chartData to be displayed
    useEffect(() => {
        setCurrentChartData(chartData.filter(item => selectedLabels.includes(item.xLabel)));
    }, [selectedLabels])


    return (
        <div className='flex flex-col space-y-4'>
            <CategoryMultiSelect allLabels={ allLabels } selectedLabels={ selectedLabels } setSelectedLabels={ setSelectedLabels } />
            <CardContent>
                <ChartContainer config={chartConfig} className='max-h-[250px] lg:max-h-[350px] w-full'>
                    <BarChart accessibilityLayer data={currentChartData}>
                    <CartesianGrid vertical={false} />

                    <YAxis domain={ SENTIMENTS_RANGE } />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel hideIndicator />}
                    />
                    <Bar dataKey={ valueKey }>
                        <LabelList position="top" dataKey="xLabel" fillOpacity={1} fill={ COLOUR_MAP['yap-black-800'] } formatter={ breakLabel } />
                        
                        {currentChartData.map((item, index) => {
                            return (
                                <Cell
                                    key={index}
                                    fill={item[valueKey] as number > 0 ? COLOUR_MAP['yap-green-900'] : COLOUR_MAP['yap-orange-900']}
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
