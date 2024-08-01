import React from "react";
import InvestmentHistory from "@/components/user/historial/tabla";
import CalendarioHistorial from "@/components/user/historial/CalendarioHistorial";
import { Box, Grid } from "@mui/material";

export default function Page() {
  return (
    <>
      <Box sx={{ height: "100%", width: '100%', padding: 2 }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={12} md={8} sx={{ height: "100%" }}>
            <Box sx={{ height: "100%", paddingRight: 4 }}>
              <InvestmentHistory />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ height: "100%", width:'100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flex: 1, width:'100%' , backgroundColor: 'white', borderRadius: 2, padding: 0, display: 'flex', flexDirection: 'column' }}>
              <CalendarioHistorial />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
