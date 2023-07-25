import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SortBy() {
  const [age, setAge] = React.useState(1);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 200, margin: 0, marginBottom: 4 }}
        size="small"
      >
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={0}>Best Selling</MenuItem>
          <MenuItem value={1}>Price Low to High</MenuItem>
          <MenuItem value={2}>Price High to Low</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
