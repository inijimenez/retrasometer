import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const TrainList = ({ trains }) => {
  const [selectedTrainIndex, setSelectedTrainIndex] = useState(null);
  const [realTimes, setRealTimes] = useState({});

  const updateRealTime = (type, trainIndex) => {
    const currentTime = new Date();
    const minutes = currentTime.getMinutes();
    const hours = currentTime.getHours();
    const realTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    setRealTimes(prevRealTimes => ({
      ...prevRealTimes,
      [trainIndex]: {
        ...prevRealTimes[trainIndex],
        [type]: realTime
      }
    }));
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Línea</TableCell>
            <TableCell>Tren</TableCell>
            <TableCell>HoraSalidaEST</TableCell>
            {selectedTrainIndex !== null && (
              <>
                <TableCell>HoraSalidaREAL</TableCell>
                <TableCell>HoraLlegadaEST</TableCell>
                <TableCell>HoraLlegadaREAL</TableCell>
                <TableCell>DuracionEST</TableCell>
                <TableCell>DuracionREAL</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {trains.map((train, index) => (
            <TableRow key={index} onClick={() => setSelectedTrainIndex(index)}>
              <TableCell>{train.linea}</TableCell>
              <TableCell>{train.cdgoTren}</TableCell>
              <TableCell>{train.horaSalida}</TableCell>
              {selectedTrainIndex === index && (
                <>
                  <TableCell>
                    {realTimes[index]?.HoraSalidaREAL ? (
                      realTimes[index].HoraSalidaREAL
                    ) : (
                      <Button onClick={() => updateRealTime('HoraSalidaREAL', index)}>Actualizar Hora</Button>
                    )}
                  </TableCell>
                  <TableCell>{train.horaLlegada}</TableCell>
                  <TableCell>
                    {realTimes[index]?.HoraLlegadaREAL ? (
                      realTimes[index].HoraLlegadaREAL
                    ) : (
                      <Button onClick={() => updateRealTime('HoraLlegadaREAL', index)}>Actualizar Hora</Button>
                    )}
                  </TableCell>
                  <TableCell>{train.duracion}</TableCell>
                  <TableCell>
                    {realTimes[index]?.HoraSalidaREAL && realTimes[index]?.HoraLlegadaREAL
                      ? /* Calcular y mostrar la diferencia de tiempo aquí */
                      : '-'}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrainList;
