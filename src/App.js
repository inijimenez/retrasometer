import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import StationSelect from './components/StationSelect';
import TrainList from './components/TrainList';
import { fetchStations, fetchTrains } from './api/renfeApi';


const App = () => {
  const [stations, setStations] = useState([]);
  const [originStation, setOriginStation] = useState(null);
  const [destinationStation, setDestinationStation] = useState(null);
  const [trains, setTrains] = useState([]);
  const [stationsChanged, setStationsChanged] = useState(false);
  const [isLoadingStations, setIsLoadingStations] = useState(false);
  const [isLoadingTrains, setIsLoadingTrains] = useState(false);



  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log("carga debug")
      localStorage.setItem("stations", '[{"_id":27,"CÓDIGO":98305,"DESCRIPCION":"AEROPUERTO T-4","LATITUD":"40,491691","LONGITUD":"-3,593988","DIRECCIÓN":"CARRETERA M-12 - TERMINAL AEROPUERTO T4 - BARAJAS","C.P.":28042,"POBLACION":"Madrid","PROVINCIA":"Madrid","Fichas":"https://data.renfe.com/files/estaciones/FichaEstacion98305.pdf","Túneles lavado":""},{"_id":70,"CÓDIGO":70103,"DESCRIPCION":"ALCALA DE HENARES","LATITUD":"40,488976","LONGITUD":"-3,3664702","DIRECCIÓN":"PASEO ESTACION FERROCARRIL, S/N","C.P.":28807,"POBLACION":"Alcalá de Henares","PROVINCIA":"Madrid","Fichas":"https://data.renfe.com/files/estaciones/FichaEstacion70103.pdf","Túneles lavado":""}]');
      localStorage.setItem("trains", '[{"linea":"C1","lineaEstOrigen":"C1","lineaEstDestino":"C1","cdgoTren":"27927","horaSalida":"11:05","horaLlegada":"11:28","duracion":"23min.","accesible":false},{"linea":"C10","lineaEstOrigen":"C10","lineaEstDestino":"C10","cdgoTren":"21223","horaSalida":"11:21","horaLlegada":"11:43","duracion":"22min.","accesible":false},{"linea":"C1","lineaEstOrigen":"C1","lineaEstDestino":"C1","cdgoTren":"27929","horaSalida":"11:35","horaLlegada":"11:58","duracion":"23min.","accesible":false},{"linea":"C10","lineaEstOrigen":"C10","lineaEstDestino":"C10","cdgoTren":"21225","horaSalida":"11:51","horaLlegada":"12:13","duracion":"22min.","accesible":false},{"linea":"C1","lineaEstOrigen":"C1","lineaEstDestino":"C1","cdgoTren":"27931","horaSalida":"12:05","horaSalidaReal":"12:05","horaLlegada":"12:28","horaLlegadaReal":"12:28","duracion":"23min.","accesible":false},{"linea":"C10","lineaEstOrigen":"C10","lineaEstDestino":"C10","cdgoTren":"21227","horaSalida":"12:19","horaSalidaReal":"12:19","horaLlegada":"12:41","horaLlegadaReal":"12:41","duracion":"22min.","accesible":false},{"linea":"C1","lineaEstOrigen":"C1","lineaEstDestino":"C1","cdgoTren":"27933","horaSalida":"12:35","horaSalidaReal":"12:35","horaLlegada":"12:58","horaLlegadaReal":"12:58","duracion":"23min.","accesible":false},{"linea":"C10","lineaEstOrigen":"C10","lineaEstDestino":"C10","cdgoTren":"21229","horaSalida":"12:51","horaSalidaReal":"12:51","horaLlegada":"13:13","horaLlegadaReal":"13:13","duracion":"22min.","accesible":false},{"linea":"C1","lineaEstOrigen":"C1","lineaEstDestino":"C1","cdgoTren":"27935","horaSalida":"13:06","horaLlegada":"13:29","duracion":"23min.","accesible":false},{"linea":"C10","lineaEstOrigen":"C10","lineaEstDestino":"C10","cdgoTren":"21231","horaSalida":"13:21","horaLlegada":"13:43","duracion":"22min.","accesible":false},{"linea":"C1","lineaEstOrigen":"C1","lineaEstDestino":"C1","cdgoTren":"27937","horaSalida":"13:35","horaLlegada":"13:58","duracion":"23min.","accesible":false},{"linea":"C10","lineaEstOrigen":"C10","lineaEstDestino":"C10","cdgoTren":"21233","horaSalida":"13:50","horaLlegada":"14:12","duracion":"22min.","accesible":false}]');
    }
    const loadStations = async () => {
      setIsLoadingStations(true); // Establecer isLoading en true antes de la llamada a la API
      const fetchedStations = await fetchStations();
      setStations(fetchedStations);
      setIsLoadingStations(false); // Establecer isLoading en false antes de la llamada a la API
    };
    loadStations();
  }, []);

  useEffect(() => {
    const loadTrains = async () => {
      if (originStation && destinationStation) {
        setIsLoadingTrains(true); // Establecer isLoading en true antes de la llamada a la API
        //console.log("Antes loadTrains:" + originStation.CÓDIGO + "," + destinationStation.CÓDIGO);
        const fetchedTrains = await fetchTrains(originStation, destinationStation);
        //console.log("Después loadTrains:" + originStation.CÓDIGO + "," + destinationStation.CÓDIGO);        
        setTrains(fetchedTrains);
        setIsLoadingTrains(false); // Establecer isLoading en false despues de la llamada a la API
      }
    };
    loadTrains();
  }, [originStation, destinationStation]);

  useEffect(() => {
    setStationsChanged(true);
  }, [originStation, destinationStation]);

  return (
    <Container>
      <Typography variant="h4" align="center">
        Retrasometer
      </Typography>
      <Typography variant="h6" align="center">
        Versión 1.0
      </Typography>
      {isLoadingStations ? (
        <Typography variant="subtitle1" align="center">
          Cargando datos estaciones...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <StationSelect
              stations={stations}
              label="Estación de origen"
              value={originStation}
              onChange={setOriginStation}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <StationSelect
              stations={stations}
              label="Estación de destino"
              value={destinationStation}
              onChange={setDestinationStation}
            />
          </Grid>
        </Grid>
      )}
      {isLoadingTrains ? (                
          <Typography variant="subtitle1" align="center">
            Cargando datos trayectos...
          </Typography>
      ) : (
        trains.length > 0 ? (
          <TrainList trains={trains} stationsChanged={stationsChanged} resetStationsChanged={() => setStationsChanged(false)} />
        ) : (
        <div></div>
        )
      )}
    </Container>
  );
};

export default App;
