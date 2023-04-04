import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getTrains } from '../api/renfeApi';

const TrainList = ({ origin, destination }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      const fetchedTrains = await getTrains(origin, destination);
      setTrains(fetchedTrains);
    };
    fetchTrains();
  }, [origin, destination]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Línea</TableCell>
              <TableCell>Tren</TableCell>
              <TableCell>Hora salida (EST)</TableCell>
              <TableCell>Hora salida (REAL)</TableCell>
              <TableCell>Hora llegada (EST)</TableCell>
              <TableCell>Hora llegada (REAL)</TableCell>
              <TableCell>Duración (EST)</TableCell>
              <TableCell>Duración (REAL)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trains.map((train) => (
              <TableRow key={train.cdgoTren}>
                <TableCell>{train.linea}</TableCell>
                <TableCell>{train.cdgoTren}</TableCell>
                <TableCell>{train.horaSalida}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{train.horaLlegada}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{train.duracion}</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TrainList;
