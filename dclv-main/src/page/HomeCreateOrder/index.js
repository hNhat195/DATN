import { Grid, Typography, Container } from "@material-ui/core";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import CreateForm from "./components/CreateForm";
import OrderTable from "./components/OrderTable";

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
    <Container maxWidth="xl" className={classes.orderDetailBox}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Typography variant="h4" className={classes.titlePage}></Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} md={6}>
          <Grid item xs={12} md={12}>
            <CreateForm
              productList={productList}
              setProductList={setProductList}
              colorList={colorList}
              setColorList={setColorList}
              materialList={materialList}
              setMaterialList={setMaterialList}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <OrderTable
            productList={productList}
            setProductList={setProductList}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
