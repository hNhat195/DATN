import React, { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const SelectWithInput = ({newFabric, setNewFabric}) => {
  const [value, setValue] = useState(null);

  const handleInputChange = (event, newValue) => {
    setValue(newValue);
    setNewFabric({...newFabric, collection: newValue})
    console.log(newValue)
    // console.log(newValue)
  };

  const handleInputText = (e) => {
    setNewFabric({...newFabric, collection: e.target.value})
    console.log(e.target.value)
  }

  return (
    <Autocomplete
      value={value}
      onChange={handleInputChange}
      freeSolo
      options={['Linen', 'Silk', 'Merino']}
      renderInput={(params) => (
        <TextField {...params} label="Loại vải" variant="outlined" onChange={handleInputText} />
      )}
    />
  );
};

export default SelectWithInput;