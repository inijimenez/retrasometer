import React, { useState, useEffect, useCallback } from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { getDifferenceInMinutes } from '../helpers';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../firebaseConfig'; // importa tu archivo de configuración de Firebase
import { useToasts } from 'react-toast-notifications';



// Función para generar un identificador único
const generateUniqueIdentifier = () => {
  // Puedes utilizar alguna lógica personalizada aquí para generar el identificador único
  // Por ejemplo, puedes combinar la fecha actual con un valor aleatorio
  const timestamp = new Date().getTime();
  const randomValue = Math.floor(Math.random() * 10000);
  return `${timestamp}-${randomValue}`;
};

const TrainRow = ({ data, hiddenColumns, visible, onClick, searchParams }) => {
  const { addToast } = useToasts();
  const [realDepartureTime, setRealDepartureTime] = useState(null);
  const [realArrivalTime, setRealArrivalTime] = useState(null);
  const [realDuration, setRealDuration] = useState(null);

  const [realDepartureTimeDiff, setRealDepartureTimeDiff] = useState(null);
  const [realArrivalTimeDiff, setRealArrivalTimeDiff] = useState(null);
  const [realDurationDiff, setRealDurationDiff] = useState(null);
  const [totalDelay, setTotalDelay] = useState(null);
  const [uniqueIdentifier, setUniqueIdentifier] = useState('');


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
      // Comprobar si ya existe un identificador único en el almacenamiento local
      const storedIdentifier = localStorage.getItem('uniqueIdentifier');
      if (storedIdentifier) {
        setUniqueIdentifier(storedIdentifier);
      } else {
        // Generar un nuevo identificador único
        const newIdentifier = generateUniqueIdentifier();
        setUniqueIdentifier(newIdentifier);
        // Almacenar el identificador único en el almacenamiento local
        localStorage.setItem('uniqueIdentifier', newIdentifier);
      }
    }
  };



  const saveDBData = useCallback(() => {

    const userAgent = navigator.userAgent;
    let deviceName = 'Unknown Device';
    let deviceVersion = '';

    if (userAgent.match(/Windows NT/)) {
      deviceName = 'Windows';
      const versionMatch = userAgent.match(/Windows NT ([\d.]+)/);
      if (versionMatch) {
        deviceVersion = versionMatch[1];
      }
    } else if (userAgent.match(/Macintosh/)) {
      deviceName = 'Mac';
      const versionMatch = userAgent.match(/Mac OS X ([\d_]+)/);
      if (versionMatch) {
        deviceVersion = versionMatch[1].replace(/_/g, '.');
      }
    } else if (userAgent.match(/iPhone/)) {
      deviceName = 'iPhone';
      const versionMatch = userAgent.match(/iPhone OS ([\d_]+)/);
      if (versionMatch) {
        deviceVersion = versionMatch[1].replace(/_/g, '.');
      }
    } else if (userAgent.match(/iPad/)) {
      deviceName = 'iPad';
      const versionMatch = userAgent.match(/iPad OS ([\d_]+)/);
      if (versionMatch) {
        deviceVersion = versionMatch[1].replace(/_/g, '.');
      }
    } else if (userAgent.match(/Android/)) {
      deviceName = 'Android';
      const versionMatch = userAgent.match(/Android ([\d.]+)/);
      if (versionMatch) {
        deviceVersion = versionMatch[1];
      }
    }
    let navigatorName = 'Unknown Navigator';
    let navigatorVersion = '';

    if (userAgent.includes('Firefox')) {
      navigatorName = 'Firefox';
      const versionMatch = userAgent.match(/Firefox\/([\d.]+)/);
      if (versionMatch) {
        navigatorVersion = versionMatch[1];
      }
    } else if (userAgent.includes('Chrome')) {
      navigatorName = 'Chrome';
      const versionMatch = userAgent.match(/Chrome\/([\d.]+)/);
      if (versionMatch) {
        navigatorVersion = versionMatch[1];
      }
    } else if (userAgent.includes('Safari')) {
      navigatorName = 'Safari';
      const versionMatch = userAgent.match(/Version\/([\d.]+)/);
      if (versionMatch) {
        navigatorVersion = versionMatch[1];
      }
    } else if (userAgent.includes('MSIE')) {
      navigatorName = 'Internet Explorer';
      const versionMatch = userAgent.match(/MSIE ([\d.]+)/);
      if (versionMatch) {
        navigatorVersion = versionMatch[1];
      }
    } else if (userAgent.includes('Trident')) {
      navigatorName = 'Internet Explorer';
      const versionMatch = userAgent.match(/Trident\/([\d.]+)/);
      if (versionMatch) {
        navigatorVersion = versionMatch[1];
      }
    }

    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();

    const trainData = {
      date: new Date().toLocaleString(),
      travel: uniqueIdentifier,
      line: data.linea,
      trainID: data.cdgoTren,
      origin: searchParams.descEstOrigen,
      destination: searchParams.descEstDestino,
      originID: searchParams.cdgoEstOrigen,
      destinationID: searchParams.cdgoEstDestino,
      departureEST: data.horaSalida,
      departureREAL: realDepartureTime,
      departureDIFF: realDepartureTimeDiff,
      arrivalEST: data.horaSalida,
      arrivalREAL: realArrivalTime,
      arrivalDIFF: realArrivalTimeDiff,
      durationEST: data.duracion,
      durationREAL: realDuration,
      totalDelay: totalDelay,
      device: deviceName + " v" + deviceVersion + " / " + navigatorName + " v" + navigatorVersion
    };

    db.collection('train_data').add(trainData)
      .then((docRef) => {
        // Mostrar mensaje de éxito en un popup
        addToast('Los datos se han guardado con éxito', { appearance: 'success' });
        console.log('Documento guardado con ID:', docRef.id);
      })
      .catch((error) => {
        // Mostrar mensaje de error en un popup
        addToast('Error al guardar los datos:' + error, { appearance: 'error' });
        console.error('Error al guardar el documento:', error);
      });
    console.log("saveDBData -E");


  }, [uniqueIdentifier, data.linea, data.cdgoTren, data.horaSalida, data.duracion, searchParams.descEstOrigen, searchParams.descEstDestino, searchParams.cdgoEstOrigen, searchParams.cdgoEstDestino, realDepartureTime, realDepartureTimeDiff, realArrivalTime, realArrivalTimeDiff, realDuration, totalDelay, addToast]);


  useEffect(() => {
    console.log("USE EFFECT :" + realDepartureTime + "," + realArrivalTime + "," + realDuration + "," + totalDelay + "," + uniqueIdentifier);
    if (
      realDepartureTime &&
      realArrivalTime &&
      realDuration &&
      totalDelay && uniqueIdentifier
    ) {
      saveDBData();
    }
  }, [
    realDepartureTime,
    realArrivalTime,
    realDuration,
    totalDelay,
    uniqueIdentifier,
    saveDBData,
  ]);

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
