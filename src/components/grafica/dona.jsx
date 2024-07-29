"use client";
import { ResponsivePie } from '@nivo/pie';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import getColor from '@/themes/colorUtils';

const MyResponsivePie = () => {
    const data = [
        {
            "id": "erlang",
            "label": "erlang",
            "value": 583,
            "color": "hsl(124, 70%, 50%)"
        },
        {
            "id": "lisp",
            "label": "lisp",
            "value": 459,
            "color": "hsl(90, 10%, 10%)"
        },
        {
            "id": "rust",
            "label": "rust",
            "value": 81,
            "color": "hsl(100, 70%, 50%)"
        },
        {
            "id": "haskell",
            "label": "haskell",
            "value": 517,
            "color": "hsl(256, 70%, 50%)"
        },
        {
            "id": "make",
            "label": "make",
            "value": 91,
            "color": "hsl(229, 70%, 50%)"
        }
    ];

    const theme = useTheme();
    const [legendDirection, setLegendDirection] = useState('row');
    const [legendTranslateX, setLegendTranslateX] = useState(0);
    const [legendTranslateY, setLegendTranslateY] = useState(0);
    const [labelFontSize, setLabelFontSize] = useState(20);
    const [legendFontSize, setLegendFontSize] = useState(14);
    const containerRef = useRef(null);

    const updateFontSize = () => {
        const width = containerRef.current.offsetWidth;
        if (width < 400) {
            setLabelFontSize(10);
            setLegendFontSize(8);
        } else if (width < 768) {
            setLabelFontSize(12);
            setLegendFontSize(10);
        } else {
            setLabelFontSize(20);
            setLegendFontSize(14);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setLegendDirection(window.innerWidth < 768 ? 'column' : 'row');
            updateFontSize();
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call handler right away so state gets updated with initial window size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        updateFontSize();
    }, [containerRef.current]);

    const textColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';
    const tooltipBackgroundColor = theme.palette.mode === 'dark' ? '#333333' : '#FFFFFF';
    const tooltipTextColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';

    return (
        <div ref={containerRef} style={{ height: '100%', width: '100%', minHeight: '400px' }}>
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 80, bottom: 150, left: 80 }}
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
                            id: 'ruby'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'c'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'go'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'python'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'scala'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'lisp'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'elixir'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'javascript'
                        },
                        id: 'lines'
                    }
                ]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: legendDirection,
                        justify: false,
                        translateX: legendTranslateX,
                        translateY: 140,
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
                            fontSize: labelFontSize,
                            fill: textColor
                        }
                    },
                    legends: {
                        text: {
                            fontSize: legendFontSize,
                            fill: textColor
                        }
                    },
                    tooltip: {
                        container: {
                            background: tooltipBackgroundColor,
                            color: tooltipTextColor,
                        }
                    }
                }}
            />
        </div>
    );
};

export default MyResponsivePie;
