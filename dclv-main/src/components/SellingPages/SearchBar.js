import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import productApi from "../../api/productApi";

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

export default function SearchField({ onChange, searchWord, setSearchWord }) {
  const classes = useStyles();
  const handleKeywordChange = (event) => {
    const newKeyword = event.target.value;
    // setKeyword(newKeyword);
    // onChange(newKeyword);
  };
  const handleSearch = (event) => {
    // if(event.key === "Enter") {
      setSearchWord(event.target.value)
    // }
  }
  
  return (
    <>
      <Box className={classes.box}>
        <TextField
          className={classes.textField}
          id="input-with-icon-textfield"
          placeholder="Search"
          onChange={(e) => handleSearch(e)}
          // onKeyDown={handleSearch}
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
