import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

function StationSelect({ stations, onChange }) {
  const handleSelectChange = (event, values) => {
    const origin = values[0] ? values[0].CÓDIGO : null;
    const destination = values[1] ? values[1].CÓDIGO : null;
    onChange(origin, destination);
  };

  return (
    <Autocomplete
      multiple
      limitTags={2}
      options={stations}
      getOptionLabel={(option) => option.DENOMINACION}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Estaciones" />
      )}
      onChange={handleSelectChange}
    />
  );
}

export default StationSelect;
