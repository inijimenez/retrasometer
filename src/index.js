import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* Reajuste de estilos y normalización de navegadores */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// Si desea comenzar a medir el rendimiento en su aplicación, pase una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envíelos a un servicio de análisis.
// Más información: https://bit.ly/CRA-vitals
reportWebVitals();