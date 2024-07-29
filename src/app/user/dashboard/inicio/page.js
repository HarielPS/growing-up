import React from "react";
// import { Card } from "primereact/card";
import styles from "../../../../components/user/inicio/inicio.module.css";
import CardInfoInicio from "@/components/user/inicio/CardInfoInicio";
import ChartTest from "../../../../components/user/inicio/ChartTest";
import ChartTest2 from "@/components/user/inicio/ChartTest2";
import MyResponsivePie from "@/components/grafica/dona";
import MyResponsiveLine from "@/components/grafica/histograma";

export default function Page() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className="flex flex-wrap justify-between">
        <CardInfoInicio
          title={"Proyectos activos"}
          numPrin={"12"}
          icon={"pi-desktop"}
          numText={""}
          text={""}
          link={"portafolio"}
        />
        <CardInfoInicio
          title={"Proyectos en fondeo"}
          numPrin={"19"}
          icon={"pi-users"}
          numText={""}
          text={""}
          link={"portafolio"}
        />
        <CardInfoInicio
          title={"Proyectos terminados"}
          numPrin={"34"}
          icon={"pi-flag-fill"}
          numText={""}
          text={""}
          link={"historial"}
        />
        <CardInfoInicio
          title={"Ganancias totales"}
          numPrin={"3,465"}
          icon={"pi-money-bill"}
          numText={""}
          text={""}
          link={"wallet"}
        />
      </div>

      <div className="flex flex-wrap" style={{ height: "calc(100% - 240px)" }}>
        <div className="w-full lg:w-1/2 p-2 h-full">
          <div className="h-full p-3 font-bold  flex items-center justify-center overflow-hidden">
            <MyResponsiveLine />
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-2 h-full">
          <div className="h-full p-3 font-bold  flex items-center justify-center overflow-hidden">
            {/* <ChartTest /> */}
            <MyResponsivePie />
          </div>
        </div>
      </div>

      <div style={{ width: '100%', marginTop: '20px' }}>
        <MyResponsivePie />
      </div>
    </div>
  );
}
