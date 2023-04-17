import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/system";
import TrainRow from "./TrainRow";
import { getTrains } from "../services/renfeAPI";

const CustomTableHeadCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  whiteSpace: "pre-wrap",
  textAlign: "center",
}));

const TrainList = ({ origin, destination }) => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };


  useEffect(() => {
    if (origin && destination) {
      setLoading(true);
      const fetchTrains = async () => {
        console.log("GET TRAINS ORIGIN:" + JSON.stringify(origin));
        const fetchedTrains = await getTrains(origin, destination);
        setTrains(fetchedTrains);
        setLoading(false);
      };
      fetchTrains();
    } else {
      setTrains([]);
    }
  }, [origin, destination]);

  if (loading) {
    return <Typography variant="h6">Cargando trayectos...</Typography>;
  }

  if (trains.length === 0) {
    return <Typography variant="h6">No se ha encontrado ningún tren.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <CustomTableHeadCell>Línea</CustomTableHeadCell>
            <CustomTableHeadCell>Tren</CustomTableHeadCell>
            <CustomTableHeadCell>Hora<br />Salida<br />EST</CustomTableHeadCell>
             <CustomTableHeadCell className={selectedRow !== null ? '' : 'hidden'}>Hora<br />Salida<br />REAL</CustomTableHeadCell>
            <CustomTableHeadCell>Hora<br />Llegada<br />EST</CustomTableHeadCell>
            <CustomTableHeadCell  className={selectedRow !== null ? '' : 'hidden'}>Hora<br />Llegada<br />REAL</CustomTableHeadCell>
            <CustomTableHeadCell>Duración<br />EST</CustomTableHeadCell>
            <CustomTableHeadCell className={selectedRow !== null ? '' : 'hidden'}>Hora<br />Llegada<br />REAL</CustomTableHeadCell>
            <CustomTableHeadCell>Duración<br />REAL</CustomTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trains.map((train, index) => (
                <TrainRow
                key={train.cdgoTren}
                rowData={train}
                rowIndex={index}
                isSelected={selectedRow === null || selectedRow === index}
                onRowClick={handleRowClick} />
                ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrainList;
