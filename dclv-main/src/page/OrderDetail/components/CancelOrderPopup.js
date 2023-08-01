import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import orderApi from "../../../api/orderApi";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    '&:hover': {
      color: 'rgb(245, 66, 51)',
    },
  },
}));

export default function CancelOrderPopup({ disabledChange, handleCancel, open, setOpen }) {
//   const [open, setOpen] = React.useState(false);
  
  const classes = useStyles();

  useEffect(() => {
    
  }, [disabledChange])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelOrder = async () => {
    console.log("Huy")
  };

  return (
    <span>
      <Button variant="contained" color="error" onClick={handleClickOpen} disabled={disabledChange} title="Hủy order">
        Hủy order
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Hủy order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có muốn hủy đơn hàng này?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="outline" onClick={handleClose}>Không</Button>
          <Button variant="outline" className={classes.deleteButton} onClick={handleCancel}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}