import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import TrainDetails from './TrainDetails';

const TrainRow = ({ train }) => {
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <TableRow>
        <TableCell>{train.line}</TableCell>
        <TableCell>{train.trainId}</TableCell>
        <TableCell>{train.estimatedDeparture}</TableCell>
        <TableCell>{train.estimatedArrival}</TableCell>
        <TableCell>{train.duration}</TableCell>
        <TableCell>
          <IconButton onClick={handleExpandClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <TrainDetails train={train} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TrainRow;