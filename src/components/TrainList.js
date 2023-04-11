import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

const TrainList = ({ trains, stationsChanged, resetStationsChanged }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [timeDiffs, setTimeDiffs] = useState({});

  useEffect(() => {
    setSelectedRow(null);
    setTimeDiffs({});
  }, [stationsChanged, resetStationsChanged]);

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
    <div className="tableContainer">
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Línea</TableCell>
            <TableCell className="tableCell">Tren</TableCell>
            <TableCell className="tableCell">Hora Salida EST</TableCell>
            {selectedRow !== null && (
              <>
                <TableCell className="tableCell">Hora Salida REAL</TableCell>
              </>
            )}
            <TableCell className="tableCell">Hora Llegada EST</TableCell>
            {selectedRow !== null && (
              <>
                <TableCell className="tableCell"> Hora Llegada REAL</TableCell>
              </>
            )}
            <TableCell className="tableCell">Duración EST</TableCell>
            {selectedRow !== null && (
              <>
                <TableCell className="tableCell">Duración REAL</TableCell>
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
                  <TableCell className="tableCell">{train.linea}</TableCell>
                  <TableCell className="tableCell">{train.cdgoTren}</TableCell>
                  <TableCell className="tableCell">{train.horaSalida}</TableCell>
                  {selectedRow !== null && (
                    <>
                      <TableCell className="tableCell">
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
                    </>
                  )}
                  <TableCell className="tableCell">{train.horaLlegada}</TableCell>
                  {selectedRow !== null && (
                    <>
                      <TableCell className="tableCell">
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
                    </>
                  )}

                  <TableCell className="tableCell">{train.duracion}</TableCell>
                  {selectedRow !== null && (
                    <>
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
    </div>
  );
};

export default TrainList;
