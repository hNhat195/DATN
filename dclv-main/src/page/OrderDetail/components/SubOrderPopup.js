import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Grid,
  Typography,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  orderInfoBox: {
    backgroundColor: "#F6F6F8",
    borderRadius: "5px",
    padding: "10px",
    fontFamily: "'Roboto', sans-serif",
    height: "100%",
  },
  title: {
    color: "#000040",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  totalMoney: {
    color: "#000040",
    fontSize: "20px",
    fontWeight: "bolder",
  },
  alignMoneyRight: {
    textAlign: "right",
  },
  estimateMoney: {
    color: "#000040",
    fontSize: "16px",
    fontWeight: "bolder",
  },
  productScroll: {
    padding: "0",
    maxHeight: "350px",
    minHeight: "349px",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  lengthField: {
    height: "30px",
    width: "100px",
    border: "0",
    // "&[disabled]": {
    //   opacity: '1',
    // }
  },
});

export default function SubOrderPopup({ products }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [subProductsList, setSubProductsList] = useState();
  
  const handleClickOpen = () => {
    setOpen(true);
    console.log(products);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    setOpen(false);
  };

  const handleQuantity = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    let tempArr = []
    for(let i=0; i<products.length;i++) {
        let temp = products[i];
        temp.quantity = 0
        tempArr.push(temp)
    }
    setSubProductsList(tempArr)
  }, [])

  useEffect(() => {
    console.log(subProductsList)
  }, [subProductsList])

  return (
    <span>
      <Button variant="outline" onClick={handleClickOpen}>
        Tạo suborder
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle>Tạo suborder</DialogTitle>
        <DialogContent>
          <DialogContentText>Chia nhỏ đơn hàng</DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <TableContainer component={Paper} className={classes.productScroll}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Loại vải</TableCell>
                  <TableCell>Mã màu</TableCell>
                  <TableCell>Đã đặt (cuộn)</TableCell>
                  <TableCell>Đã chia (cuộn)</TableCell>
                  <TableCell>Còn lại (cuộn)</TableCell>
                  <TableCell>Nhập số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((item, idx) => (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle2">{idx + 1}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography variant="subtitle2">
                        {item.fabricID.fabricTypeId.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {item.fabricID.colorId.colorCode}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {Number.parseInt(item.quantity)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {Number.parseInt(item.shipped)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {Number.parseInt(item.quantity) -
                          Number.parseInt(item.shipped)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        defaultValue={item.quantity}
                        onChange={(e) => handleQuantity(e)}
                        min="0"
                        step="1"
                        className={classes.lengthField}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleCreate}>Tạo</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
