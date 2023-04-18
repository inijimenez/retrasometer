import React, { useState } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { formatDuration, getDifferenceInMinutes } from '../helpers';

const TrainRow = ({ data, hiddenColumns, visible, onClick }) => {
  const [realDepartureTime, setRealDepartureTime] = useState(null);
  const [realArrivalTime, setRealArrivalTime] = useState(null);

  const handleDepartureTimeUpdate = () => {
    setRealDepartureTime(new Date());
  };

  const handleArrivalTimeUpdate = () => {
    setRealArrivalTime(new Date());
  };

  if (!visible) {
    return null;
  }

  return (
    <TableRow onClick={onClick}>
      <TableCell align="center">{data.linea}</TableCell>
      <TableCell align="center">{data.cdgoTren}</TableCell>
      <TableCell align="center">{data.horaSalida}</TableCell>
      {!hiddenColumns.D && <TableCell align="center">
        {realDepartureTime ? (
          <span
            style={{
              color: getDifferenceInMinutes(data.horaSalida, realDepartureTime) > 0 ? 'red' : 'green',
            }}
          >
            {getDifferenceInMinutes(data.horaSalida, realDepartureTime)}
          </span>
        ) : (
          <Button onClick={handleDepartureTimeUpdate} variant="contained" color="primary">
            Actualizar Hora
          </Button>
        )}
      </TableCell>}
      <TableCell align="center">{data.horaLlegada}</TableCell>
      {!hiddenColumns.F && <TableCell>
        {realArrivalTime ? (
          <span
            style={{
              color: getDifferenceInMinutes(data.horaLlegada, realArrivalTime) > 0 ? 'red' : 'green',
            }}
          >
            {getDifferenceInMinutes(data.horaLlegada, realArrivalTime)}
          </span>
        ) : (
          <Button onClick={handleArrivalTimeUpdate} variant="contained" color="primary">
            Actualizar Hora
          </Button>
        )}

      </TableCell>}
      <TableCell align="center">{data.duracion}</TableCell>
      {!hiddenColumns.H && <TableCell align="center">
        {realDepartureTime && realArrivalTime && formatDuration(realArrivalTime - realDepartureTime)}
      </TableCell>}
      {!hiddenColumns.I && <TableCell align="center">
        Duración Total
      </TableCell>}

    </TableRow>
  );
};

export default TrainRow;
