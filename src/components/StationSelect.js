import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const StationSelect = ({ stations, label, value, onChange }) => {
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      options={stations}
      getOptionLabel={(option) => option.DESCRIPCION}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default StationSelect;