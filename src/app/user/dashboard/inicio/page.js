"use client";
import React, { useState, useEffect } from "react";
import CardInfoInicio from "@/components/user/inicio/CardInfoInicio";
import MyResponsivePie from "@/components/grafica/pastel";
import MyResponsiveLine from "@/components/grafica/histograma";
import { Box, Grid } from "@mui/material";
import MyResponsiveBar from "@/components/grafica/barras";
import { display } from "@mui/system";

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
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Box sx={{ height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ height: '100%', width: '100%' }}>
          <MyResponsiveLine />
        </Box>
      </Box>
      <div className="flex flex-wrap justify-between mt-8">
        <CardInfoInicio
          title={"Proyectos activos"}
          numPrin={"12"}
          icon={"pi-wallet"}
          numText={""}
          text={"Número de proyectos en los que actualmente has invertido y estas generando ganancias"}
          link={"portafolio"}
          color={"bg-green-500"}
        />
        <CardInfoInicio
          title={"Proyectos en fondeo"}
          numPrin={"19"}
          icon={"pi-users"}
          numText={""}
          text={"Número de proyectos que has invertido pero estan en progreso de fondeo en este momento"}
          link={"portafolio"}
        />
        <CardInfoInicio
          title={"Proyectos terminados"}
          numPrin={"34"}
          icon={"pi-flag-fill"}
          numText={""}
          text={"Cantidad de proyectos que han sido completados y ya generan ganancias"}
          link={"historial"}
          color={"bg-gray-900"}
        />
        <CardInfoInicio
          title={"Ganancias totales"}
          numPrin={"3,465"}
          icon={"pi-money-bill"}
          numText={""}
          text={"Ganancias acumuladas de todas las inversiones realizadas a través de la plataforma."}
          link={"wallet"}
          color={"bg-yellow-500"}
        />
      </div>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', height: 'calc(100% - 150px)', mt: 2 }}>
        <Box sx={{ height: '100%', width: { xs: '100%', md: '50%' } }}>
          <MyResponsiveBar />
        </Box>

        <Box sx={{ height: '100%', width: { xs: '100%', md: '50%' }, mt: { xs: 10, md: 0 } }}>
          <MyResponsivePie />
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
