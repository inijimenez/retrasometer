import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { getStations } from '../api/renfeApi';

const Form = ({ onFormSubmit }) => {
  const [stations, setStations] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    async function fetchStations() {
      console.log("fethstations");
      const fetchedStations = await getStations();
      setStations(fetchedStations);
    }

    fetchStations();
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(origin, destination);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          RetrasoMeter
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel>Estación de origen</InputLabel>
            <Select
              label="Estación de origen"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              {stations.map((station) => (
                <MenuItem key={station.CÓDIGO} value={station.CÓDIGO}>
                  {station.DESCRIPCION}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel>Estación de destino</InputLabel>
            <Select
              label="Estación de destino"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              {stations.map((station) => (
                <MenuItem key={station.CÓDIGO} value={station.CÓDIGO}>
                  {station.DESCRIPCION}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={4}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Buscar trenes
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Form;
