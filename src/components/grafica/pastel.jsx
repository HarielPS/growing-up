"use client";
import { ResponsivePie } from '@nivo/pie';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

const MyResponsivePie = () => {
    const data = [
        {
            "id": "Technology",
            "label": "Technology",
            "value": 400,
            "color": "hsl(210, 70%, 50%)"
        },
        {
            "id": "Health",
            "label": "Health",
            "value": 300,
            "color": "hsl(100, 70%, 50%)"
        },
        {
            "id": "Finance",
            "label": "Finance",
            "value": 200,
            "color": "hsl(50, 70%, 50%)"
        },
        {
            "id": "Education",
            "label": "Education",
            "value": 150,
            "color": "hsl(340, 70%, 50%)"
        },
        {
            "id": "Others",
            "label": "Others",
            "value": 50,
            "color": "hsl(280, 70%, 50%)"
        },
    ];

    const theme = useTheme();
    const containerRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const updateScreenSize = () => {
        const width = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth;
        setIsSmallScreen(width < 600);
    };

    useEffect(() => {
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    const textColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';
    const tooltipBackgroundColor = theme.palette.mode === 'dark' ? '#333333' : '#FFFFFF';
    const tooltipTextColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';

    return (
        <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '400px' }}>
            <Typography variant="h5" align="center" gutterBottom sx={{fontWeight: 'bold'}}>
            Investment Distribution by Category
            </Typography>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 150, bottom: 80, left: 90 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeInnerRadiusOffset={8}
                activeOuterRadiusOffset={16}
                colors={{ scheme: 'category10' }}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            '0.2'
                        ]
                    ]
                }}
                arcLinkLabelsTextOffset={5}
                arcLinkLabelsTextColor={textColor}
                arcLinkLabelsDiagonalLength={13}
                arcLinkLabelsStraightLength={9}
                arcLinkLabelsThickness={3}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={textColor}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 140,
                        translateY: 0,
                        itemsSpacing: 5,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: textColor,
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#999'
                                }
                            }
                        ]
                    }
                ]}
                theme={{
                    labels: {
                        text: {
                            fontSize: 12,
                            fill: textColor
                        }
                    },
                    legends: {
                        text: {
                            fontSize: 14,
                            fill: textColor
                        }
                    },
                    tooltip: {
                        container: {
                            background: tooltipBackgroundColor,
                            color: tooltipTextColor,
                            fontSize: 'inherit',
                            borderRadius: '2px',
                            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                            padding: '5px 9px',
                        },
                    },
                }}
            />
        </div>
    );
};

export default MyResponsivePie;
