import React, { useState, useEffect } from "react";
import { Container, Grid, Box } from "@mui/material";
import StationSelect from "./StationSelect";
import TrainList from "./TrainList";
import localStations from '../stations.json';
import localTrains from '../trains.json';
import { ToastProvider } from 'react-toast-notifications';

import { Link } from 'react-router-dom';
import { FaChartBar } from 'react-icons/fa';



// Función para generar un identificador único
const generateUniqueIdentifier = () => {
    // Puedes utilizar alguna lógica personalizada aquí para generar el identificador único
    // Por ejemplo, puedes combinar la fecha actual con un valor aleatorio
    const timestamp = new Date().getTime();
    const randomValue = Math.floor(Math.random() * 10000);
    return `${timestamp}-${randomValue}`;
  };


const HomePage = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [setUniqueIdentifier] = useState('');

  const handleOriginChange = (station) => {
    setOrigin(station);
  };

  const handleDestinationChange = (station) => {
    setDestination(station);
  };

  useEffect(() => {
    // Comprobar si ya existe un identificador único en el almacenamiento local
    const storedIdentifier = localStorage.getItem('uniqueIdentifier');
    if (storedIdentifier) {
      setUniqueIdentifier(storedIdentifier);
    } else {
      // Generar un nuevo identificador único
      const newIdentifier = generateUniqueIdentifier();
      setUniqueIdentifier(newIdentifier);
      // Almacenar el identificador único en el almacenamiento local
      localStorage.setItem('uniqueIdentifier', newIdentifier);
    }

    if (process.env.NODE_ENV === 'development') {      
      console.log("Inicializo datos DEBUG")
      const miLocalStation = {localStations};
      const miLocalTrain = {localTrains};
      localStorage.setItem("stations", JSON.stringify(miLocalStation.localStations));
      localStorage.setItem("trains", JSON.stringify(miLocalTrain.localTrains));
    }
  }, []);
  return (
    <ToastProvider>
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <StationSelect
            label="Estación de origen"
            value={origin}
            onChange={handleOriginChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StationSelect
            label="Estación de destino"
            value={destination}
            onChange={handleDestinationChange}
          />
        </Grid>
      </Grid>
      <Box mt={4}>
      {origin && destination && (
        <TrainList origin={origin} destination={destination} />
      )}
      </Box>
      <Link to="/stats">
  <button>
    <FaChartBar />
  </button>
</Link>
    </Container>
    </ToastProvider>
  );
};

export default HomePage;
