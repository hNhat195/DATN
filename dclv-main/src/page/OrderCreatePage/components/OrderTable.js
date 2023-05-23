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
import EditPopup from "./EditPopup";

export default function OrderTable({ productList, setProductList }) {
  const handleEdit = (index) => {
    console.log("Editingggggg")
    console.log(index)
  }
  const handleDelete = (index) => {
    console.log("Deletingggggg")
    console.log(index)
  }
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
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {productList[index].typeId}
              </TableCell>
              <TableCell align="left">{row.colorCode}</TableCell>
              <TableCell align="left">{row.length}</TableCell>
              <TableCell>
                <EditPopup index={index} productList={productList} setProductList={setProductList} row={row}/>
                <button className="trash-btn" onClick={() => handleDelete(index)}>
                  <CancelIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
