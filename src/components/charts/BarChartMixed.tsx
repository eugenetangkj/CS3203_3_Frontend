"use client"


import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChartMixedPoint } from "@/types/ChartInterface";
import { useState, useEffect } from "react";
import { breakpoints } from "@/constants/Breakpoints";



/**
This component represents a bar chart mixed as defined in ShadCN charts.
*/
interface BarChartMixedProps {
    chartData: BarChartMixedPoint[],
}



export function BarChartMixed({ chartData }: BarChartMixedProps) {
    //States

    // Track the screen width
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [scalingFactor, setScalingFactor] = useState<number>(2); 
 
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
        if (screenWidth <= breakpoints['xs']) {
            setScalingFactor(4);
        } else if (screenWidth <= breakpoints['sm']) {
            setScalingFactor(3);
        } else if (screenWidth <= breakpoints['md']) {
            setScalingFactor(2); 
        } else if (screenWidth <= breakpoints['lg']) {
            setScalingFactor(1.5); 
        } else if (screenWidth <= breakpoints['xl']) {
            setScalingFactor(3); 
        } else if (screenWidth <= breakpoints['2xl']) {
            setScalingFactor(2.5); 
        } else {
            setScalingFactor(2); 
        }
     }, [screenWidth]);
 

    //Chart config
    const chartConfig = {
        label: {
          color: "hsl(var(--background))",
        },
    } satisfies ChartConfig


    // Determine dynamic value key
    const valueKey = Object.keys(chartData[0]).find((key) => key !== "label" && key !== "fill");

    // Find out the max value for the scale
    let maxValue = 5000
    if (valueKey) {
        maxValue = Math.max(...chartData.map(item => item[valueKey] as number))
    }

 
    // Generate the bar chart
    return (
        <ChartContainer config={chartConfig} className='min-h-[400px] max-w-fit'>
            <BarChart
                accessibilityLayer
                data={chartData}
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
                width={80}
             

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
       
  )
}
