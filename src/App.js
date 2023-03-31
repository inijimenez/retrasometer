import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const App = () => {
  const [stations, setStations] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Cargar las estaciones de tren aquí
  }, []);

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const fetchTrains = (event) => {
    event.preventDefault();
    // Obtener horarios de trenes aquí
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Buscador de trenes
      </Typography>
      <form onSubmit={fetchTrains}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Origen</InputLabel>
          <Select
            label="Origen"
            value={origin}
            onChange={handleOriginChange}
          >
            {stations.map((station) => (
              <MenuItem key={station.ID_ESTACION} value={station.ID_ESTACION}>
                {station.DESCRIPCION}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Destino</InputLabel>
          <Select
            label="Destino"
            value={destination}
            onChange={handleDestinationChange}
          >
            {stations.map((station) => (
              <MenuItem key={station.ID_ESTACION} value={station.ID_ESTACION}>
                {station.DESCRIPCION}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '1rem' }}
        >
          Buscar trenes
        </Button>
      </form>
      {trains.length > 0 && (
        <>
          <Typography variant="h6" align="center" sx={{ marginTop: '2rem' }}>
            Horarios de trenes
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Origen</TableCell>
                <TableCell>Destino</TableCell>
                <TableCell>Salida</TableCell>
                <TableCell>Llegada</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trains.map((train, index) => (
                <TableRow key={index}>
                  <TableCell>{origin}</TableCell>
                  <TableCell>{destination}</TableCell>
                  <TableCell>{train.departureTime}</TableCell>
                  <TableCell>{train.arrivalTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default App;
