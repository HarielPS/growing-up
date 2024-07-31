"use client";
import { ResponsivePie } from '@nivo/pie';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';

const MyResponsivePie = () => {
    const data = [
        {
            "id": "Al Corriente",
            "label": "Al Corriente",
            "value": 583,
            "color": "hsl(124, 70%, 50%)"
        },
        {
            "id": "En Proceso",
            "label": "En Proceso",
            "value": 459,
            "color": "hsl(90, 10%, 10%)"
        },
        {
            "id": "Atrasado",
            "label": "Atrasado",
            "value": 81,
            "color": "hsl(100, 70%, 50%)"
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
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 140, bottom: isSmallScreen ? 150 : 80, left: 90 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeInnerRadiusOffset={8}
                activeOuterRadiusOffset={16}
                colors={{ scheme: 'dark2' }}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            '0'
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
                fill={[
                    {
                        match: {
                            id: 'Al Corriente'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'En Proceso'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'Atrasado'
                        },
                        id: 'dots'
                    },
                ]}
                legends={[
                    {
                        anchor:'bottom',
                        direction:'row',
                        justify: false,
                        translateX: 0,
                        translateY: 50,
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
