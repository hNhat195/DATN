import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@material-ui/core";
import "./styled.css";
import OrderTableItem from "./OrderTableItem";
import CreateButtonPopup from "./CreateButtonPopup";
import { makeStyles } from "@material-ui/core/styles";
import cartUtil from "../../../utils/cart";

const useStyles = makeStyles((theme) => ({
  spaceBlank: {
    height: "35px",
  },
  tableHeight: {
    height: "300px",
  },
}));

export default function OrderTable({ productList, syncProductList }) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Chi tiết
      </Typography>
      <Grid className={classes.tableHeight}>
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell width="200px">Chất liệu</TableCell>
                <TableCell width="150px" align="left">
                  Mã màu
                </TableCell>
                <TableCell width="80px" align="left">
                  Số lượng
                </TableCell>
                <TableCell width="170px" align="left">
                  {" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList?.map((row, index) => (
                <OrderTableItem
                  row={row}
                  key={index}
                  index={index}
                  productList={productList}
                  syncProductList={syncProductList}
                ></OrderTableItem>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid className={classes.spaceBlank}></Grid>
      <Grid container>
        <Grid item xs={10}></Grid>
        <Grid item>
          <CreateButtonPopup productList={productList}></CreateButtonPopup>
        </Grid>
      </Grid>
    </div>
  );
}
