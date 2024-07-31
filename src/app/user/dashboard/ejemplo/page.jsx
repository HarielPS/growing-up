"use client"
import { ResponsiveLine } from '@nivo/line';
import React from 'react';

const MyResponsiveLine = () => {
    const data = [
        {
            id: 'Technology',
            data: [
                { x: 'Q1 2024', y: 5000 },
                { x: 'Q2 2024', y: 7000 },
                { x: 'Q3 2024', y: 8000 },
                { x: 'Q4 2024', y: 6000 },
            ],
        },
        {
            id: 'Health',
            data: [
                { x: 'Q1 2024', y: 3000 },
                { x: 'Q2 2024', y: 4500 },
                { x: 'Q3 2024', y: 5000 },
                { x: 'Q4 2024', y: 4000 },
            ],
        },
        {
            id: 'Energy',
            data: [
                { x: 'Q1 2024', y: 2000 },
                { x: 'Q2 2024', y: 3500 },
                { x: 'Q3 2024', y: 4000 },
                { x: 'Q4 2024', y: 3000 },
            ],
        },
        {
            id: 'Finance',
            data: [
                { x: 'Q1 2024', y: 6000 },
                { x: 'Q2 2024', y: 7500 },
                { x: 'Q3 2024', y: 8000 },
                { x: 'Q4 2024', y: 6500 },
            ],
        },
    ];

    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Period',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Earnings',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'category10' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
};

export default MyResponsiveLine;
