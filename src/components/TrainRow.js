import React, { useState } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { getDifferenceInMinutes } from '../helpers';

const TrainRow = ({ data, hiddenColumns, visible, onClick }) => {
  const [realDepartureTime, setRealDepartureTime] = useState(null);
  const [realArrivalTime, setRealArrivalTime] = useState(null);
  const [realDuration, setRealDuration] = useState(null);

  const [realDepartureTimeDiff, setRealDepartureTimeDiff] = useState(null);
  const [realArrivalTimeDiff, setRealArrivalTimeDiff] = useState(null);
  const [realDurationDiff, setRealDurationDiff] = useState(null);
  const [totalDelay, setTotalDelay] = useState(null);



  const handleDepartureTimeUpdate = () => {
    const realTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    setRealDepartureTime(realTime);
    setRealDepartureTimeDiff(getDifferenceInMinutes(data.horaSalida, realTime))
  };

  const handleArrivalTimeUpdate = () => {
    const realTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    setRealArrivalTime(realTime);
    setRealArrivalTimeDiff(getDifferenceInMinutes(data.horaLlegada, realTime))
    if (realDepartureTime) {
      const realDurationA = getDifferenceInMinutes(realDepartureTime, realTime);
      const estDurationA = getDifferenceInMinutes(data.horaSalida, data.horaLlegada);
      setRealDuration(realDurationA)
      setRealDurationDiff(realDurationA - estDurationA)
      setTotalDelay(getDifferenceInMinutes(data.horaSalida, realTime));
    }
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
            {realDepartureTime}&nbsp;
            <span
              style={{
                color: realDepartureTimeDiff > 0 ? 'red' : 'green',
              }}
            >
              {'(' + realDepartureTimeDiff + 'min.)'}
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
            {realArrivalTime}&nbsp;
            <span
              style={{
                color: realArrivalTimeDiff > 0 ? 'red' : 'green',
              }}
            >
              {'(' + realArrivalTimeDiff + 'min.)'}
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
        {realDepartureTime ? (
          <span>
            {realDuration}&nbsp;
            <span
              style={{
                color: realDurationDiff > 0 ? 'red' : 'green',
              }}
            >
              {'(' + realDurationDiff + 'min.)'}
            </span>
          </span>
        ) : (
          <span>-</span>
        )}
      </TableCell>}
      {!hiddenColumns.I && <TableCell align="center">
        {{ realDuration } ? (
          <span>            
            <span
              style={{
                color: totalDelay > 0 ? 'red' : 'green',
              }}
            >
              {'' + totalDelay + 'min.'}
            </span>
          </span>
        ) : (
          <span>-</span>
        )}

      </TableCell>}

    </TableRow>
  );
};

export default TrainRow;
