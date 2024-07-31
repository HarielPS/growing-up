// colorUtils.js
import { useTheme } from '@mui/material/styles';

const getColor = (theme, colorName) => {
  const customColors = {
    shadow: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    third: theme.palette.mode === 'dark' ? '#929292' : '#ECECEC',
    fourth: theme.palette.mode === 'dark' ? '#444444' : '#FFCC00',
    fifth: theme.palette.mode === 'dark' ? '#333333' : '#ffffff',
    six: theme.palette.mode === 'dark' ? '#333333' : '#ebebeb',
    head: theme.palette.mode === 'dark' ? '#121212' : '#eaeaea',

    // Agregar más colores personalizados aquí
  };

  return customColors[colorName] || theme.palette.background.paper;
};

export default getColor;
