// colorUtils.js
import { useTheme } from '@mui/material/styles';

const getColor = (theme, colorName) => {
  const customColors = {
    third: theme.palette.mode === 'dark' ? '#929292' : '#ECECEC',
    fourth: theme.palette.mode === 'dark' ? '#444444' : '#FFCC00',
    // Agregar más colores personalizados aquí
  };

  return customColors[colorName] || theme.palette.background.paper;
};

export default getColor;
