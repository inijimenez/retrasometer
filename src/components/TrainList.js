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
  const [timeReal, setTimeReal] = useState({});

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleRealTimeUpdate = (trenCode, type) => {
    const currentTime = new Date();
    const timeDiff = Math.floor(
      (currentTime - new Date(trains[selectedRow].horaSalida)) / 60000,
    );

    setTimeReal((prevState) => ({
      ...prevState,
      [trenCode]: { ...prevState[trenCode], [type]: currentTime },
    }));

    setTimeDiffs((prevState) => ({
      ...prevState,
      [trenCode]: { ...prevState[trenCode], [type]: timeDiff },
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
          const timeDiffSalida = timeDiffs[train.cdgoTren]?.salida;
          const timeRealSalida = timeReal[train.cdgoTren]?.salida;
          const timeDiffLlegada = timeDiffs[train.cdgoTren]?.llegada;
          const timeRealLlegada = timeReal[train.cdgoTren]?.llegada;

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
                    {timeDiffSalida === null ? (
                      <Button
                        onClick={() =>
                          handleRealTimeUpdate(train.cdgoTren, 'salida')
                        }
                      >
                        Actualizar Hora
                      </Button>
                    ) : (                      
                      
                      <span
                        style={{
                          color: timeDiffSalida > 0 ? 'red' : 'green',
                        }}
                      >
                      {timeRealSalida} ({timeDiffSalida} min)
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{train.horaLlegada}</TableCell>
                  <TableCell>
                    {timeDiffLlegada === null ? (
                      <Button
                        onClick={() =>
                          handleRealTimeUpdate(train.cdgoTren, 'llegada')
                        }
                      >
                        Actualizar Hora
                      </Button>
                    ) : (
                      <span
                        style={{
                          color: timeDiffLlegada > 0 ? 'red' : 'green',
                        }}
                      >
                        {timeRealLlegada} ({timeDiffLlegada} min)
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{train.duracion}</TableCell>
                  <TableCell>
                    {durationReal !== null && (
                      <span>{durationReal} min</span>
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
