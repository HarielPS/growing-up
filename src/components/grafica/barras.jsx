// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

// Example data
const data = [
    { "month": "January", "projects": 60 },
    { "month": "February", "projects": 20 },
    { "month": "March", "projects": 10 },
    { "month": "April", "projects": 80 },
    { "month": "May", "projects": 100 },
    { "month": "June", "projects": 50 },
];

// Create a color scale using d3
const colorScale = scaleOrdinal(schemeCategory10);

const MyResponsiveBar = () => {
    const theme = useTheme();
    const textColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';
    const tooltipBackgroundColor = theme.palette.mode === 'dark' ? '#333333' : '#FFFFFF';
    const tooltipTextColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';

    return (
        <>
            <Typography variant="h5" align="center" gutterBottom sx={{fontWeight: 'bold'}}>
            Monthly Investment Projects
            </Typography>
            <ResponsiveBar
                data={data}
                keys={['projects']}
                indexBy="month"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ id, data }) => colorScale(data.month)}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'month',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    tickColor: textColor,
                    legendTextColor: textColor,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'projects',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    tickColor: textColor,
                    legendTextColor: textColor,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={textColor}
                legends={[]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in month: " + e.indexValue}
                theme={{
                    axis: {
                        ticks: {
                            text: {
                                fill: textColor
                            }
                        },
                        legend: {
                            text: {
                                fill: textColor
                            }
                        }
                    },
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
        </>
    );
};

export default MyResponsiveBar;
