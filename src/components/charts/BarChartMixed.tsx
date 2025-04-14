"use client"


import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChartMixedPoint } from "@/types/ChartInterface";
import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/constants/Constants";
import { CategoryMultiSelect } from "../common/others/CategoryMultiSelect";



/**
This component represents a bar chart mixed as defined in ShadCN charts.
*/
interface BarChartMixedProps {
    chartData: BarChartMixedPoint[],
    allPossibleLabels: string[]
}



export function BarChartMixed({ chartData, allPossibleLabels }: BarChartMixedProps) {
    //States
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [scalingFactor, setScalingFactor] = useState<number>(2); 
    const [selectedLabels, setSelectedLabels] = useState<string[]>(allPossibleLabels)
    const [currentChartData, setCurrentChartData] = useState<BarChartMixedPoint[]>(chartData)

 


    // Adjust scaling factor based on screen size
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
 
    useEffect(() => {
        // Change maxValue based on screen size
        if (screenWidth <= BREAKPOINTS['xs']) {
            setScalingFactor(4.25);
        } else if (screenWidth <= BREAKPOINTS['sm']) {
            setScalingFactor(3);
        } else if (screenWidth <= BREAKPOINTS['md']) {
            setScalingFactor(2); 
        } else if (screenWidth <= BREAKPOINTS['lg']) {
            setScalingFactor(1.5); 
        } else if (screenWidth <= BREAKPOINTS['xl']) {
            setScalingFactor(2.5); 
        } else if (screenWidth <= BREAKPOINTS['2xl']) {
            setScalingFactor(2.5); 
        } else {
            setScalingFactor(2); 
        }
    }, [screenWidth]);


    //Set up a useEffect. When the selectedLabels change, update the chartData to be displayed
    useEffect(() => {
        setCurrentChartData(chartData.filter(item => selectedLabels.includes(item.label)));
    }, [selectedLabels])



    //Chart config
    const chartConfig = {
        label: {
          color: "hsl(var(--background))",
        },
    } satisfies ChartConfig


    // Determine dynamic value key
    const valueKey = Object.keys(currentChartData[0]).find((key) => key !== "label" && key !== "fill");

    // Find out the max value for the scale
    let maxValue = 5000
    if (valueKey) {
        maxValue = Math.max(...currentChartData.map(item => item[valueKey] as number))
    }

 
    // Generate the bar chart
    return (
        <div className='flex flex-col space-y-2'>
            <CategoryMultiSelect allLabels={ allPossibleLabels } selectedLabels={ selectedLabels } setSelectedLabels={ setSelectedLabels } />

        
            <ChartContainer config={chartConfig} className='h-[480px] max-w-fit'>
                <BarChart
                    accessibilityLayer
                    data={currentChartData}
                    layout="vertical"
                    margin={{
                    left: 20,
                    }}
                >
                    <YAxis
                    dataKey="label"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    interval={0}
                    width={120}
                    />
                    <XAxis dataKey={ valueKey } type="number" domain={[0, maxValue * scalingFactor]} hide />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey={ valueKey as string } layout="vertical" radius={5}>
                    <LabelList
                            dataKey={valueKey as string}
                            position="right"
                            offset={8}
                            className="fill-foreground"
                        />



                    </Bar>
                </BarChart>
            </ChartContainer>
        </div>
       
  )
}
