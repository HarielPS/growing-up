"use client";
import React from "react";
import CardInfoPortafolio from "@/components/user/portafolio/CardInfoPortafolio";
import TablaPortafolio from "@/components/user/portafolio/TablaPortafolio";
import { Box } from "@mui/system";
import InvestmentTable from "@/components/user/portafolio/tabla";
import { Typography, Divider } from "@mui/material";
import MyResponsivePie from "@/components/grafica/dona";
import getColor from "@/themes/colorUtils";
import { useTheme } from '@mui/material/styles';


export default function Page() {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: '100vh', padding: 2 }}>
      <Box sx={{display:'flex', flexDirection: { xs: "column", md: "row" }, alignItems: 'center', height: { xs: '100%', md: '40%' }, marginBottom:'2vh', background: getColor(theme,"seven"), borderRadius: 2, padding: 2, boxShadow: 1 }}>
        
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            backgroundColor: getColor(theme,"fifth_rev"),
            borderRadius: 2,
            boxShadow: 1,
            width: { xs: '100%', md: '50%' },
            height: '100%',
            marginRight: { xs: 0, md: '2vh' },
            marginBottom: { xs: '2vh', md: 0 }
          }}
        >
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

        
          <Box sx={{ height: '100%', width: { xs: '100%', md: '50%' }, background:getColor(theme,"fifth_rev"), borderRadius: 2, boxShadow: 1, padding:1 , alignContent:'center'}}>
            <MyResponsivePie />
          </Box>

      </Box>

      {/* Commented out sections */}
      {/* <div className="flex flex-row justify-between">
        <CardInfoPortafolio
          title={"Proyectos activos"}
          numPrin={"12"}
          icon={"pi-wallet"}
          numText={""}
          text={"texto 1"}
          link={"portafolio"}
          color={"bg-green-500"}
        />

        <CardInfoPortafolio
          title={"Todos mis Proyectos"}
          numPrin={"19"}
          icon={"pi-inbox"}
          numText={""}
          text={"texto 2"}
          link={"portafolio"}
          color={"bg-blue-500"}
        />
      </div> */}

      <Box sx={{ height: 'calc(70% - 2vh)', marginTop: '2vh' }}>
        <Box sx={{ height: '100%'}}>
          <InvestmentTable />
        </Box>
      </Box>
    </Box>
  );
}
