import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from '@mui/icons-material/Check';
import { makeStyles } from "@material-ui/core/styles";
import orderApi from "../../../api/orderApi";
import { useState, useEffect, useRef } from "react";
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import { useHistory } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';


// import {TextField} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  changeButton: {
    '&:hover': {
      color: 'rgb(252, 186, 3)',
    },
  },
  deleteButton: {
    '&:hover': {
      color: 'rgb(245, 66, 51)',
    },
  },
  acceptButton: {
    '&:hover': {
      color: 'rgb(11, 214, 38)',
    },
  },
  checkIcon: {
    color: 'rgb(11, 214, 38)',
    border: '2px solid rgb(11, 214, 38)',
    borderRadius: '50%',

  },
  errorIcon: {
    color: 'rgb(245, 66, 51)',
    border: '3px solid rgb(245, 66, 51)',
    borderRadius: '50%',
    marginTop: "10px",
    marginBottom: "20px"
  },
  divContainer: {
    padding: "20px"
  },
  popupContainer: {
    margin: "0 auto",
    justifyContent: "center",
    textAlign: "center"
  }
}));

function OrderPopup({ open, closePopup }) {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={closePopup} maxWidth="xs" fullWidth>
      <DialogTitle>Thành công</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.popupContainer}>
          <CheckIcon sx={{ fontSize: 40 }} className={classes.checkIcon}></CheckIcon>
          <h5>Tạo đơn hàng thành công</h5>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="outline" onClick={closePopup} className={classes.acceptButton}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

function ErrorPopup({ open, closePopup, errorMessage }) {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={closePopup} maxWidth="xs" fullWidth>
      <DialogTitle>Lỗi</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.popupContainer}>
          <CloseIcon sx={{ fontSize: 40 }} className={classes.errorIcon}></CloseIcon>
          <h5>{errorMessage}</h5>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="outline" onClick={closePopup} className={classes.deleteButton}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CreateButtonPopup({ productList }) {
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [fullname, setFullname] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const classes = useStyles();
  const history = useHistory();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const closePopup = () => {
    setOpenPopup(false)
    setOpen(false);
    history.push(`/`);
  }
  const closeErrorPopup = () => {
    setErrorPopup(false);
  }
  const postOrder = async (postData) => {
    const response = await orderApi.create(postData);
    return response;
  };
  const handleCreate = async (event) => {
    if (fullname.trim() == "" || email.trim() == "" || phone.trim() == "" || address.trim() == "") {
      setErrorMessage("Vui lòng nhập thông tin cá nhân hợp lệ")
      setErrorPopup(true);
    }
    else {
      if (productList.length > 0) {
        let postData = {
          note: "",
          receiverName: fullname,
          receiverPhone: phone,
          deposit: 10,
          clientID: null,
          products: productList,
          receiverAddress: address,
        };
        // await postOrder(postData);
        // event.preventDefault();
        setOpenPopup(true)
        // setOpen(false);
        // history.push(`/`);
      } else {
        setErrorMessage("Vui lòng thêm sản phẩm để tạo đơn hàng")
        setErrorPopup(true);
      } 
    }
  }

  return (
    <span>
      <Button variant="outline" onClick={handleClickOpen} className={classes.changeButton} title="Tạo đơn hàng">
        Tạo đơn
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Tạo đơn hàng</DialogTitle>
        <DialogContent>

          <div className={classes.divContainer}>
            <InputLabel htmlFor="fullname">Họ và tên</InputLabel>
            <Input id="fullname" required fullWidth onChange={(e) => { setFullname(e.target.value) }}></Input>
          </div>

          <div className={classes.divContainer}>
            <InputLabel htmlFor="phone">Số điện thoại</InputLabel>
            <Input id="phone" required fullWidth onChange={(e) => setPhone(e.target.value)}></Input>
          </div>

          <div className={classes.divContainer}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" required fullWidth onChange={e => setEmail(e.target.value)}></Input>
          </div>

          <div className={classes.divContainer}>
            <InputLabel htmlFor="address">Địa chỉ</InputLabel>
            <Input id="address" required fullWidth onChange={e => setAddress(e.target.value)}></Input>
          </div>

          {openPopup && <OrderPopup open={openPopup} closePopup={closePopup}></OrderPopup>}
          {errorPopup && <ErrorPopup open={errorPopup} closePopup={closeErrorPopup} errorMessage={errorMessage}></ErrorPopup>}
          <DialogActions>
            <Button className={classes.deleteButton} variant="outline" onClick={handleClose}>Hủy</Button>
            <Button className={classes.acceptButton} variant="outline" onClick={handleCreate}>Tạo</Button>
          </DialogActions>
        </DialogContent>


      </Dialog>
    </span>
  );
}
