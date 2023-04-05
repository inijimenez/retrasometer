import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid} from '@mui/material';
import StationSelect from './components/StationSelect';
import TrainList from './components/TrainList';
import { fetchStations, fetchTrains } from './api/renfeApi';

const App = () => {
  const [stations, setStations] = useState([]);
  const [originStation, setOriginStation] = useState(null);
  const [destinationStation, setDestinationStation] = useState(null);
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const loadStations = async () => {
      const fetchedStations = await fetchStations();
      setStations(fetchedStations);
    };
    loadStations();
  }, []);

  useEffect(() => {
    const loadTrains = async () => {
      if (originStation && destinationStation) {
        console.log("Antes loadTrains:" + originStation.CÓDIGO + "," + destinationStation.CÓDIGO);
        const fetchedTrains = await fetchTrains(originStation, destinationStation);
        console.log("Después loadTrains:" + originStation.CÓDIGO + "," + destinationStation.CÓDIGO);        
        setTrains(fetchedTrains);
      }
    };
    loadTrains();
  }, [originStation, destinationStation]);

  return (
    <Container>
      <Typography variant="h4" align="center">
        Retrasometer
      </Typography>
      <Typography variant="h6" align="center">
        Versión 1.0
      </Typography>
    
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <StationSelect
            stations={stations}
            label="Estación de origen"
            value={originStation}
            onChange={setOriginStation}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StationSelect
            stations={stations}
            label="Estación de destino"
            value={destinationStation}
            onChange={setDestinationStation}
          />
        </Grid>
      </Grid>
      {trains.length > 0 ? (
        <TrainList trains={trains}  resetKey={`${originStation}-${destinationStation}`} />
      ) : (
        <Typography variant="subtitle1" align="center">
          No se ha encontrado ningún tren.
        </Typography>
      )}
    </Container>
  );
};

export default App;
