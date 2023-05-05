import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CancelIcon from '@mui/icons-material/Cancel';

export default function OrderTable({ productList, setProductList }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
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
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.typeId}
              </TableCell>
              <TableCell align="left">{row.colorCode}</TableCell>
              <TableCell align="left">{row.length}</TableCell>
              <TableCell>
                <button className="complete-btn">
                  <BorderColorIcon/>
                </button>
                <button className="trash-btn">
                  <CancelIcon/>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
