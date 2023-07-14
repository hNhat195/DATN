import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./styled.css";
import OrderTableItem from "./OrderTableItem";

export default function OrderTable({ productList, setProductList }) {
  //

  return (
    // <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
    //   <Table sx={{ minWidth: 450 }} aria-label="simple table" stickyHeader>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell className="order-table">Chất liệu</TableCell>
    //         <TableCell align="left" className="order-table">Mã màu</TableCell>
    //         <TableCell align="left" className="order-table">Số cây vải</TableCell>
    //         <TableCell align="left" className="order-table"> </TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {productList.map((row, index) => (
    //         <OrderTableItem row={row} key={index} index={index} productList={productList} setProductList={setProductList}></OrderTableItem>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>

    // <div class="container">
    //   <ul class="responsive-table">
    //     <li class="table-header">
    //       <div class="col col-1">Chất liệu</div>
    //       <div class="col col-2">Mã màu</div>
    //       <div class="col col-3">Số cây vải</div>
    //       <div class="col col-4"></div>
    //     </li>
    //     {productList.map((row, index) => (
    //         <OrderTableItem row={row} key={index} index={index} productList={productList} setProductList={setProductList}></OrderTableItem>
    //       ))}

    //   </ul>
    // </div>
    <div>
      <h2 className="table-title">Các sản phẩm đã tạo</h2>
    <table>
      <thead>
        <tr>
          <td width="300px" className="border-right">Chất liệu</td>
          <td width="160px" className="border-right">Mã màu</td>
          <td width="60px" className="border-right">Số cây vải</td>
          <td width="180px"></td>
        </tr>
      </thead>
      <tbody>
        {productList.map((row, index) => (
          <OrderTableItem
            row={row}
            key={index}
            index={index}
            productList={productList}
            setProductList={setProductList}
          ></OrderTableItem>
        ))}
      </tbody>
    </table>
    </div>
  );
}
