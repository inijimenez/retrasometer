import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import TrainRow from './TrainRow';

const StyledTableHeadCell = styled(TableCell)({
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
});

const TrainList = ({ trains }) => {
  const [selectedTrainIndex, setSelectedTrainIndex] = useState(null);
  const [timeDiffs, setTimeDiffs] = useState({});

  const handleRowClick = (index) => {
    setSelectedTrainIndex(index);
    setTimeDiffs(null);
  };

  const updateTimeDiffs = (diffs) => {
    console.log("PASO A updateTimeDiffs");
    setTimeDiffs(diffs);
    console.log("PASO B updateTimeDiffs");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="train list">
        <TableHead>
          <TableRow>
            <StyledTableHeadCell>Línea</StyledTableHeadCell>
            <StyledTableHeadCell>Tren</StyledTableHeadCell>
            <StyledTableHeadCell>HoraSalidaEST</StyledTableHeadCell>
            <StyledTableHeadCell>HoraSalidaREAL</StyledTableHeadCell>
            <StyledTableHeadCell>HoraLlegadaEST</StyledTableHeadCell>
            <StyledTableHeadCell>HoraLlegadaREAL</StyledTableHeadCell>
            <StyledTableHeadCell>DuracionEST</StyledTableHeadCell>
            <StyledTableHeadCell>DuracionREAL</StyledTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trains.map((train, index) => (
            <TrainRow
              key={train.cdgoTren}
              train={train}
              onClick={() => handleRowClick(index)}
              isSelected={selectedTrainIndex === index}
              timeDiffs={selectedTrainIndex === index ? timeDiffs : null}
              updateTimeDiffs={updateTimeDiffs}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrainList;
