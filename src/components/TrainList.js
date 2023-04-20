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
  const [columnsHidden, setColumnsHidden] = useState({ D: true, F: true, H: true, I: true });

  const onRowClick = (index) => {
    console.log("onRowClick " + index);

    if (selectedRow === null) {
      console.log("onRowClick A");
      setSelectedRow(index);
      setColumnsHidden({ ...columnsHidden, D: false, F: false, H: false, I:false });
    } else if (selectedRow === index) {
      console.log("onRowClick B");
      //setSelectedRow(null);
      //setColumnsHidden({ ...columnsHidden, D: true, F: true, H: true, I: true });
    } else {
      console.log("onRowClick C");
      setSelectedRow(index);
    }
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
            <CustomTableHeadCell>Hora Salida<br />EST</CustomTableHeadCell>
            {!columnsHidden.D && <CustomTableHeadCell>Hora Salida<br />REAL</CustomTableHeadCell>}
            <CustomTableHeadCell>Hora Llegada<br />EST</CustomTableHeadCell>
            {!columnsHidden.F && <CustomTableHeadCell>Hora Llegada<br />REAL</CustomTableHeadCell>}
            <CustomTableHeadCell>Duración<br />EST</CustomTableHeadCell>
            {!columnsHidden.H && <CustomTableHeadCell>Duración<br />REAL</CustomTableHeadCell>}
            {!columnsHidden.I && <CustomTableHeadCell>Retraso</CustomTableHeadCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {trains.map((train, index) => (
                <TrainRow
                key={train.cdgoTren}
                data={train}
                hiddenColumns={columnsHidden}
                visible={selectedRow === null || selectedRow === index}
                onClick={() => onRowClick(index)} />
                ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrainList;
