import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SortBy({sortBy, setSortBy}) {

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 200, margin: 0, marginBottom: 4 }}
        size="small"
      >
        <Select
          value={sortBy}
          onChange={(event) => handleChange(event)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={'best'}>Best Selling</MenuItem>
          {/* <MenuItem value={'asc'}>Price Low to High</MenuItem>
          <MenuItem value={'desc'}>Price High to Low</MenuItem> */}
          <MenuItem value={'nameAsc'}>Name: A-Z</MenuItem>
          <MenuItem value={'nameDesc'}>Name: Z-A</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
