import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../firebaseConfig'; // importa tu archivo de configuración de Firebase


firebase.initializeApp(firebaseConfig);


const StatsPage = () => {
    const [totalDelayToday, setTotalDelayToday] = useState(0);
    const [totalDelayWeek, setTotalDelayWeek] = useState(0);
    const [totalDelayByLine, setTotalDelayByLine] = useState({});
    const [averageDelayByLine, setAverageDelayByLine] = useState({});

    let [user] = useState('');

    user = localStorage.getItem('uniqueIdentifier');

    useEffect(() => {
        // Obtener la referencia a la colección "estadisticas"
        const statisticsRef = firebase.firestore().collection('train_data');
    
        // Obtener las estadísticas para el usuario y la semana actual
        const user = '1685468654461-1981';
        const currentWeekStart = getStartOfWeek(new Date());
        const currentWeekEnd = getEndOfWeek(new Date());
    
        const query = statisticsRef
          .where('user', '==', user)
          .where('date', '>=', currentWeekStart)
          .where('date', '<=', currentWeekEnd);
    
        // Escuchar los cambios en los datos de Firestore
        const unsubscribe = query.onSnapshot((snapshot) => {
          let totalDelayToday = 0;
          let totalDelayWeek = 0;
          const totalDelayByLine = {};
          const delayCountByLine = {};
          const averageDelayByLine = {};
    
          snapshot.forEach((doc) => {
            const data = doc.data();
            const totalDelay = data.totalDelay || 0;
            const line = data.line;
    
            // Actualizar el totalDelay acumulado para el día actual
            const currentDate = new Date();
            if (isSameDay(currentDate, data.date.toDate())) {
              totalDelayToday += totalDelay;
            }
    
            // Acumular el totalDelay por línea y contar el número de registros por línea
            if (!totalDelayByLine[line]) {
              totalDelayByLine[line] = totalDelay;
              delayCountByLine[line] = 1;
            } else {
              totalDelayByLine[line] += totalDelay;
              delayCountByLine[line]++;
            }
    
            // Actualizar el totalDelay acumulado para la semana actual
            totalDelayWeek += totalDelay;
          });
    
          // Calcular el totalDelay medio por línea
          Object.keys(totalDelayByLine).forEach((line) => {
            const totalDelay = totalDelayByLine[line];
            const delayCount = delayCountByLine[line];
            const averageDelay = totalDelay / delayCount;
            averageDelayByLine[line] = averageDelay;
          });
    
          setTotalDelayToday(totalDelayToday);
          setTotalDelayWeek(totalDelayWeek);
          setTotalDelayByLine(totalDelayByLine);
          setAverageDelayByLine(averageDelayByLine);
        });
    
        // Limpiar el listener cuando el componente se desmonte
        return () => unsubscribe();
      }, []);

 // Función para obtener el inicio de la semana a partir de una fecha
 const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek;
  };

  // Función para obtener el fin de la semana a partir de una fecha
  const getEndOfWeek = (date) => {
    const endOfWeek = new Date(date);
    endOfWeek.setHours(23, 59, 59, 999);
    endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
    return endOfWeek;
  };

  // Función para comprobar si dos fechas son el mismo día
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div>
      <h1>Estadísticas '{user}'</h1>
      <p>Total de retraso acumulado para el día actual: {totalDelayToday}</p>
      <p>Total de retraso acumulado para la semana actual: {totalDelayWeek}</p>
      <h2>Retraso acumulado por línea</h2>
      <ul>
        {Object.keys(totalDelayByLine).map((line) => (
          <li key={line}>
            Línea {line}: {totalDelayByLine[line]} minutos
          </li>
        ))}
      </ul>
      <h2>Retraso medio por línea</h2>
      <ul>
        {Object.keys(averageDelayByLine).map((line) => (
          <li key={line}>
            Línea {line}: {averageDelayByLine[line]} minutos
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatsPage;
