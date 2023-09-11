import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

import { makeStyles, styled } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";
import CreateForm from "./components/CreateForm";
import OrderTable from "./components/OrderTable";
import Announcement from "../../components/SellingPages/Announcement";
import Navbar from "../../components/SellingPages/Navbar";
import Footer from "../../components/SellingPages/Footer";
import productApi from "../../api/productApi";
import fabricTypeAPI from "../../api/fabricTypeApi";
import cartUtil from "../../utils/cart";
import Navbar2 from "../../components/SellingPages/DropdownBar/Navbar.js";

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
  orderDetailBox: {},
  parent: {
    height: "800px",
  },
  contentContainer: {
    height: "70%",
    paddingTop: "30px",
  },
}));

export default function HomeCreateOrder() {
  const classes = useStyles();

  const [allMaterials, setAllMaterials] = useState([]);
  const [allFabricTypes, setAllFabricTypes] = useState([]);
  const [allFabricColors, setAllFabricColors] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [productList, setProductList] = useState([]);

  const [cartNumber, setCartNumber] = useState(cartUtil.getCartNumber());

  //set productList and cart in localStorage when add product to cart
  //we define 3 methods: add, update, remove
  const syncProductList = (product, quantity, method) => {
    if (method === "add") {
      let temp = cartUtil.addProductToCart(product, quantity);
      setProductList(temp);
    } else if (method === "update") {
      let temp = cartUtil.updateProductQuantity(product._id, quantity);
      setProductList(temp);
    } else if (method === "remove") {
      let temp = cartUtil.removeProductFromCart(product._id);
      setProductList(temp);
    }
    setCartNumber(cartUtil.getCartNumber());
  };

  const getMaterialsFromFabricTypes = (fabricTypes) => {
    let materials = [];
    fabricTypes.forEach((fabricType) => {
      if (!materials.includes(fabricType.material)) {
        materials.push(fabricType.material);
      }
    });
    return materials;
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await productApi.getAllProducts();
      setAllProducts(response);
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchAllFabricTypes = async () => {
      const fabricTypes = await fabricTypeAPI.getAllFabricTypes();
      setAllFabricTypes(fabricTypes);
      setAllMaterials(getMaterialsFromFabricTypes(fabricTypes));
    };
    fetchAllFabricTypes();
  }, []);

  useEffect(() => {
    const fetchAllFabricColors = async () => {
      const response = await productApi.getAllColorCode();
      setAllFabricColors(response);
    };
    fetchAllFabricColors();
  }, []);

  useEffect(() => {
    setProductList(cartUtil.getCart());
  }, []);

  return (
    <div className={classes.parent}>
      <Announcement></Announcement>
      <Navbar cartNumber={cartNumber}></Navbar>
      <Navbar2></Navbar2>
      <div className={classes.contentContainer}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography variant="h4" className={classes.titlePage}></Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.root}>
          <Grid item md={1}></Grid>
          <Grid item xs={12} md={4}>
            <CreateForm
              allMaterials={allMaterials}
              allFabricTypes={allFabricTypes}
              allFabricColors={allFabricColors}
              allProducts={allProducts}
              productList={productList}
              syncProductList={syncProductList}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <OrderTable
              productList={productList}
              syncProductList={syncProductList}
            />
          </Grid>
          <Grid item md={1}></Grid>
        </Grid>
      </div>
      <Footer></Footer>
    </div>
  );
}
