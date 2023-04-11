import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import StationSelect from './components/StationSelect';
import TrainList from './components/TrainList';
import { fetchStations, fetchTrains } from './api/renfeApi';
import './styles/styles.css';

const App = () => {
  const [stations, setStations] = useState([]);
  const [originStation, setOriginStation] = useState(null);
  const [destinationStation, setDestinationStation] = useState(null);
  const [trains, setTrains] = useState([]);
  const [stationsChanged, setStationsChanged] = useState(false);
  const [isLoadingStations, setIsLoadingStations] = useState(false);
  const [isLoadingTrains, setIsLoadingTrains] = useState(false);

  useEffect(() => {
    const loadStations = async () => {
      setIsLoadingStations(true); // Establecer isLoading en true antes de la llamada a la API
      const fetchedStations = await fetchStations();
      setStations(fetchedStations);
      setIsLoadingStations(false); // Establecer isLoading en false antes de la llamada a la API
    };
    loadStations();
  }, []);

  useEffect(() => {
    const loadTrains = async () => {
      if (originStation && destinationStation) {
        setIsLoadingTrains(true); // Establecer isLoading en true antes de la llamada a la API
        //console.log("Antes loadTrains:" + originStation.CÓDIGO + "," + destinationStation.CÓDIGO);
        const fetchedTrains = await fetchTrains(originStation, destinationStation);
        //console.log("Después loadTrains:" + originStation.CÓDIGO + "," + destinationStation.CÓDIGO);        
        setTrains(fetchedTrains);
        setIsLoadingTrains(false); // Establecer isLoading en false despues de la llamada a la API
      }
    };
    loadTrains();
  }, [originStation, destinationStation]);

  useEffect(() => {
    setStationsChanged(true);
  }, [originStation, destinationStation]);

  return (
    <Container>
      <Typography variant="h4" align="center">
        Retrasometer
      </Typography>
      <Typography variant="h6" align="center">
        Versión 1.0
      </Typography>
      {isLoadingStations ? (
        <Typography variant="subtitle1" align="center">
          Cargando datos estaciones...
        </Typography>
      ) : (
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
      )}
      {isLoadingTrains ? (                
          <Typography variant="subtitle1" align="center">
            Cargando datos trayectos...
          </Typography>
      ) : (
        trains.length > 0 ? (
          <TrainList trains={trains} stationsChanged={stationsChanged} resetStationsChanged={() => setStationsChanged(false)} />
        ) : (
        <div></div>
        )
      )}
    </Container>
  );
};

export default App;
