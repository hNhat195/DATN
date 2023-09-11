import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { Grid } from "@material-ui/core";
import SearchField from "../../components/SearchField";
import NotificationButton from "../../components/Button/NotificationButton";
import productApi from "../../api/productApi";
import ListTypeHeader from "./components/ListTypeHeader";
import TypeItem from "./components/TypeItem";
import { useHistory, useParams } from "react-router-dom";
import { async } from "validate.js";
import ListPagination from "../../components/ListPagination";
import SelectWithInput from "./components/SelectWithInput";
import CreatePopup from "./components/CreatePopup";

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
  const [perPage, setPerPage] = useState([]);
  const [product, setProduct] = useState([]);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    warehouse: "",
    type: "",
    lot: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await productApi.getAll();
      // console.log(response)
      setProduct(response);
      setFilter(response);
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <h1>{type}</h1>
      <Grid container>
        <Grid item sm={6} md={8} className={classes.notiSearch}>
          <CreatePopup setRefresh={true}></CreatePopup>
          {/* <Filter
            handleFilterChange={handleFilterChange}
            filter={filter}
            data={data}
          /> */}
        </Grid>
        <Grid item sm={6} md={4} className={classes.notiSearch}>
          <Grid item xs={8}></Grid>
          <Grid item xs={2}>
            <NotificationButton />
          </Grid>
          <Grid item xs={10}>
            <SearchField />
          </Grid>
        </Grid>
      </Grid>
      {/* <SelectWithInput></SelectWithInput> */}
      <ListTypeHeader />
      {perPage?.length > 0 &&
        perPage?.map((item, idx) => <TypeItem key={idx} fabricType={item} />)}
      <ListPagination
        pageSize={10}
        itemList={product}
        setItemList={setProduct}
        itemPerPage={perPage}
        setItemPerPage={setPerPage}
        filter={filter}
      />
    </div>
  );
}

export default Product;
