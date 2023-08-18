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

export default function CancelSubOrderPopup({ subOrder, idx, detail, setDetail, disabledChange }) {
  const [open, setOpen] = React.useState(false);
  
  const classes = useStyles();

  useEffect(() => {
    
  }, [disabledChange])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelSubOrder = async () => {
    const res = await orderApi.cancelSubOrder(subOrder._id, {
      status: "cancel",
      reason: "cancel by admin",
    });
    let temp = detail;
    temp.subOrder[idx] = res;
    setDetail(temp);
    setOpen(false);
    window.location.reload()
  };

  return (
    <span>
      <Button variant="outline" onClick={handleClickOpen} className={classes.deleteButton} disabled={disabledChange} title="Hủy sub order">
        Hủy sub order
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Hủy sub order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có muốn hủy sub order này?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="outline" onClick={handleClose}>Không</Button>
          <Button variant="outline" className={classes.deleteButton} onClick={handleCancelSubOrder}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
