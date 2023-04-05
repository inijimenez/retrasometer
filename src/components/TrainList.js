import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const TrainList = ({ trains }) => {
  const [selectedTrainId, setSelectedTrainId] = useState(null);
  const [trainRealTimes, setTrainRealTimes] = useState({});
  const selected = false;

  const handleRowClick = (trainId) => {
    setSelectedTrainId(trainId);
  };

  const handleRealTimeUpdate = (trainId, type) => {
    const currentTime = new Date();
    setTrainRealTimes((prevTrainRealTimes) => ({
      ...prevTrainRealTimes,
      [trainId]: { ...prevTrainRealTimes[trainId], [type]: currentTime },
    }));
  };

  const calculateTimeDifference = (estTime, realTime) => {
    const estDateTime = new Date(realTime.getTime());
    const estTimeParts = estTime.split(':');
    estDateTime.setHours(parseInt(estTimeParts[0], 10));
    estDateTime.setMinutes(parseInt(estTimeParts[1], 10));

    const diffInMilliseconds = realTime.getTime() - estDateTime.getTime();
    return Math.floor(diffInMilliseconds / 1000 / 60);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Línea</TableCell>
          <TableCell>Tren</TableCell>
          <TableCell>HoraSalidaEST</TableCell>
          {selected && (
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
        {trains.map((train, index) => {
          const trainRealTimesData = trainRealTimes[train.cdgoTren] || {};
          selected = selectedTrainId === train.cdgoTren;
          const timeDiffSalida = trainRealTimesData.salida
            ? calculateTimeDifference(train.horaSalida, trainRealTimesData.salida)
            : null;
          const timeDiffLlegada = trainRealTimesData.llegada
            ? calculateTimeDifference(train.horaLlegada, trainRealTimesData.llegada)
            : null;
          const durationReal =
            trainRealTimesData.salida && trainRealTimesData.llegada
              ? calculateTimeDifference(
                train.horaLlegada,
                trainRealTimesData.llegada,
              ) -
              calculateTimeDifference(
                train.horaSalida,
                trainRealTimesData.salida,
              )
              : null;

          return (
            <TableRow key={index} onClick={() => handleRowClick(train.cdgoTren)}>
              <TableCell>{train.linea}</TableCell>
              <TableCell>{train.cdgoTren}</TableCell>
              <TableCell>{train.horaSalida}</TableCell>
              <TableCell>
                {selected && timeDiffSalida === null ? (
                  <Button
                    onClick={() =>
                      handleRealTimeUpdate(train.cdgoTren, 'salida')
                    }
                  >
                    Actualizar Hora
                  </Button>
                ) : (
                  selected && (
                    <span
                      style={{
                        color: timeDiffSalida > 0 ? 'red' : 'green',
                      }}
                    >
                      {timeDiffSalida} min
                    </span>
                  )
                )}
              </TableCell>
              <TableCell>{train.horaLlegada}</TableCell>
              <TableCell>
                {
                  selected && timeDiffLlegada === null ? (
                    <Button
                      onClick={() =>
                        handleRealTimeUpdate(train.cdgoTren, 'llegada')
                      }
                    >
                      Actualizar Hora
                    </Button>
                  ) : (
                    selected && (
                      <span
                        style={{
                          color: timeDiffLlegada > 0 ? 'red' : 'green',
                        }}
                      >
                        {timeDiffLlegada} min
                      </span>
                    )
                  )}
              </TableCell>
              <TableCell>{train.duracion}</TableCell>
              <TableCell>
                {selected && durationReal !== null && (
                  <span>{durationReal} min</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TrainList;
