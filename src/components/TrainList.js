import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';

const TrainList = ({ trains }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [timeDiffs, setTimeDiffs] = useState({});

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleRealTimeUpdate = (trenCode, type, horaSalidaOuLlegada) => {
    const currentTime = new Date();
    const trainTime = new Date(horaSalidaOuLlegada);
    const timeDiff = Math.floor((currentTime - trainTime) / 60000);

    setTimeDiffs((prevState) => ({
      ...prevState,
      [trenCode]: { ...prevState[trenCode], [type]: { time: currentTime, diff: timeDiff } },
    }));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Línea</TableCell>
          <TableCell>Tren</TableCell>
          <TableCell>HoraSalidaEST</TableCell>
          {selectedRow !== null && (
            <>
              <TableCell>HoraSalidaREAL</TableCell>
              <TableCell>HoraLlegadaEST</TableCell>
              <TableCell>HoraLlegadaREAL</TableCell>
              <TableCell>DuracionEST</TableCell>
              <TableCell>DuracionREAL</TableCell>
            </>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {trains.map((train, index) => {
          const selected = index === selectedRow;
          const timeDiffSalida = timeDiffs[train.cdgoTren]?.salida?.diff;
          const timeRealSalida = timeDiffs[train.cdgoTren]?.salida?.time;
          const timeDiffLlegada = timeDiffs[train.cdgoTren]?.llegada?.diff;
          const timeRealLlegada = timeDiffs[train.cdgoTren]?.llegada?.time;
          const durationReal =
            timeDiffSalida !== undefined && timeDiffLlegada !== undefined
              ? timeDiffLlegada - timeDiffSalida
              : null;

          return (
            <TableRow key={index} onClick={() => handleRowClick(index)}>
              <TableCell>{train.linea}</TableCell>
              <TableCell>{train.cdgoTren}</TableCell>
              <TableCell>{train.horaSalida}</TableCell>
              {selected && (
                <>
                  <TableCell>
                    {timeRealSalida === undefined ? (
                      <Button
                        onClick={() =>
                          handleRealTimeUpdate(train.cdgoTren, 'salida', train.horaSalida)
                        }
                      >
                        Actualizar Hora
                      </Button>
                    ) : (
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
                    )}
                  </TableCell>
                  <TableCell>{train.horaLlegada}</TableCell>
                  <TableCell>
                    {timeRealLlegada === undefined ? (
                      <Button
                        onClick={() =>
                          handleRealTimeUpdate(train.cdgoTren, 'llegada', train.horaLlegada)
                        }
                      >
                        Actualizar Hora
                      </Button>
                    ) : (
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
                    )}
                  </TableCell>
                  <TableCell>{train.duracion}</TableCell>
                  <TableCell>
                    {durationReal !== null && (
                      <span>
                        {durationReal} min
                      </span>
                    )}
                  </TableCell>
                </>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TrainList;