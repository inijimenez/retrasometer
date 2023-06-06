import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../firebaseConfig'; // importa tu archivo de configuración de Firebase


firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();


const StatsPage = () => {
    const [totalDelayToday, setTotalDelayToday] = useState(0);
    const [totalDelayWeek, setTotalDelayWeek] = useState(0);
    const [totalDelayByLine, setTotalDelayByLine] = useState([]);
    const [averageDelayByLine, setAverageDelayByLine] = useState([]);


    useEffect(() => {
        // Lógica para obtener los datos de Firestore y actualizar los estados correspondientes.
        // Puedes utilizar la librería de Firebase para realizar consultas a Firestore.

        // Aquí debes realizar la consulta a Firestornpmpe para obtener los datos necesarios para el usuario "1685468654461-1981".
        // Utiliza los datos que proporcionaste como ejemplo y realiza la consulta correspondiente.

        // Ejemplo de cómo realizar la consulta a Firestore utilizando Firebase.
        // Esta consulta asume que tienes configurada la conexión con Firebase en tu proyecto.
        const getUserStats = async () => {
//            firebase.initializeApp(firebaseConfig);

            const user = '1685468654461-1981';
            const currentDate = new Date();
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(startOfWeek.getDate() - currentDate.getDay());
      
            const todayStats = await getStatsForDay(user, currentDate);
            const weekStats = await getStatsForWeek(user, startOfWeek, currentDate);
            const lineStats = await getStatsByLine(user, startOfWeek, currentDate);
      
            setTotalDelayToday(todayStats.totalDelay);
            setTotalDelayWeek(weekStats.totalDelay);
            setTotalDelayByLine(lineStats.totalDelayByLine);
            setAverageDelayByLine(lineStats.averageDelayByLine);

            
        };

        getUserStats();
    }, []);

    const getStatsForDay = async (user, date) => {
        const querySnapshot = await firestore
          .collection('train_data')
          .where('user', '==', user)
          .where('date', '>=', new Date(date.getFullYear(), date.getMonth(), date.getDate()))
          .where('date', '<', new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1))
          .get();
    
        let totalDelay = 0;
        querySnapshot.forEach((doc) => {
          totalDelay += doc.data().totalDelay;
        });
    
        return { totalDelay };
      };
    
      const getStatsForWeek = async (user, startDate, endDate) => {
        const querySnapshot = await firestore
          .collection('train_data')
          .where('user', '==', user)
          .where('date', '>=', startDate)
          .where('date', '<', new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1))
          .get();
    
        let totalDelay = 0;
        querySnapshot.forEach((doc) => {
          totalDelay += doc.data().totalDelay;
        });
    
        return { totalDelay };
      };
    
      const getStatsByLine = async (user, startDate, endDate) => {
        const querySnapshot = await firestore
          .collection('train_data')
          .where('user', '==', user)
          .where('date', '>=', startDate)
          .where('date', '<', new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1))
          .get();
    
        const totalDelayByLine = {};
        const averageDelayByLine = {};
    
        querySnapshot.forEach((doc) => {
          const line = doc.data().line;
          const totalDelay = doc.data().totalDelay;
    
          totalDelayByLine[line] = (totalDelayByLine[line] || 0) + totalDelay;
          averageDelayByLine[line] = (averageDelayByLine[line] || 0) + totalDelay;
        });
    
        // Calcula el promedio dividiendo el total de retraso por el número de registros por línea
        Object.keys(averageDelayByLine).forEach((line) => {
          averageDelayByLine[line] /= querySnapshot.size;
        });
    
        return { totalDelayByLine, averageDelayByLine };
      };

    return (
        <div>
        <h1>Estadísticas</h1>
        <p>Total de retraso acumulado para el día actual: {totalDelayToday}</p>
        <p>Total de retraso acumulado para la semana actual: {totalDelayWeek}</p>
        <h2>Retraso acumulado por línea para la semana actual</h2>
        <ul>
          {Object.entries(totalDelayByLine).map(([line, totalDelay]) => (
            <li key={line}>
              Línea {line}: {totalDelay}
            </li>
          ))}
        </ul>
        <h2>Promedio de retraso por línea para la semana actual</h2>
        <ul>
          {Object.entries(averageDelayByLine).map(([line, averageDelay]) => (
            <li key={line}>
              Línea {line}: {averageDelay}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default StatsPage;
