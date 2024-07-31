import React from "react";
import CardInfoPortafolio from "@/components/user/portafolio/CardInfoPortafolio";
import TablaPortafolio from "@/components/user/portafolio/TablaPortafolio";
import { Box } from "@mui/system";
import InvestmentTable from "@/components/user/portafolio/tabla";

export default function Page() {
  return (
    <Box sx={{ width: '100%', height: '100vh'}}>
      <div className="flex flex-row justify-between">
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

        {/* <div className="col-12 md:col-6 lg:col-2"></div> */}
      </div>
      <div className="grid h-[calc(100%-240px)]">
        <div className="col-12 h-full">
          <div className="text-center border-round-sm bg-white font-bold h-full flex items-center justify-center overflow-hidden">
            <div className="h-full w-full pt-5">
              <InvestmentTable />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
