import React from "react";
import { TextField, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { getStations } from "../services/renfeAPI";

const StationSelect = ({ label, value, onChange }) => {
  const [stations, setStations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStations = async () => {
      const fetchedStations = await getStations();
      setStations(fetchedStations);
      setLoading(false);
    };
    fetchStations();
  }, []);

  const handleSelectionChange = (event, newValue) => {
    onChange(newValue);
  };

  const hasDuplicates = (stations, station) => {
    return stations.filter((s) => s.DESCRIPCION === station.DESCRIPCION).length > 1;
  };

  return (
    <Autocomplete
      options={stations}
      value={value}
      getOptionLabel={(station) =>
        hasDuplicates(stations, station)
          ? `${station.DESCRIPCION.toUpperCase()} - ${station.CÓDIGO}`
          : station.DESCRIPCION.toUpperCase() || ""
      }
      onChange={handleSelectionChange}
      fullWidth
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default StationSelect;
