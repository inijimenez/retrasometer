import React, { useState } from 'react';
import './App.css';
import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Form from './components/Form';
import TrainList from './components/TrainList';

function App() {
  const [trains, setTrains] = useState([]);

  const updateTrains = (newTrains) => {
    setTrains(newTrains);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Form onUpdateTrains={updateTrains} />
        <TrainList trains={trains} />
      </Container>
    </ThemeProvider>
  );
}

export default App;