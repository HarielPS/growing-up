"use client";
import React, { useState, useEffect } from "react";
import CardInfoInicio from "@/components/user/inicio/CardInfoInicio";
import MyResponsivePie from "@/components/grafica/dona";
import MyResponsiveLine from "@/components/grafica/histograma";
import { Box, Grid } from "@mui/material";

const Page = () => {
  const [gridHeight, setGridHeight] = useState('calc(100% - 240px)');

  const updateGridHeight = () => {
    const screenHeight = window.innerHeight;
    if (screenHeight < 600) {
      setGridHeight('100% - 100px'); // Ajuste para pantallas pequeñas
    } else {
      setGridHeight('calc(100% - 240px)'); // Ajuste para pantallas grandes
    }
  };

  useEffect(() => {
    updateGridHeight(); // Establece el valor inicial
    window.addEventListener('resize', updateGridHeight); // Actualiza el valor cuando se redimensiona la ventana
    return () => window.removeEventListener('resize', updateGridHeight);
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100vh'}}>
      <div className="flex flex-wrap justify-between">
        <CardInfoInicio
          title={"Proyectos activos"}
          numPrin={"12"}
          icon={"pi-desktop"}
          numText={""}
          text={"hola"}
          link={"portafolio"}
        />
        <CardInfoInicio
          title={"Proyectos en fondeo"}
          numPrin={"19"}
          icon={"pi-users"}
          numText={""}
          text={"Proyectos financiados"}
          link={"portafolio"}
        />
        <CardInfoInicio
          title={"Proyectos terminados"}
          numPrin={"34"}
          icon={"pi-flag-fill"}
          numText={""}
          text={"Proyectos concluidos, puedes consultarlos en tus proyectos"}
          link={"historial"}
        />
        <CardInfoInicio
          title={"Ganancias totales"}
          numPrin={"3,465"}
          icon={"pi-money-bill"}
          numText={""}
          text={"Ganancias totales de los rendimientos de tu inversion, tomando en cuenta tambien tu capital de inversion"}
          link={"wallet"}
        />
      </div>

      <Grid container spacing={2} sx={{ height: 'calc(100% - 150px)', mt: 2 }}>
        <Grid item xs={12} lg={8} sx={{ height: '100%' }}>
          <Box sx={{ height: '100%', p: 2 }}>
            <MyResponsiveLine />
          </Box>
        </Grid>

        <Grid item xs={12} lg={4} sx={{ height: '100%', mt: { xs: 10, lg: 0 }  }}>
          <Box sx={{ height: '100%', p: 2 }}>
            <MyResponsivePie />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Page;
