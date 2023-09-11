import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Modal,
  Backdrop,
  Card,
  Collapse,
  Typography,
  CardContent,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "15px",
    color: "#000040",
    backgroundColor: "#F6F6F8",
    borderRadius: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    paddingLeft: "5px",
    display: "flex",
    alignItems: "center",
    minHeight: "30px",
    cursor: "pointer",
    "&:hover": {
      boxShadow: theme.shadows[5],
      transition: "box-shadow 0.3s ease-in-out",
    },
  },
  orderId: {
    color: "#000040",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0px",
  },
  billQuantity: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  dropIcon: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productList: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  verticalCenter: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonWidth: {
    minWidth: "24px",
    padding: "0px",
    height: "80%",
  },
  pLeft10: {
    paddingLeft: "10px",
  },
}));

export default function WarehouseItem(props) {
  const { warehouse } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={3}
        className={clsx(classes.orderId, classes.verticalCenter)}
      >
        <Typography>Warehouse {warehouse.id}</Typography>
      </Grid>
      <Grid item xs={3} className={classes.verticalCenter}>
        <Typography>{warehouse.address}</Typography>
      </Grid>
      <Grid item xs={3} className={classes.verticalCenter}>
        <Typography>
          {warehouse.products.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)}
        </Typography>
      </Grid>
      <Grid item xs={3} className={classes.verticalCenter}>
        <Typography>
          {warehouse.capacity}
        </Typography>
      </Grid>
    </Grid>
  );
}
