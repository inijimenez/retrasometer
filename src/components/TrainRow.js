import React, { useState } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { formatDuration, getDifferenceInMinutes } from '../helpers';

const TrainRow = ({ train, isSelected, onRowClick }) => {
  const [realDepartureTime, setRealDepartureTime] = useState(null);
  const [realArrivalTime, setRealArrivalTime] = useState(null);

  const handleDepartureTimeUpdate = () => {
    setRealDepartureTime(new Date());
  };

  const handleArrivalTimeUpdate = () => {
    setRealArrivalTime(new Date());
  };

  return (
    <TableRow onClick={onRowClick} selected={isSelected}>
      <TableCell>{train.linea}</TableCell>
      <TableCell>{train.cdgoTren}</TableCell>
      <TableCell>{train.horaSalida}</TableCell>
      <TableCell style={{ display: isSelected ? "" : "none" }}>
        {realDepartureTime ? (
          <span
            style={{
              color: getDifferenceInMinutes(train.horaSalida, realDepartureTime) > 0 ? 'red' : 'green',
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
      <TableCell style={{ display: isSelected ? "" : "none" }}>
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
      <TableCell style={{ display: isSelected ? "" : "none" }}>
        {isSelected && realDepartureTime && realArrivalTime && formatDuration(realArrivalTime - realDepartureTime)}
      </TableCell>
    </TableRow>
  );
};

export default TrainRow;
