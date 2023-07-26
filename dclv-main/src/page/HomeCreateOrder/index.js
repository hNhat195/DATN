import { Grid, Typography, Container } from "@material-ui/core";
import { useState } from "react";

import { makeStyles, styled } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import CreateForm from "./components/CreateForm";
import OrderTable from "./components/OrderTable";
import Announcement from "../../components/SellingPages/Announcement";
import Navbar from "../../components/SellingPages/Navbar";
import Navbar2 from "../../components/SellingPages/DropdownBar/Navbar.js";
import Footer from "../../components/SellingPages/Footer";

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

  },
  parent: {
    height: "800px",
  },
  contentContainer: {
    height: "70%",
    paddingTop: "30px"
  }
}));

export default function HomeCreateOrder() {
  const classes = useStyles();
  const history = useHistory();

  const [colorList, setColorList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [productList, setProductList] = useState([]);

  const handleBack = () => {
    history.push(`/order`);
  };

  return (
    <div className={classes.parent}>
      <Announcement></Announcement>
      <Navbar></Navbar>
      
      <div className={classes.contentContainer}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography variant="h4" className={classes.titlePage}></Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.root}>
          <Grid item md={1}>
          </Grid>
          <Grid item xs={12} md={4}>
            <CreateForm
              productList={productList}
              setProductList={setProductList}
              colorList={colorList}
              setColorList={setColorList}
              materialList={materialList}
              setMaterialList={setMaterialList}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OrderTable
              productList={productList}
              setProductList={setProductList}
            />
          </Grid>
          <Grid item md={1}>
          </Grid>
        </Grid>
      </div>
      <Footer></Footer>
    </div>
  );
}
