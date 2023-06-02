import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import firebaseConfig from '../firebaseConfig'; // importa tu archivo de configuración de Firebase

const StatsPage = () => {
    const [totalDelayToday, setTotalDelayToday] = useState(0);
    const [totalDelayWeek, setTotalDelayWeek] = useState(0);
    const [totalDelayPerLine, setTotalDelayPerLine] = useState({});
    const [averageDelayWeek, setAverageDelayWeek] = useState(0);
    const [averageDelayPerLine, setAverageDelayPerLine] = useState({});

    useEffect(() => {
        // Lógica para obtener los datos de Firestore y actualizar los estados correspondientes.
        // Puedes utilizar la librería de Firebase para realizar consultas a Firestore.

        // Aquí debes realizar la consulta a Firestornpmpe para obtener los datos necesarios para el usuario "1685468654461-1981".
        // Utiliza los datos que proporcionaste como ejemplo y realiza la consulta correspondiente.

        // Ejemplo de cómo realizar la consulta a Firestore utilizando Firebase.
        // Esta consulta asume que tienes configurada la conexión con Firebase en tu proyecto.
        const getUserStats = async () => {
            firebase.initializeApp(firebaseConfig);


            const userStatsRef = firebase.firestore().collection('train_data').where('user', '==', '1685468654461-1981');
            const userStatsSnapshot = await userStatsRef.get();

            let totalDelayToday = 0;
            let totalDelayWeek = 0;
            let totalDelayPerLine = {};
            let totalDelayCountPerLine = {};
            let averageDelayWeek = 0;
            let averageDelayPerLine = {};

            userStatsSnapshot.forEach((doc) => {
                const data = doc.data();
                const totalDelay = data.totalDelay;
                const line = data.line;

                // Cálculo del totalDelay acumulado para el día actual
                totalDelayToday += totalDelay;

                // Cálculo del totalDelay acumulado para la semana
                totalDelayWeek += totalDelay;

                // Cálculo del totalDelay acumulado para cada línea
                totalDelayPerLine[line] = (totalDelayPerLine[line] || 0) + totalDelay;
                totalDelayCountPerLine[line] = (totalDelayCountPerLine[line] || 0) + 1;
            });

            // Cálculo del totalDelay medio de la semana
            averageDelayWeek = totalDelayWeek / userStatsSnapshot.size;

            // Cálculo del totalDelay medio de la semana por cada línea
            Object.keys(totalDelayPerLine).forEach((line) => {
                averageDelayPerLine[line] = totalDelayPerLine[line] / totalDelayCountPerLine[line];
            });

            // Actualización de los estados con los valores obtenidos
            setTotalDelayToday(totalDelayToday);
            setTotalDelayWeek(totalDelayWeek);
            setTotalDelayPerLine(totalDelayPerLine);
            setAverageDelayWeek(averageDelayWeek);
            setAverageDelayPerLine(averageDelayPerLine);
        };

        getUserStats();
    }, []);

    return (
        <div>
            <h2>Estadísticas para el usuario "1685468654461-1981"</h2>

            <p>Total Delay acumulado para el día actual: {totalDelayToday}</p>
            <p>Total Delay acumulado para la semana: {totalDelayWeek}</p>

            <h3>Total Delay acumulado para la semana por cada línea</h3>
            <ul>
                {Object.keys(totalDelayPerLine).map((line) => (
                    <li key={line}>{line}: {totalDelayPerLine[line]}</li>
                ))}
            </ul>

            <p>Total Delay medio de la semana: {averageDelayWeek}</p>

            <h3>Total Delay medio de la semana por cada línea</h3>
            <ul>
                {Object.keys(averageDelayPerLine).map((line) => (
                    <li key={line}>{line}: {averageDelayPerLine[line]}</li>
                ))}
            </ul>
        </div>
    );
};

export default StatsPage;
