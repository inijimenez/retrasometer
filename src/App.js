import { useState, useEffect } from 'react';
import TrainList from './components/TrainList';
import StationSelect from './components/StationSelect';
import renfeAPI from './services/renfeAPI';

function App() {
  const [stations, setStations] = useState([]);
  const [originCode, setOriginCode] = useState(null);
  const [destinationCode, setDestinationCode] = useState(null);
  const [loadingStations, setLoadingStations] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stationData = await renfeAPI.fetchStations();
        setStations(stationData);
        setLoadingStations(false);
      } catch (err) {
        console.error(err);
        setLoadingStations(false);
      }
    };
    fetchData();
  }, []);

  const handleStationChange = (origin, destination) => {
    setOriginCode(origin);
    setDestinationCode(destination);
  };

  return (
    <div>
      <h1>Retrasometer</h1>
      <h2>Versión 1.0.0</h2>
      {loadingStations ? (
        <p>Cargando estaciones...</p>
      ) : (
        <StationSelect stations={stations} onChange={handleStationChange} />
      )}
      {originCode && destinationCode && (
        <TrainList originCode={originCode} destinationCode={destinationCode} />
      )}
    </div>
  );
}

export default App;
