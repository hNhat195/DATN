//import Pagination from "src/components/Pagination";
//import AsideFilter from "./components/AsideFilter";
import Product from "./Product";
//import SortProductList from "./components/SortProductList";
import orderApi from "../../../api/orderApi";
import { useState, useEffect } from "react";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import ListPagination from "../../../components/ListPagination";
import { makeStyles } from "@material-ui/core/styles";

const pageSize = 9;

const useStyles = makeStyles((theme) => ({
  paginationStyled: {
    display: "block",
    margin: "0 auto",
  },
  containerStyled: {
    minHeight: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridStyled: {
    minHeight: "550px",
  },
}));

export default function ProductList() {
  const [productsData, setProductsData] = useState([]);
  const [orderPerPage, setOrderPerPage] = useState([]);
  const [filter, setFilter] = useState("all");
  const classes = useStyles();
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await orderApi.getAll(1, 100);
      setProductsData(response);
      setOrderPerPage(response.slice(0, pageSize));
    };
    fetchOrder();
  }, []);

  useEffect(() => {
    console.log(productsData);
  }, [productsData]);

  return (
    <Grid container className={classes.containerStyled}>
      <Grid item xs={3}></Grid>
      <Grid item container xs={9} className={classes.gridStyled}>
        {orderPerPage?.map((product) => (
          <Grid item xs={4}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
      <Grid className={classes.containerStyled}>
        <ListPagination
          className={classes.paginationStyled}
          pageSize={pageSize}
          itemList={productsData}
          setItemList={setProductsData}
          itemPerPage={orderPerPage}
          setItemPerPage={setOrderPerPage}
          filter={filter}
        />
      </Grid>
    </Grid>
  );
}
