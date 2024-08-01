// pages/index.js
"use client";
import React from "react";
import dynamic from 'next/dynamic';
import InvestmentHistory from "@/components/user/historial/tabla";
import { Box } from "@mui/material";
import getColor from "@/themes/colorUtils";
import { useTheme } from '@mui/material/styles';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";  // Corrección aquí

// Sample event data
const events = [
  { date: '2024-08-01', name: 'John Doe', amount: 100 },
  { date: '2024-08-05', name: 'Jane Smith', amount: 200 },
  { date: '2024-08-15', name: 'Alice Johnson', amount: 150 },
  // Add more events as needed
];

const BasicDateCalendar = dynamic(() => import('@/components/user/historial/calendarmui'), { ssr: false });

export default function Page() {
  const theme = useTheme();
  return (
    <Box sx={{ height: "100vh", width: '100%', padding: 2 }}>
      <Box sx={{ height: "100%", width: '100%', display: 'flex' }}>
        <Box sx={{ width: '70%', height: "100%", paddingRight: 4 }}>
          <InvestmentHistory />
        </Box>
        <Box sx={{ width: '30%', height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Box sx={{ flex: 0.4, width: '100%', height: '100%', borderRadius: 2, padding: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:15 , boxShadow: `1px 1px 9px 10px ${getColor(theme, 'shadow')}` }}>
            <BasicDateCalendar events={events} />
          </Box>

          <Box sx={{ flex: 0.6, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2, borderRadius: 2, boxShadow: `1px 1px 9px 10px ${getColor(theme, 'shadow')}` }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: '1vh' }}>
                Monto total invertido
              </Typography>
              <Typography variant="h4" color="primary">
                $12,847
              </Typography>
            </Box>

            <Divider orientation="horizontal" flexItem sx={{ marginY: '10px', width: '80%' }} />

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: '1vh' }}>
                Ganancias esperadas
              </Typography>
              <Typography variant="h4" color="primary">
                $1,254
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
