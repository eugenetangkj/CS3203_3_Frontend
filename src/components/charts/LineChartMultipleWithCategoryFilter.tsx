"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LineChartMultiplePoint } from "@/types/ChartInterface"
import { useState, useEffect } from "react"
import { CategoryMultiSelect } from "../common/others/CategoryMultiSelect"

interface LineChartMultipleWithCategoryFilter {
    chartData: LineChartMultiplePoint[],
    colourMap: Record<string, string>,
    allLabels: string[]
}


export function LineChartMultipleWithCategoryFilter({ chartData, colourMap, allLabels }: LineChartMultipleWithCategoryFilter) {
    const [selectedLabels, setSelectedLabels] = useState<string[]>(allLabels)
    const [currentChartData, setCurrentChartData] = useState<LineChartMultiplePoint[]>(chartData)




    //Set up a useEffect. When the selectedLabels change, update the chartData to be displayed
    useEffect(() => {
        setCurrentChartData(
            chartData.map(({ date, ...rest }) => {
                // Keep only the selected labels and sort them
                const filteredEntries = Object.entries(rest)
                    .filter(([key]) => selectedLabels.includes(key))
                    .sort(([a], [b]) => a.localeCompare(b)); // Sort alphabetically by key
    
                // Reconstruct the object with sorted keys
                const filteredData: LineChartMultiplePoint = { date };
                filteredEntries.forEach(([key, value]) => {
                    filteredData[key] = value;
                });
    
                return filteredData;
            })
        );
    }, [selectedLabels]);
    
    



    //Chart config
    const chartConfig = { } satisfies ChartConfig
    

    return (
        <div className='flex flex-col space-y-4'>
            <CategoryMultiSelect allLabels={ allLabels } selectedLabels={ selectedLabels } setSelectedLabels={ setSelectedLabels } />
             <ChartContainer config={chartConfig} className='max-h-[400px] w-full'>
            <LineChart
                accessibilityLayer
                data={currentChartData}
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



        </div>
       
    )
}
