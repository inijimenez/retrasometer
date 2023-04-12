import React, { useState } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { styled } from '@mui/system';

const RedText = styled('span')({
  color: 'red',
});

const GreenText = styled('span')({
  color: 'green',
});

const TrainRow = ({ train, onClick, isSelected, timeDiffs, updateTimeDiffs }) => {
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
    console.log("INICIO handleUpdateStartTimeReal");
    const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    setStartTimeReal(currentTime);
    console.log("FIN a handleUpdateStartTimeReal");
    const diff = getDifference(train.horaSalida, currentTime);
    console.log("FIN B handleUpdateStartTimeReal:" + diff);
    updateTimeDiffs({ ...timeDiffs, start: diff });
    console.log("FIN  handleUpdateStartTimeReal");
  };

  const handleUpdateEndTimeReal = () => {
    const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    setEndTimeReal(currentTime);
    const diff = getDifference(train.horaLlegada, currentTime);
    updateTimeDiffs({ ...timeDiffs, end: diff });
  };

  console.log("PASO A durationReal");
  const durationReal = (timeDiffs && timeDiffs.start && timeDiffs.end) ? timeDiffs.end - timeDiffs.start : null;
  console.log("PASO b durationReal:" + durationReal);

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
          durationReal > 0 ? (
            <RedText>{durationReal > 0 ? '+' : ''}{durationReal} min</RedText>
          ) : (
            <GreenText>{durationReal > 0 ? '+' : ''}{durationReal} min</GreenText>
          )
        ) : null}
      </TableCell>
    </TableRow>
  );
};

export default TrainRow;
