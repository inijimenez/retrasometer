import React, { useState } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import doPost from '../api/doPost';
import TrainList from './TrainList';

const TrainDelays = () => {
  const [stations, setStations] = useState([]);
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [trenes, setTrenes] = useState(null);

  const fetchStations = async () => {
    const response = await doPost('https://data.renfe.com/api/3/action/datastore_search', {
      resource_id: 'daa68d9b-77cf-4024-890f-285d31184c5a',
      q: '',
      filters: {},
      limit: 93,
      offset: 0,
    });

    if (response) {
      const sortedStations = response.result.records.sort((a, b) => a.DESCRIPCION.localeCompare(b.DESCRIPCION));
      setStations(sortedStations);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // Fetch train data
    // ...
  };

  React.useEffect(() => {
    fetchStations();
  }, []);

  return (
    <Container>
      {/* Form and other elements */}
      {trenes && <TrainList trenes={trenes} />}
    </Container>
  );
};

export default TrainDelays;