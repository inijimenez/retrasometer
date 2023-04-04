import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { getTrains } from '../api/renfeApi';

const TrainList = ({ origin, destination }) => {
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      const fetchedTrains = await getTrains(origin, destination);
      setTrains(fetchedTrains);
    };
    fetchTrains();
  }, [origin, destination]);

  const handleRowClick = (train) => {
    setSelectedTrain(train);
  };

  const handleUpdateSalida = () => {
    // Actualizar HoraSalida (REAL) en función de la hora actual
    const horaActual = new Date();
    const horaSalidaEst = new Date(horaActual.getTime());
    horaSalidaEst.setHours(...selectedTrain.horaSalida.split(':'));
    const diffMinutos = Math.round((horaActual - horaSalidaEst) / (1000 * 60));

    setHoraSalidaReal(horaActual);
    setDiferenciaSalida(diffMinutos);
  };

  const handleUpdateLlegada = () => {
    // Actualizar HoraLlegada (REAL) en función de la hora actual
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Línea</TableCell>
              <TableCell>Tren</TableCell>
              <TableCell>Hora salida (EST)</TableCell>
              {selectedTrain && (
                <>
                  <TableCell>Hora salida (REAL)</TableCell>
                  <TableCell>Hora llegada (EST)</TableCell>
                  <TableCell>Hora llegada (REAL)</TableCell>
                  <TableCell>Duración (EST)</TableCell>
                  <TableCell>Duración (REAL)</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {trains.map((train) => {
              if (!selectedTrain || selectedTrain.cdgoTren === train.cdgoTren) {
                return (
                  <TableRow key={train.cdgoTren} onClick={() => handleRowClick(train)}>
                    <TableCell>{train.linea}</TableCell>
                    <TableCell>{train.cdgoTren}</TableCell>
                    <TableCell>{train.horaSalida}</TableCell>
                    {selectedTrain && selectedTrain.cdgoTren === train.cdgoTren && (
                      <>
                        <TableCell>
                          <Button onClick={handleUpdateSalida}>Actualizar Hora</Button>
                        </TableCell>
                        <TableCell>{train.horaLlegada}</TableCell>
                        <TableCell>
                          <Button onClick={handleUpdateLlegada}>Actualizar Hora</Button>
                        </TableCell>
                        <TableCell>{train.duracion}</TableCell>
                        <TableCell>-</TableCell>
                      </>
                    )}
                  </TableRow>
                );
              }
              return null;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TrainList;
