// theme.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Azul claro
    },
    secondary: {
      main: '#dc004e', // Rojo
    },
    background: {
      default: '#f5f5f5', // Fondo claro
      paper: '#ffffff', // Fondo de papel
    },
    text: {
      primary: '#000000', // Texto negro
      secondary: '#757575', // Texto gris
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', // Desactivar mayúsculas automáticas en botones
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Azul claro
    },
    secondary: {
      main: '#f48fb1', // Rosa claro
    },
    background: {
      default: '#303030', // Fondo oscuro
      paper: '#424242', // Fondo de papel
    },
    text: {
      primary: '#ffffff', // Texto blanco
      secondary: '#bdbdbd', // Texto gris claro
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', // Desactivar mayúsculas automáticas en botones
    },
  },
});
