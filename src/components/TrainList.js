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
  const [departureDifference, setDepartureDifference] = useState(null);
  const [arrivalDifference, setArrivalDifference] = useState(null);

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
    const now = new Date();
    const salidaEst = new Date(now.toDateString() + ' ' + selectedTrain.horaSalida);
    const diff = Math.floor((now - salidaEst) / 60000); // Diferencia en minutos
    setSalidaReal(now);
    setDiffSalidaReal(diff);
  };

  const handleUpdateLlegada = () => {
    // Actualizar HoraLlegada (REAL) en función de la hora actual
    const now = new Date();
    const llegadaEst = new Date(now.toDateString() + ' ' + selectedTrain.horaLlegada);
    const diff = Math.floor((now - llegadaEst) / 60000); // Diferencia en minutos
    setLlegadaReal(diff);
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
                        {salidaReal !== null ? (
                            salidaReal + ' min'
                          ) : (
                            <Button onClick={handleUpdateSalida}>Actualizar Hora</Button>
                          )}
                        </TableCell>
                        <TableCell>{train.horaLlegada}</TableCell>
                        <TableCell>
                        {llegadaReal !== null ? (
                            llegadaReal + ' min'
                          ) : (
                            <Button onClick={handleUpdateLlegada}>Actualizar Hora</Button>
                          )}
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
