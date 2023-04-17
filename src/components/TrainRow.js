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
    <TableRow  onClick={onClick}>
      <TableCell>{data.linea}</TableCell>
      <TableCell>{data.cdgoTren}</TableCell>
      <TableCell>{data.horaSalida}</TableCell>
      <TableCell className={isSelected ? '' : 'hidden'}>
      {!hiddenColumns.D && <TableCell>{data.D}</TableCell>}
        {realDepartureTime ? (
          <span
            style={{
              color: getDifferenceInMinutes(data.horaSalida, realDepartureTime) > 0 ? 'red' : 'green',
            }}
          >
            {getDifferenceInMinutes(train.horaSalida, realDepartureTime)}
          </span>
        ) : (
          <Button onClick={handleDepartureTimeUpdate} variant="contained" color="primary">
            Actualizar Hora
          </Button>
        )}
      </TableCell>
      <TableCell>{train.horaLlegada}</TableCell>
      <TableCell className={isSelected ? '' : 'hidden'}>
        {realArrivalTime ? (
          <span
            style={{
              color: getDifferenceInMinutes(train.horaLlegada, realArrivalTime) > 0 ? 'red' : 'green',
            }}
          >
            {getDifferenceInMinutes(train.horaLlegada, realArrivalTime)}
          </span>
        ) : (
          <Button onClick={handleArrivalTimeUpdate} variant="contained" color="primary">
            Actualizar Hora
          </Button>
        )}
      </TableCell>
      <TableCell>{train.duracion}</TableCell>
      <TableCell className={isSelected ? '' : 'hidden'}>
        {isSelected && realDepartureTime && realArrivalTime && formatDuration(realArrivalTime - realDepartureTime)}
      </TableCell>
    </TableRow>
  );
};

export default TrainRow;
