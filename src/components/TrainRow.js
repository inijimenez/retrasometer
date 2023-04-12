import React, { useState } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { styled } from '@mui/system';

const DelayCell = styled(TableCell)(({ theme, delay }) => ({
  color: delay > 0 ? theme.palette.error.main : theme.palette.success.main,
}));

function TrainRow({ train }) {
  const [selected, setSelected] = useState(false);
  const [startTimeReal, setStartTimeReal] = useState(null);
  const [endTimeReal, setEndTimeReal] = useState(null);

  const updateStartTimeReal = () => {
    setStartTimeReal(new Date());
    setSelected(true);
  };

  const updateEndTimeReal = () => {
    setEndTimeReal(new Date());
  };

  const delayInMinutes = (timeReal, timeExpected) => {
    if (!timeReal) return null;
    const diff = Math.floor((timeReal - new Date(`1970-01-01T${timeExpected}`)) / 60000);
    return diff;
  };

  const startTimeDelay = delayInMinutes(startTimeReal, train.horaSalida);
  const endTimeDelay = delayInMinutes(endTimeReal, train.horaLlegada);

  return (
    <TableRow onClick={() => setSelected(!selected)}>
      <TableCell>{train.linea}</TableCell>
      <TableCell>{train.cdgoTren}</TableCell>
      <TableCell>{train.horaSalida}</TableCell>
      {selected && (
        <>
          <DelayCell delay={startTimeDelay}>{startTimeReal?.toLocaleTimeString()}</DelayCell>
          <DelayCell delay={startTimeDelay}>{startTimeDelay} min</DelayCell>
          <TableCell>
            {startTimeReal ? (
              <Button variant="outlined" color="primary" onClick={updateStartTimeReal}>
                Actualizar Hora
              </Button>
            ) : (
              startTimeDelay
            )}
          </TableCell>
          <TableCell>{train.horaLlegada}</TableCell>
          <DelayCell delay={endTimeDelay}>{endTimeReal?.toLocaleTimeString()}</DelayCell>
          <DelayCell delay={endTimeDelay}>{endTimeDelay} min</DelayCell>
          <TableCell>
            {endTimeReal ? (
              <Button variant="outlined" color="primary" onClick={updateEndTimeReal}>
                Actualizar Hora
              </Button>
            ) : (
              endTimeDelay
            )}
          </TableCell>
          <DelayCell delay={endTimeDelay - startTimeDelay}>
            {endTimeDelay !== null && startTimeDelay !== null
              ? endTimeDelay - startTimeDelay
              : '-'} min
          </DelayCell>
        </>
      )}
    </TableRow>
  );
}

export default TrainRow;
