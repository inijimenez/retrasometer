import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Select, MenuItem, FormControl, InputLabel, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import SelectSearch from 'react-select';

const RetrasoMeter = () => {
    const [estaciones, setEstaciones] = useState([]);
    const [origen, setOrigen] = useState(null);
    const [destino, setDestino] = useState(null);
    const [trenes, setTrenes] = useState([]);

    useEffect(() => {
        const fetchEstaciones = async () => {
            try {
                const response = await axios.post('https://data.renfe.com/api/3/action/datastore_search', {
                    "resource_id": "daa68d9b-77cf-4024-890f-285d31184c5a",
                    "q": "",
                    "filters": {},
                    "limit": 93,
                    "offset": 0
                });
                const estacionesSorted = response.data.result.records.sort((a, b) => a.DESCRIPCION.localeCompare(b.DESCRIPCION));
                setEstaciones(estacionesSorted);
            } catch (error) {
                console.error('Error fetching estaciones:', error);
            }
        };
        fetchEstaciones();
    }, []);

    const buscarTrenes = async (e) => {
        e.preventDefault();
        if (!origen || !destino) return;
        try {
            const fechaActual = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            const response = await axios.post('https://horarios.renfe.com/cer/HorariosServlet', {
                "nucleo": "10",
                "origen": origen.CÓDIGO,
                "destino": destino.CÓDIGO,
                "fchaViaje": fechaActual,
                "validaReglaNegocio": true,
                "tiempoReal": true,
                "servicioHorarios": "VTI",
                "horaViajeOrigen": new Date().getHours() - 1,
                "horaViajeLlegada": new Date().getHours() + 1,
                "accesibilidadTrenes": true
            });
            setTrenes(response.data.horario);
        } catch (error) {
            console.error('Error fetching trenes:', error);
        }
    };

    const renderEstaciones = () => {
        return estaciones.map((estacion) => (
            <MenuItem key={estacion.CÓDIGO} value={estacion}>
                {estacion.DESCRIPCION}
            </MenuItem>
        ));
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    RetrasoMeter
                </Typography>
                <form onSubmit={buscarTrenes}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="origen-label">Estación de origen</InputLabel>
                                <Select
                                    labelId="origen-label"
                                    id="origen-select"
                                    value={origen}
                                    onChange={(e) => setOrigen(e.target.value)}
                                    label="Estación de origen"
                                >
                                    {renderEstaciones()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="destino-label">Estación de destino</InputLabel>
                                <Select
                                    labelId="destino-label"
                                    id="destino-select"
                                    value={destino}
                                    onChange={(e) => setDestino(e.target.value)}
                                    label="Estación de destino"
                                >
                                    {renderEstaciones()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Buscar trenes
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tren</TableCell>
                                <TableCell>Salida</TableCell>
                                <TableCell>Llegada</TableCell>
                                <TableCell>Retraso</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trenes.map((tren) => (
                                <TableRow key={tren.numTren}>
                                    <TableCell>{tren.numTren}</TableCell>
                                    <TableCell>{tren.horaSalida}</TableCell>
                                    <TableCell>{tren.horaLlegada}</TableCell>
                                    <TableCell>{tren.retraso} min</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default RetrasoMeter;