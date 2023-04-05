import React, { useState, useEffect  } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

const TrainList = ({ trains, resetKey }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [timeDiffs, setTimeDiffs] = useState({});

  useEffect(() => {
    setSelectedRow(null);
    setTimeDiffs({});
  }, [resetKey]);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const updateTimeDiff = (type, estTime, index) => {
    const now = new Date();
    const estDateTime = new Date(now.toDateString() + ' ' + estTime);
    const diff = Math.floor((now - estDateTime) / 60000);

    setTimeDiffs((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [type]: { timeReal: now, timeDiff: diff },
      },
    }));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Línea</TableCell>
          <TableCell>Tren</TableCell>
          <TableCell>Hora Salida EST</TableCell>
          <TableCell>Hora Llegada EST</TableCell>
          <TableCell>Duración EST</TableCell>
          {selectedRow !== null && (
            <>
              <TableCell>Hora Salida REAL</TableCell>
              <TableCell>Hora Llegada REAL</TableCell>
              <TableCell>Duración REAL</TableCell>
            </>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {trains.map((train, index) => {
          if (selectedRow === null || selectedRow === index) {
            const timeRealSalida = timeDiffs[index]?.salida?.timeReal;
            const timeDiffSalida = timeDiffs[index]?.salida?.timeDiff;
            const timeRealLlegada = timeDiffs[index]?.llegada?.timeReal;
            const timeDiffLlegada = timeDiffs[index]?.llegada?.timeDiff;
            const durationReal =
              timeRealSalida &&
              timeRealLlegada &&
              Math.floor((timeRealLlegada - timeRealSalida) / 60000);

            return (
              <TableRow
                key={train.cdgoTren}
                onClick={() => handleRowClick(index)}
              >
                <TableCell>{train.linea}</TableCell>
                <TableCell>{train.cdgoTren}</TableCell>
                <TableCell>{train.horaSalida}</TableCell>
                <TableCell>{train.horaLlegada}</TableCell>
                <TableCell>{train.duracion}</TableCell>
                {selectedRow === index && (
                  <>
                    <TableCell>
                      {timeRealSalida ? (
                        <span>
                          {timeRealSalida.toLocaleTimeString()} (
                          <span
                            style={{
                              color: timeDiffSalida > 0 ? 'red' : 'green',
                            }}
                          >
                            {timeDiffSalida} min
                          </span>
                          )
                        </span>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() =>
                            updateTimeDiff('salida', train.horaSalida, index)
                          }
                        >
                          Actualizar Hora
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {timeRealLlegada ? (
                        <span>
                          {timeRealLlegada.toLocaleTimeString()} (
                          <span
                            style={{
                              color: timeDiffLlegada > 0 ? 'red' : 'green',
                            }}
                          >
                            {timeDiffLlegada} min
                          </span>
                          )
                        </span>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() =>
                            updateTimeDiff('llegada', train.horaLlegada, index)
                          }
                        >
                          Actualizar Hora
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {durationReal ? (
                        <span>{durationReal} min</span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          } else {
            return null;
          }
        })}
      </TableBody>
    </Table>
  );
};

export default TrainList;
