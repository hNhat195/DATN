import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@material-ui/core";
import "./styled.css";
import OrderTableItem from "./OrderTableItem";

export default function OrderTable({ productList, setProductList }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Chi tiết
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
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
            {productList.map((row, index) => (
              <OrderTableItem
                row={row}
                key={index}
                index={index}
                productList={productList}
                setProductList={setProductList}></OrderTableItem>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
