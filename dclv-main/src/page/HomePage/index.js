import { Button, Grid, Typography, Container } from "@material-ui/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack, ArrowUpward, Cancel, Publish } from "@material-ui/icons";
import { useHistory, useParams } from "react-router-dom";

import ProductList from "./components/ProductList";
import TopBar from "./components/TopBar";
import SelectHover from "./components/SelectHover";
const useStyles = makeStyles((theme) => ({
  alignStatusRight: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
  },
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "#fafafb",
      color: theme.palette.primary.main,
    },
  },
  container: {
    display: "flex",
  },
  btnGroup: {
    justifyContent: "flex-end",
  },
  titlePage: {
    fontWeight: "bold",
    color: "#000040",
  },
  btnCancel: {
    backgroundColor: "#EAECFF",
    color: "#696983",
    "&:hover": {
      backgroundColor: "red",
      color: "black",
    },
    textTransform: "none",
    padding: theme.spacing(1.5),
  },
  btnCancelTitle: {
    ...theme.typography.buttonPrimary,
  },
  orderDetailBox: {
    padding: "10px",
  },
}));

const itemList = ["option 1", "option 2", "option 3", "option 4"];

export default function OrderDetail() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <TopBar></TopBar>
      {/* <SelectHover options={itemList}></SelectHover> */}
      <ProductList></ProductList>
    </div>
  );
}
