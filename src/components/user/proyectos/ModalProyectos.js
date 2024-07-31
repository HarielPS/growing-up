import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import getColor from "@/themes/colorUtils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { ProgressBar } from "primereact/progressbar";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import Typography from "@mui/material/Typography";
import { Box, width } from "@mui/system";
import { useLocalStorage } from 'primereact/hooks';

export default function MaximizableDemo() {
  const theme = useTheme();
  const borderColor = theme.palette.mode === "dark" ? "#CFCFCF" : "#B2B2B2";
  const boxShadow =
    theme.palette.mode === "dark"
      ? "0 4px 8px rgba(255, 255, 255, 0.2)"
      : "0 4px 8px rgba(0, 0, 0, 0.2)";
  const [visible, setVisible] = useState(false);
  const [walletAddress,setWalletAddress] = useState('');

  useEffect(()=>{
    const actualizarValor = () =>{
      const storedValue = localStorage.getItem('connectedWalletAddress');
      setWalletAddress(storedValue || '--');
    };
    actualizarValor();
    window.addEventListener('storage', actualizarValor);
    return ()=>{
      window.removeEventListener('storage', actualizarValor);
    };
  },[]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "auto",
      }}
    >
      <Card
        sx={{
          background: getColor(theme, "third"),
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          boxShadow,
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="https://imgs.search.brave.com/JgOcQKuOzkHXbwxwGya4Unvsj_TLF3WUanhXjyEx9Ls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuY2RubG9nby5j/b20vbG9nb3MvZi84/MS9mZW1zYS5zdmc"
              alt="Image"
              width="200"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "70%",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="body2" sx={{ fontWeight: "normal" }}>
                Cuenta conectada:
              </Typography>{" "}
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {walletAddress}
              </Typography>{" "}
            </div>
            <div style={{}}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Fomento Economico MExicano S.A de C.V
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "2vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                }}
              >
                <div style={{ height: "50%" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Crecimiento en planta 2-H
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    ID_Proyecto
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    2 Meses
                  </Typography>
                </div>
                <div style={{ height: "50%", marginTop: "1vh" }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "600", color: "#1E5699" }}
                  >
                    Monto a invertir
                  </Typography>
                  <div className="p-inputgroup flex-1" style={{ width: "90%" }}>
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-money-bill"></i>
                    </span>
                    <InputNumber
                      inputId="currency-us"
                      value={23}
                      mode="currency"
                      currency="USD"
                      locale="en-US"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{ display: "column", width: "50%", height: "50%" }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "600", color: "#1E5699" }}
                    >
                      Recaudado
                    </Typography>
                    <InputText
                      style={{ width: "80%" }}
                      disabled
                      placeholder="Disabled"
                      value="50 / 100%"
                    />
                  </div>
                  <div style={{ display: "column", width: "50%" }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "600", color: "#1E5699" }}
                    >
                      Monto maximo
                    </Typography>
                    <InputText
                      disabled
                      placeholder="Disabled"
                      value="$34.34"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
                <div style={{ height: "50%", marginTop: "1vh" }}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "600", color: "#1E5699" }}
                  >
                    Monto estimado a recibir
                  </Typography>
                  <div className="p-inputgroup flex-1" style={{ width: "90%" }}>
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-money-bill"></i>
                    </span>
                    <InputNumber
                      inputId="currency-us"
                      value={23}
                      mode="currency"
                      currency="USD"
                      locale="en-US"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card
        sx={{
          background: getColor(theme, "third"),
          border: `1px solid ${borderColor}`,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          boxShadow,
        }}
        style={{ marginTop: "20px" }}
      >
        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "space-between",
          }}
        >
          <Box sx={{ width: "35%", textAlign: "center" }}>
            <Box sx={{ height: "auto" }}>
              <Typography variant="body2" sx={{ fontWeight: "light" }}>
                Total (send + gas)
              </Typography>
            </Box>
            <Box sx={{ height: "50%" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                $1,234,345
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "65%" }}>
            <Button
              label="Invertir"
              size="large"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{ fontWeight: "light", textAlign: "center", marginTop: "2vh" }}
        >
          Al invertir, confirmas los terminos de uso de Growin-up
        </Typography>
      </Card>
    </div>
  );
}
