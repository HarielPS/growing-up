"use client";
import { ResponsiveLine } from '@nivo/line';
import React from 'react';

const MyResponsiveLine = () => {
    const data = [
        {
            "id": "investment",
            "color": "hsl(201, 70%, 50%)",
            "data": [
                { "x": "January", "y": 10000 },
                { "x": "February", "y": 15000 },
                { "x": "March", "y": 12000 },
                { "x": "April", "y": 8000 },
                { "x": "May", "y": 9000 }
            ]
        },
        {
            "id": "earnings",
            "color": "hsl(318, 70%, 50%)",
            "data": [
                { "x": "January", "y": 1200 },
                { "x": "February", "y": 1800 },
                { "x": "March", "y": 1500 },
                { "x": "April", "y": 1000 },
                { "x": "May", "y": 1100 }
            ]
        },
        {
            "id": "total_repayment",
            "color": "hsl(36, 70%, 50%)",
            "data": [
                { "x": "January", "y": 11200 },
                { "x": "February", "y": 16800 },
                { "x": "March", "y": 13500 },
                { "x": "April", "y": 9000 },
                { "x": "May", "y": 10100 }
            ]
        }
    ];

    return (
        <div style={{ height: '100%', width: '100%', minHeight: '400px' }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 150, bottom: 50, left: 80 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 0,
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                curve="linear"
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Time (months)',
                    legendOffset: 40,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 10,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Amount ($)',
                    legendOffset: -70,
                    legendPosition: 'middle'
                }}
                enableGridX={false}
                colors={{ scheme: 'category10' }}
                lineWidth={3}
                pointSize={10}
                pointColor="#ffffff"
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="y"
                pointLabelYOffset={-12}
                enableArea={true}
                areaBaselineValue={0}
                areaOpacity={0.25}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 110,
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
                theme={{
                    grid: {
                        line: {
                            stroke: '#ddd',
                            strokeWidth: 1
                        }
                    }
                }}
            />
        </div>
    );
};

export default MyResponsiveLine;
