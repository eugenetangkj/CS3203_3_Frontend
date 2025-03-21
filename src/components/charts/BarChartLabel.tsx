"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { COLOUR_MAP } from "@/constants/Constants"
import { BarChartLabelPoint } from "@/types/ChartInterface"
import { BREAKPOINTS } from "@/constants/Constants"
import { useState, useEffect } from "react"



/**
A bar chart with label visualisation
*/
interface BarChartLabelProps {
    chartData: BarChartLabelPoint[];
}


export function BarChartLabel({ chartData }: BarChartLabelProps) {
    //Chart config
    const chartConfig = {} satisfies ChartConfig

    //Determine the keys
    const firstObject = chartData[0];
    const keys = Object.keys(firstObject);
    const xKey = keys[0];
    const yKey = keys[1];

    //Set number of characters to show
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [numberOfCharactersToShow, setNumberOfCharactersToShow] = useState<number>(10); 
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
            setNumberOfCharactersToShow(3);
        } else if (screenWidth <= BREAKPOINTS['sm']) {
            setNumberOfCharactersToShow(3);
        } else if (screenWidth <= BREAKPOINTS['md']) {
            setNumberOfCharactersToShow(5); 
        } else if (screenWidth <= BREAKPOINTS['lg']) {
            setNumberOfCharactersToShow(10); 
        } else if (screenWidth <= BREAKPOINTS['xl']) {
            setNumberOfCharactersToShow(20); 
        } else if (screenWidth <= BREAKPOINTS['2xl']) {
            setNumberOfCharactersToShow(30); 
        } else {
            setNumberOfCharactersToShow(-1); //Show original 
        }
        }, [screenWidth]);



        
    return (
            <ChartContainer config={chartConfig} className='max-h-[200px] w-full'>
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                    top: 40,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey={ xKey }
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    className='text-sm md:text-base text-yap-black-800'
                    tickFormatter={(value) =>
                        numberOfCharactersToShow !== -1  ? `${value.slice(0, numberOfCharactersToShow)}...` : value
                    }
                    />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey={ yKey } fill={ COLOUR_MAP['yap-green-900']} radius={8}>
                    <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                    />
                    </Bar>
                </BarChart>
            </ChartContainer> 
    )
}
