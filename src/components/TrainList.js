import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  makeStyles,
} from '@mui/material';
import TrainRow from './TrainRow';

const useStyles = makeStyles((theme) => ({
  headerText: {
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  tableContainer: {
    maxHeight: 400,
    overflowX: 'auto',
  },
}));

const TrainList = ({ trains, stationsChanged, resetStationsChanged }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [timeDiffs, setTimeDiffs] = useState({});
  const classes = useStyles();

  useEffect(() => {
    if (stationsChanged) {
      setSelectedRow(null);
      setTimeDiffs({});
      resetStationsChanged();
    }
  }, [stationsChanged, resetStationsChanged]);

  const handleRowClick = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const updateRowTimeDiffs = (index, newDiffs) => {
    setTimeDiffs({ ...timeDiffs, [index]: newDiffs });
  };

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerText}>Línea</TableCell>
            <TableCell className={classes.headerText}>Tren</TableCell>
            <TableCell className={classes.headerText}>
              Hora Salida EST
            </TableCell>
            <TableCell className={classes.headerText}>
              Hora Salida REAL
            </TableCell>
            <TableCell className={classes.headerText}>
              Hora Llegada EST
            </TableCell>
            <TableCell className={classes.headerText}>
              Hora Llegada REAL
            </TableCell>
            <TableCell className={classes.headerText}>
              Duracion EST
            </TableCell>
            <TableCell className={classes.headerText}>
              Duracion REAL
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trains.map((train, index) => (
            <TrainRow
              key={index}
              train={train}
              onClick={() => handleRowClick(index)}
              isSelected={selectedRow === index}
              timeDiffs={timeDiffs[index]}
              updateTimeDiffs={(newDiffs) => updateRowTimeDiffs(index, newDiffs)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrainList;
