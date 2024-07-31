"use client";
import React, { useEffect, useState } from 'react';
import CardFinance from '@/components/card/Card';
import { Box, Typography, Pagination } from '@mui/material';
import { db } from '../../../../../firebase'; // Adjust import path if necessary
import { formatDistanceToNow } from 'date-fns';
import Loading from '@/components/loading/loading';
import ModalProyectos from '@/components/user/proyectos/ModalProyectos';
import { Dialog } from "primereact/dialog";


const ITEMS_PER_PAGE = 5;

export default function Page() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalVisible, setModalVisible] = useState(true);

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <Dialog
        header="Invertir capital en una empresa"
        visible={modalVisible}
        maximizable
        style={{ width: "auto",backgroundColor:'#000' }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        onHide={() => {
          if (!modalVisible) return;
          setModalVisible(false);
        }}
      >
        <ModalProyectos />
      </Dialog>
      <h1>Clientes</h1>
      {projects.map((project, index) => (
        <Box key={index} sx={{ paddingY: '3vh' }}>
          <CardFinance
            imageSrc={project.imagen_solicitud}
            projectTitle={project.titulo}
            companyName={project.empresa}
            completedProjects={project.estado_proyecto}
            location={project.ubicacion}
            duration={project.timeAgo}
            amountRaised={project.monto_recaudado}
            percentageRaised={((project.monto_recaudado / project.monto_pedido) * 100).toFixed(2)}
            tokenYield={`${project.rendimiento} / token`}
            tags={project.categoria}
            description={project.descripcion}
          />
        </Box>
      ))}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>
    </Box>
  );
}
