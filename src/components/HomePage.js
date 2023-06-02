import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import StationSelect from "./StationSelect";
import TrainList from "./TrainList";
import localStations from '../stations.json';
import localTrains from '../trains.json';
import { ToastProvider } from 'react-toast-notifications';

import { Link } from 'react-router-dom';
import { FaChartBar } from 'react-icons/fa';

const HomePage = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleOriginChange = (station) => {
    setOrigin(station);
  };

  const handleDestinationChange = (station) => {
    setDestination(station);
  };

  useEffect(() => {
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
