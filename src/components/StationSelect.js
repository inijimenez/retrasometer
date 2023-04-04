import React from 'react';
import { Autocomplete, TextField, Box, Button } from '@mui/material';
import { getStations } from '../api/renfeApi';

const StationSelect = ({ selectedStations, onStationChange }) => {
  const [stations, setStations] = React.useState([]);

  React.useEffect(() => {
    const fetchStations = async () => {
      const fetchedStations = await getStations();
      setStations(fetchedStations);
    };
    fetchStations();
  }, []);

  return (
    <Box>
      <Autocomplete
        options={stations}
        getOptionLabel={(option) => option.DESCRIPCION}
        value={selectedStations.origin}
        onChange={(event, newValue) => onStationChange('origin', newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Estación de origen" variant="outlined" />
        )}
      />
      <Autocomplete
        options={stations}
        getOptionLabel={(option) => option.DESCRIPCION}
        value={selectedStations.destination}
        onChange={(event, newValue) => onStationChange('destination', newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Estación de destino" variant="outlined" />
        )}
      />
    </Box>
  );
};

export default StationSelect;
