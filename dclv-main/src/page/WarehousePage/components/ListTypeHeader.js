import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "15px",
    fontWeight: "bold",
    color: "#000040",
    backgroundColor: "#B4B4C1",
    borderRadius: "5px",
    height: "50px",
    marginTop: "20px",
    marginBottom: "10px",
    paddingLeft: "5px",
  },
  alignTextCenter: {
    textAlign: "center",
  },
  dropIcon: {
    textAlign: "center",
  },
  verticalCenter: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  productList: {
    justifyContent: "center",
    direction: "row",
    display: "flex",
    alignItems: "center",
  },
});

export default function ListTypeHeader() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={3}
        className={clsx(classes.verticalCenter)}
      >
        <p>Tên</p>
      </Grid>
      <Grid item xs={3} className={classes.verticalCenter}>
        <p>Địa chỉ</p>
      </Grid>
      <Grid item xs={3} className={classes.verticalCenter}>
        <p>Số cây vải</p>
      </Grid>
      <Grid item xs={3} className={classes.verticalCenter}>
        <p>Sức chứa</p>
      </Grid>
    </Grid>
  );
}
