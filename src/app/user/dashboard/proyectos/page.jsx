"use client";
import React, { useEffect, useState } from 'react';
import CardFinance from '@/components/card/Card';
import { Box, Button, Typography } from '@mui/material';
import { db } from '../../../../../firebase'; // Adjust import path if necessary
import { formatDistanceToNow } from 'date-fns';

const ITEMS_PER_PAGE = 3;

export default function Page() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = async (page) => {
    setLoading(true);
    const offset = (page - 1) * ITEMS_PER_PAGE;
    try {
      const querySnapshot = await db.collection('proyecto')
        .orderBy('fecha_solicitud')
        .startAt(offset)
        .limit(ITEMS_PER_PAGE)
        .get();
      
      const totalCount = await db.collection('proyecto').get().then(snapshot => snapshot.size);
      setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));

      const projectPromises = querySnapshot.docs.map(async (doc) => {
        let data = doc.data();
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
        if (data.categoria && Array.isArray(data.categoria)) {
          const categoryNames = await Promise.all(data.categoria.map(async (catRef) => {
            const catDoc = await catRef.get();
            return catDoc.exists ? catDoc.data().nombre : "Unknown";
          }));
          data = { ...data, categoria: categoryNames };
        }
        const fechaSolicitudDate = data.fecha_solicitud.toDate();
        data.timeAgo = formatDistanceToNow(fechaSolicitudDate, { addSuffix: true });
        return data;
      });

      const projectData = await Promise.all(projectPromises);
      setProjects(projectData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("se cargo el componente");
    fetchProjects(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <h1>Clientes</h1>
      {projects.map((project, index) => (
        <CardFinance 
          key={index}
          imageSrc={project.imagen_solicitud}
          projectTitle={project.titulo}
          companyName={project.empresa}
          completedProjects={project.estado_proyecto}
          location={project.ubicacion}
          duration={project.timeAgo} // Pass the calculated time ago
          amountRaised={project.monto_recaudado}
          percentageRaised={((project.monto_recaudado / project.monto_pedido) * 100).toFixed(2)}
          tokenYield={`${project.rendimiento} / token`}
          tags={project.categoria}
          description={project.descripcion}
        />
      ))}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
        <Typography>Page {currentPage} of {totalPages}</Typography>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
      </Box>
    </Box>
  );
}
