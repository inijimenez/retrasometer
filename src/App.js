import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import StationSelect from './components/StationSelect';
import TrainList from './components/TrainList';

const App = () => {
  const [selectedStations, setSelectedStations] = useState({
    origin: null,
    destination: null,
  });

  const handleStationChange = (type, station) => {
    setSelectedStations((prevState) => ({
      ...prevState,
      [type]: station,
    }));
  };

  const isSearchEnabled = () => {
    return selectedStations.origin && selectedStations.destination;
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Retrasometer
        </Typography>
        <Typography variant="subtitle1">
          Versión 1.0.0
        </Typography>
        <StationSelect
          selectedStations={selectedStations}
          onStationChange={handleStationChange}
        />
        {isSearchEnabled() && (
          <TrainList
            origin={selectedStations.origin}
            destination={selectedStations.destination}
          />
        )}
      </Box>
    </Container>
  );
};

export default App;
