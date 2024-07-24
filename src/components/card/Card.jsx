"use client";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Image } from 'primereact/image';
import { Box } from '@mui/system';

import EventNoteIcon from '@mui/icons-material/EventNote';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function CardFinance({
  imageSrc,
  projectTitle,
  companyName,
  completedProjects,
  location,
  duration,
  amountRaised,
  percentageRaised,
  tokenYield,
  tags,
  description
}) {
  const theme = useTheme();
  const borderColor = theme.palette.mode === 'dark' ? '#CFCFCF' : '#B2B2B2';
  const boxShadow = theme.palette.mode === 'dark' ? '0 4px 8px rgba(255, 255, 255, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.2)';

  return (
    <Card sx={{ border: `1px solid ${borderColor}`, borderRadius: '8px', display: 'flex', flexDirection: 'column', boxShadow }}>
      <Box sx={{ paddingTop: '5vh', display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '80%', paddingLeft: '2vh' }}>
          <div style={{ border: `1px solid ${borderColor}`, borderRadius: '10%', overflow: 'hidden', width: '200px', height: '200px', boxShadow }}>
            <Image 
              src={imageSrc} 
              alt={`${companyName} Logo`} 
              width={200} 
              height={200} 
            />
          </div>

          <Box sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '5%', }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold',}}>
              {projectTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{display:'flex', alignItems:'center', marginTop:'2vh'}}>
              <AccountCircleIcon sx={{marginRight:'10px'}}/>
              <span style={{ fontWeight: 'bold' }}>{companyName}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{display:'flex', alignItems:'center', marginTop:'2vh'}}>
              <EventNoteIcon sx={{marginRight:'10px'}}/>
              <span style={{ fontWeight: 'bold' }}>{completedProjects} Proyectos completados</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{display:'flex', alignItems:'center', marginTop:'1vh'}}>
              <LocationOnIcon sx={{marginRight:'10px'}}/>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {location}
              </span>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{display:'flex', alignItems:'center', marginTop:'1vh'}}>
              <ScheduleIcon sx={{marginRight:'10px'}}/>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {duration}
              </span>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', paddingRight: '5vh' }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', textAlign: 'right' }}>
            ${amountRaised}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
            Recaudado: {percentageRaised}%
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
            Rendimiento {tokenYield} / token
          </Typography>
        </Box>
      </Box>

      <CardContent>
        <div style={{ marginTop: '16px' }}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" sx={{ margin: '2px', border: '1px solid #E0E0E0' }} />
          ))}
        </div>

        <Typography variant="body2" color="text.secondary" sx={{ marginTop: '16px' }}>
          {description}
        </Typography>
      </CardContent>

      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '30px', marginBottom: '30px' }}>
        <Button variant="contained" color="primary" sx={{ borderRadius: '8px', boxShadow }}>
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
}
