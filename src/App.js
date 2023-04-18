import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import StationSelect from "./components/StationSelect";
import TrainList from "./components/TrainList";
import localStations from './stations.json';
import localTrains from './trains.json';

const App = () => {
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
    <Container>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Mi App
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Versión: 1.0.0
      </Typography>
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
    </Container>
  );
};

export default App;
