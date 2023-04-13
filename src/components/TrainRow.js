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

const TrainRow = ({ train }) => {
  const [selected, setSelected] = useState(false);
  const [realStartUpdated, setRealStartUpdated] = useState(false);
  const [realEndUpdated, setRealEndUpdated] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  const handleRealStartUpdate = () => {
    setRealStartUpdated(true);
  };

  const handleRealEndUpdate = () => {
    setRealEndUpdated(true);
  };

  const delayInMinutes = train.delay !== null ? Math.floor(train.delay / 60) : null;

  return (
    <TableRow onClick={handleClick}>
      <StyledTableCell>{train.linea}</StyledTableCell>
      <StyledTableCell>{train.cdgoTren}</StyledTableCell>
      <StyledTableCell>{train.horaSalida}</StyledTableCell>
      <StyledTableCell>
        {selected && realStartUpdated ? train.realStart : ''}
        {selected && !realStartUpdated && (
          <Button onClick={handleRealStartUpdate}>Actualizar Hora</Button>
        )}
      </StyledTableCell>
      <StyledTableCell>{train.horaLlegada}</StyledTableCell>
      <StyledTableCell>
        {selected && realEndUpdated ? train.realEnd : ''}
        {selected && !realEndUpdated && (
          <Button onClick={handleRealEndUpdate}>Actualizar Hora</Button>
        )}
      </StyledTableCell>
      <StyledTableCell>{train.duracion}</StyledTableCell>
      <StyledTableCell style={{ color: delayInMinutes > 0 ? 'red' : 'green' }}>
        {selected ? `${delayInMinutes} min` : ''}
      </StyledTableCell>
    </TableRow>
  );
};

export default TrainRow;
