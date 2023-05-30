import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


import OrderTableItem from "./OrderTableItem";

export default function OrderTable({
  productList,
  setProductList,
}) {
  // 
  
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Chất liệu</TableCell>
            <TableCell align="left">Mã màu</TableCell>
            <TableCell align="left">Số cây vải</TableCell>
            <TableCell align="left"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((row, index) => (
            <OrderTableItem row={row} key={index} index={index} productList={productList} setProductList={setProductList}></OrderTableItem>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
