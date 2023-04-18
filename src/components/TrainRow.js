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
      <TableCell>{data.linea}</TableCell>
      <TableCell>{data.cdgoTren}</TableCell>
      <TableCell>{data.horaSalida}</TableCell>
      {!hiddenColumns.D && <TableCell>
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
      <TableCell>{data.horaLlegada}</TableCell>
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
      <TableCell>{data.duracion}</TableCell>
      {!hiddenColumns.H && <TableCell>
        {realDepartureTime && realArrivalTime && formatDuration(realArrivalTime - realDepartureTime)}
      </TableCell>}
      {!hiddenColumns.I && <TableCell>
        Duración Total
      </TableCell>}

    </TableRow>
  );
};

export default TrainRow;
