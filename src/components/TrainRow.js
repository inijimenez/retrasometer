import React, { useState } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { formatDuration, getDifferenceInMinutes } from '../helpers';

const TrainRow = ({ data, hiddenColumns, visible, onClick }) => {
  const [realDepartureTime, setRealDepartureTime] = useState(null);
  const [realArrivalTime, setRealArrivalTime] = useState(null);
  const [realDepartureTimeDiff, setRealDepartureTimeDiff] = useState(null);
  const [realArrivalTimeDiff, setRealArrivalTimeDiff] = useState(null);



  const handleDepartureTimeUpdate = () => {
    const realTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    setRealDepartureTime(realTime);
    setRealDepartureTimeDiff(getDifferenceInMinutes(data.horaSalida, realTime))
  };

  const handleArrivalTimeUpdate = () => {
    const realTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    setRealArrivalTime(realTime);
    setRealArrivalTimeDiff(getDifferenceInMinutes(data.horaLlegada, realTime))
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
          <span>
            {realDepartureTime}
            <span
              style={{
                color: realDepartureTimeDiff > 0 ? 'red' : 'green',
              }}
            >
              {'(' + realDepartureTimeDiff + 'min)'}
            </span>
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
          <span>
            {realArrivalTime}
          <span
            style={{
              color: realArrivalTimeDiff > 0 ? 'red' : 'green',
            }}
          >
            {'(' + realArrivalTimeDiff + 'min)'}
          </span>
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
