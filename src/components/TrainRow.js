import React, { useState } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { getDifferenceInMinutes } from '../helpers';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../firebaseConfig'; // importa tu archivo de configuración de Firebase



const TrainRow = ({ data, hiddenColumns, visible, onClick }) => {
  const [realDepartureTime, setRealDepartureTime] = useState(null);
  const [realArrivalTime, setRealArrivalTime] = useState(null);
  const [realDuration, setRealDuration] = useState(null);

  const [realDepartureTimeDiff, setRealDepartureTimeDiff] = useState(null);
  const [realArrivalTimeDiff, setRealArrivalTimeDiff] = useState(null);
  const [realDurationDiff, setRealDurationDiff] = useState(null);
  const [totalDelay, setTotalDelay] = useState(null);


  const handleDepartureTimeUpdate = () => {
    const realTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    setRealDepartureTime(realTime);
    setRealDepartureTimeDiff(getDifferenceInMinutes(data.horaSalida, realTime))
  };

  const handleArrivalTimeUpdate = () => {
    const realTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    setRealArrivalTime(realTime);
    setRealArrivalTimeDiff(getDifferenceInMinutes(data.horaLlegada, realTime))
    if (realDepartureTime) {
      const realDurationA = getDifferenceInMinutes(realDepartureTime, realTime);
      const estDurationA = getDifferenceInMinutes(data.horaSalida, data.horaLlegada);
      setRealDuration(realDurationA)
      setRealDurationDiff(realDurationA - estDurationA)
      setTotalDelay(getDifferenceInMinutes(data.horaLlegada, realTime));
      saveDBData();
    }
  };

  const saveDBData = () => {
    console.log("saveDBData -A");
    firebase.initializeApp(firebaseConfig);

    console.log("saveDBData -B");
    const db = firebase.firestore();
    console.log("saveDBData -C");
    const trainData = {
      travel: 'Nombre del viaje',
      line: 'Nombre de la línea',
      trainID: 'ID del tren',
      origin: "popo",
      destination: "pepe"
    };
    console.log("saveDBData -D");
    db.collection('train_data').add(trainData)
    .then((docRef) => {
      console.log('Documento guardado con ID:', docRef.id);
    })
    .catch((error) => {
      console.error('Error al guardar el documento:', error);
    });
    console.log("saveDBData -E");

  
    }

  



  if (!visible) {
      return null;
    }

    return (
      <TableRow onClick={onClick}>
        <TableCell align="center">{data.linea}</TableCell>
        <TableCell align="center">{data.cdgoTren}</TableCell>
        <TableCell align="center">{data.horaSalida}</TableCell>
        {!hiddenColumns.D && <TableCell align="center">
          {realDepartureTime ? (
            <span>
              {realDepartureTime}&nbsp;
              <span
                style={{
                  color: realDepartureTimeDiff > 0 ? 'red' : 'green',
                }}
              >
                {'(' + realDepartureTimeDiff + 'min.)'}
              </span>
            </span>
          ) : (
            <Button onClick={handleDepartureTimeUpdate} variant="contained" color="primary">
              Actualizar Hora
            </Button>
          )}
        </TableCell>}
        <TableCell align="center">{data.horaLlegada}</TableCell>
        {!hiddenColumns.F && <TableCell>
          {realArrivalTime ? (
            <span>
              {realArrivalTime}&nbsp;
              <span
                style={{
                  color: realArrivalTimeDiff > 0 ? 'red' : 'green',
                }}
              >
                {'(' + realArrivalTimeDiff + 'min.)'}
              </span>
            </span>
          ) : (
            <Button onClick={handleArrivalTimeUpdate} variant="contained" color="primary">
              Actualizar Hora
            </Button>
          )}

        </TableCell>}
        <TableCell align="center">{data.duracion}</TableCell>
        {!hiddenColumns.H && <TableCell align="center">
          {realDepartureTime && realDuration ? (
            <span>
              {realDuration}&nbsp;
              <span
                style={{
                  color: realDurationDiff > 0 ? 'red' : 'green',
                }}
              >
                {'(' + realDurationDiff + 'min.)'}
              </span>
            </span>
          ) : (
            <span>-</span>
          )}
        </TableCell>}
        {!hiddenColumns.I && <TableCell align="center">
          {realDepartureTime && realDuration ? (
            <span>
              <span
                style={{
                  color: totalDelay > 0 ? 'red' : 'green',
                }}
              >
                {'' + totalDelay + 'min.'}
              </span>
            </span>
          ) : (
            <span>-</span>
          )}

        </TableCell>}

      </TableRow>
    );
  };

  export default TrainRow;
