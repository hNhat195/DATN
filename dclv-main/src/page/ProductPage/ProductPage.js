import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { Grid } from "@material-ui/core";
import SearchField from "../../components/SearchField";
import NotificationButton from "../../components/Button/NotificationButton";
import productApi from "../../api/productApi";
import ListTypeHeader from "./components/ListTypeHeader";
import TypeItem from "./components/TypeItem";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    padding: "16px",
  },
  productList: {
    marginTop: "16px",
  },
  notiSearch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
function Product() {
  const classes = useStyles();
  const { type } = useParams();
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    warehouse: "",
    type: "",
    lot: "",
  });

  useEffect(() => {
    let mounted = true;

    const handleFilter = (products) => {
      if (filter.warehouse !== "")
        products = products.filter(
          (item) => item.warehouseId === filter.warehouse
        );
      if (filter.type !== "")
        products = products.filter(
          (item) => item.item.fabricType.name === filter.type
        );
      if (filter.lot !== "")
        products = products.filter((item) => item.lot === filter.lot);

      return products;
    };

    const fetchProduct = async () => {
      const params = {};
      const response = await productApi.getAll(params);
      if (mounted) {
        setProduct(handleFilter(response));
        setData(response);
      }
    };
    fetchProduct();
    return () => {
      mounted = false;
    };
  }, [filter]);

  return (
    <div className={classes.root}>
      <h1>{type}</h1>
      <Grid container>
        <Grid item sm={6} md={8}>
          {/* <Filter
            handleFilterChange={handleFilterChange}
            filter={filter}
            data={data}
          /> */}
        </Grid>
        <Grid item sm={6} md={4} className={classes.notiSearch}>
          <Grid item xs={2}>
            <NotificationButton />
          </Grid>
          <Grid item xs={10}>
            <SearchField />
          </Grid>
        </Grid>
      </Grid>
      <ListTypeHeader />
      {product?.map((item, idx) => (
        <TypeItem key={idx} fabricType={item} />
      ))}
    </div>
  );
}

export default Product;
