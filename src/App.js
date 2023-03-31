import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import axios from "axios";
import { MuiPickersUtilsProvider, TimePicker } from "@mui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const App = () => {
  const [stations, setStations] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.post(
        "https://data.renfe.com/api/3/action/datastore_search",
        {
          resource_id: "daa68d9b-77cf-4024-890f-285d31184c5a",
          q: "",
          filters: {},
          limit: 93,
          offset: 0,
        }
      );
      const sortedStations = response.data.result.records.sort((a, b) =>
        a.DESCRIPCION.localeCompare(b.DESCRIPCION)
      );
      setStations(sortedStations);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const fetchTrains = async (e) => {
    e.preventDefault();

    if (!origin || !destination) {
      alert("Por favor, selecciona origen y destino.");
      return;
    }

    const today = new Date();
    const date = today.toISOString().slice(0, 10).replaceAll("-", "");
    const currentHour = today.getHours();
    const previousHour = new Date(today.getTime() - 60 * 60 * 1000).getHours();
    const nextHour = new Date(today.getTime() + 60 * 60 * 1000).getHours();

    try {
      const response = await axios.post(
        "https://horarios.renfe.com/cer/HorariosServlet",
        {
          nucleo: "10",
          origen,
          destino,
          fchaViaje: date,
          validaReglaNegocio: true,
          tiempoReal: true,
          servicioHorarios: "VTI",
          horaViajeOrigen: previousHour,
          horaViajeLlegada: nextHour,
          accesibilidadTrenes: true,
        }
      );
      setTrains(response.data.horario);
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        RetrasoMeter
      </Typography>
      <form onSubmit={fetchTrains}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Origen</InputLabel>
          <Select
            label="Origen"
            value={origin}
            onChange={handleOriginChange}
          >
            {stations.map((station) => (
              <MenuItem key={station.ID_ESTACION} value={station.ID_ESTACION}>
                {station.DESCRIPCION}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Destino</InputLabel>
          <Select
            label="Destino"
            value={destination}
            onChange={handleDestinationChange}
          >
            {stations.map((station) => (
              <MenuItem key={station.ID_ESTACION} value={station.ID_ESTACION}>
                {station.DESCRIPCION}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "1rem" }}
        >
          Buscar trenes
        </Button>
      </form>
      {trains.length > 0 && (
        <>
          <Typography variant="h6" align="center" style={{ marginTop: "2rem" }}>
            Horarios de trenes
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Origen</TableCell>
                <TableCell>Destino</TableCell>
                <TableCell>Salida</TableCell>
                <TableCell>Llegada</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trains.map((train, index) => (
                <TableRow key={index}>
                  <TableCell>{origin}</TableCell>
                  <TableCell>{destination}</TableCell>
                  <TableCell>{train.horaSalida}</TableCell>
                  <TableCell>{train.horaLlegada}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default App;