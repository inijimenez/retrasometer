import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const StationSelect = ({ stations, label, value, onChange }) => {
  return (
    <Box>
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      options={stations}
      getOptionLabel={(option) => option.DESCRIPCION}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
    </Box>
  );
};

export default StationSelect;