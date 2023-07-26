import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles({
  box: {
    display: "flex",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: "25px",
    paddingLeft: "10px",
    paddingRight: "12px",
  },
});

export default function SearchField({ onChange }) {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (event) => {
    const newKeyword = event.target.value;
    // setKeyword(newKeyword);
    // onChange(newKeyword);
  };
  return (
    <>
      <Box className={classes.box}>
        <TextField
          className={classes.textField}
          id="input-with-icon-textfield"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          fullWidth
          // onChange={handleKeywordChange}
        />
      </Box>
    </>
  );
}
