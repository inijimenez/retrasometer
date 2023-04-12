import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  makeStyles,
  Button,
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  redText: {
    color: 'red',
  },
  greenText: {
    color: 'green',
  },
}));

const TrainRow = ({ train, onClick, isSelected, timeDiffs, updateTimeDiffs }) => {
  const classes = useStyles();
  const [startTimeReal, setStartTimeReal] = useState(null);
  const [endTimeReal, setEndTimeReal] = useState(null);

  const getDifference = (time1, time2) => {
    const [h1, m1] = time1.split(':');
    const [h2, m2] = time2.split(':');
    const date1 = new Date();
    date1.setHours(h1, m1, 0, 0);
    const date2 = new Date();
    date2.setHours(h2, m2, 0, 0);
    const diff = (date2.getTime() - date1.getTime()) / (1000 * 60);
    return diff;
  };

  const handleUpdateStartTimeReal = () => {
    const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    setStartTimeReal(currentTime);
    const diff = getDifference(train.horaSalida, currentTime);
    updateTimeDiffs({ ...timeDiffs, start: diff });
  };

  const handleUpdateEndTimeReal = () => {
    const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    setEndTimeReal(currentTime);
    const diff = getDifference(train.horaLlegada, currentTime);
    updateTimeDiffs({ ...timeDiffs, end: diff });
  };

  const durationReal = (timeDiffs && timeDiffs.start && timeDiffs.end) ? timeDiffs.end - timeDiffs.start : null;

  return (
    <TableRow onClick={onClick} selected={isSelected}>
      <TableCell>{train.linea}</TableCell>
      <TableCell>{train.cdgoTren}</TableCell>
      <TableCell>{train.horaSalida}</TableCell>
      <TableCell>
        {isSelected && startTimeReal ? (
          <span>
            {startTimeReal} ({timeDiffs.start > 0 ? '+' : ''}{timeDiffs.start} min)
          </span>
        ) : (
          isSelected && <Button onClick={handleUpdateStartTimeReal}>Actualizar Hora</Button>
        )}
      </TableCell>
      <TableCell>{train.horaLlegada}</TableCell>
      <TableCell>
        {isSelected && endTimeReal ? (
          <span>
            {endTimeReal} ({timeDiffs.end > 0 ? '+' : ''}{timeDiffs.end} min)
          </span>
        ) : (
          isSelected && <Button onClick={handleUpdateEndTimeReal}>Actualizar Hora</Button>
        )}
      </TableCell>
      <TableCell>{train.duracion}</TableCell>
      <TableCell>
        {isSelected && durationReal !== null ? (
          <span className={durationReal > 0 ? classes.redText : classes.greenText}>
            {durationReal > 0 ? '+' : ''}{durationReal} min
          </span>
        ) : null}
      </TableCell>
    </TableRow>
  );
};

export default TrainRow;
