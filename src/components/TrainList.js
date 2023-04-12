import { useState, useEffect } from 'react';
import renfeAPI from '../services/renfeAPI2';
import TrainRow from './TrainRow';

function TrainList({ originCode, destinationCode }) {
  const [trains, setTrains] = useState([]);
  const [loadingTrains, setLoadingTrains] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainData = await renfeAPI.fetchTrains(originCode, destinationCode);
        setTrains(trainData);
        setLoadingTrains(false);
      } catch (err) {
        console.error(err);
        setLoadingTrains(false);
      }
    };
    fetchData();
  }, [originCode, destinationCode]);

  const handleTrainSelected = (trainId) => {
    setTrains((prevTrains) =>
      prevTrains.map((train) =>
        train.cdgoTren === trainId ? { ...train, selected: !train.selected } : train
      )
    );
  };

  return (
    <div>
      <h3>Trayectos</h3>
      {loadingTrains ? (
        <p>Cargando trayectos...</p>
      ) : (
        trains.map((train) => (
          <TrainRow key={train.cdgoTren} train={train} onTrainSelected={handleTrainSelected} />
        ))
      )}
    </div>
  );
}

export default TrainList;
