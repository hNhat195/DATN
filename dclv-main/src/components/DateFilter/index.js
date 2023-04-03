import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#F6F6F8",
    borderRadius: "5px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
export default function DateFilter({ onChange }) {
  const classes = useStyles();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
    onChange({ startDate: newStartDate, endDate });
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
    onChange({ startDate, endDate: newEndDate });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item className={classes.container}>
          <TextField
            id="begin-date"
            label="Từ đầu ngày"
            type="date"
            maxDate={new Date()}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleStartDateChange}
          />
        </Grid>
        <Grid item className={classes.container}>
          <TextField
            id="end-date"
            label="Đến cuối ngày"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleEndDateChange}
          />
        </Grid>
      </Grid>
    </>
  );
}
