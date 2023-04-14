import React, { useState } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
  '&:first-of-type': {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
  },
  '&:last-of-type': {
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
}));

const TrainRow = ({ train, isSelected, onRowSelect }) => {
  const [realStart, setRealStart] = useState(null);
  const [realEnd, setRealEnd] = useState(null);

  
  const handleUpdateRealStart = () => {
    setRealStart(new Date());
  };

  const handleUpdateRealEnd = () => {
    setRealEnd(new Date());
  };

  const startDifferenceInMinutes =
    realStart !== null ? Math.floor((realStart - new Date(train.horaSalida)) / 60000) : null;

  const endDifferenceInMinutes =
    realEnd !== null ? Math.floor((realEnd - new Date(train.horaLlegada)) / 60000) : null;

  const realDuration =
    realStart !== null && realEnd !== null ? Math.floor((realEnd - realStart) / 60000) : null;

  const renderRealStartCell = () => {
    if (realStart) {
      return (
        <span style={{ color: startDifferenceInMinutes > 0 ? 'red' : 'green' }}>
          {realStart.toLocaleTimeString()} ({startDifferenceInMinutes} min)
        </span>
      );
    }
    return <Button onClick={handleUpdateRealStart}>Actualizar Hora</Button>;
  };

  const renderRealEndCell = () => {
    if (realEnd) {
      return (
        <span style={{ color: endDifferenceInMinutes > 0 ? 'red' : 'green' }}>
          {realEnd.toLocaleTimeString()} ({endDifferenceInMinutes} min)
        </span>
      );
    }
    return <Button onClick={handleUpdateRealEnd}>Actualizar Hora</Button>;
  };

  const renderRealDurationCell = () => {
    if (realDuration === null) return null;
    return `${realDuration} min`;
  };

  return (
    <TableRow  hover
    key={`${train.linea}-${train.cdgoTren}`}   
    onClick={() => onRowSelect(train.cdgoTren)}
    style={{ display: isSelected ? "table-row" : "none" }}>
      <StyledTableCell>{train.linea}</StyledTableCell>
      <StyledTableCell>{train.cdgoTren}</StyledTableCell>
      <StyledTableCell>{train.horaSalida}</StyledTableCell>
      <StyledTableCell>{renderRealStartCell()}</StyledTableCell>
      <StyledTableCell>{train.horaLlegada}</StyledTableCell>
      <StyledTableCell>{renderRealEndCell()}</StyledTableCell>
      <StyledTableCell>{train.duracion}</StyledTableCell>
      <StyledTableCell>{renderRealDurationCell()}</StyledTableCell>
    </TableRow>
  );
};

export default TrainRow;
