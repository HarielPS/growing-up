"use client";
import React, { useEffect, useState } from 'react';
import CardFinance from '@/components/card/Card';
import { Box } from '@mui/system';
import { db } from '../../../../../firebase'; // Adjust import path if necessary

export default function Page() {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc = await db.collection('proyecto').doc('5N4YczgrBsGqkSa5QrXu').get();
        if (doc.exists) {
          let data = doc.data();
          
          // Fetch the image URL and name from the referenced empresa document
          if (data.empresa) {
            const empresaDoc = await data.empresa.get();
            if (empresaDoc.exists) {
              data = {
                ...data,
                imagen_solicitud: empresaDoc.data().logo,
                empresa: empresaDoc.data().nombre,
              };
            }
          }

          // Fetch each category name from the referenced category documents
          if (data.categoria && Array.isArray(data.categoria)) {
            const categoryNames = await Promise.all(data.categoria.map(async (catRef) => {
              const catDoc = await catRef.get();
              return catDoc.exists ? catDoc.data().nombre : "Unknown";
            }));
            data = { ...data, categoria: categoryNames };
          }

          setProjectData(data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!projectData) {
    return <div>No data found</div>;
  }

  return (
    <Box>
      <h1>Clientes</h1>
      <CardFinance 
        imageSrc={projectData.imagen_solicitud}
        projectTitle={projectData.titulo}
        companyName={projectData.empresa}
        completedProjects={projectData.estado_proyecto}
        location={projectData.ubicacion}
        duration="1 Mes"
        amountRaised={projectData.monto_recaudado}
        percentageRaised={((projectData.monto_recaudado / projectData.monto_pedido) * 100).toFixed(2)}
        tokenYield={`${projectData.rendimiento} / token`}
        tags={projectData.categoria}
        description={projectData.descripcion}
      />
    </Box>
  );
}
