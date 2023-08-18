import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Container } from "@material-ui/core";
import SearchField from "../../components/SearchField";
import NotificationButton from "../../components/Button/NotificationButton";
import ListTypeHeader from "./components/ListTypeHeader";
import { useHistory, useParams } from "react-router-dom";
import warehouseApi from "../../api/warehouseApi";
import WarehouseItem from "./components/WarehouseItem";

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
function WarehousePage() {
  const classes = useStyles();
  const {type} = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchWarehouse = async () => {
      const response = await warehouseApi.getAllWarehouse();
      console.log(response)
      if (mounted) {
        setData(response);
      }
    };
    fetchWarehouse();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={classes.root}>
      <h1>{type}</h1>
      <Grid container>
        <Grid item sm={6} md={8}>
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
      {data?.map((item, idx) => (
        <WarehouseItem key={idx} warehouse={item} />
      ))}
    </div>
  );
}

export default WarehousePage;
