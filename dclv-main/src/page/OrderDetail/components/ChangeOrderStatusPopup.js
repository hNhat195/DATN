import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  changeButton: {
    "&:hover": {
      color: "rgb(252, 186, 3)",
    },
  },
  deleteButton: {
    "&:hover": {
      color: "rgb(245, 66, 51)",
    },
  },
  acceptButton: {
    "&:hover": {
      color: "rgb(11, 214, 38)",
    },
  },
}));

export default function ChangeOrderStatusPopup({
  disabledChange,
  lastStatus,
  orderDetail,
  handleUpdateStatus,
  open,
  setOpen,
}) {
  //   const [open, setOpen] = React.useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [nextStatus, setNextStatus] = useState("");

  const classes = useStyles();

  useEffect(() => {}, [disabledChange]);

  useEffect(() => {}, []);

  const handleClickOpen = () => {
    const latestStatus = orderDetail[orderDetail.length - 1].name;

    if (latestStatus == "pending") {
      setCurrentStatus("Chờ xử lý");
      setNextStatus("Đã sẵn sàng");
    } else if (latestStatus == "ready") {
      setCurrentStatus("Đã sẵn sàng");
      setNextStatus("Đang giao");
    } else if (latestStatus == "in-progress") {
      setCurrentStatus("Đang giao");
      setNextStatus("Đã hoàn thành");
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <Button
        variant="contained"
        color="warning"
        onClick={handleClickOpen}
        disabled={disabledChange}
        title="Chuyển trạng thái">
        Chuyển trạng thái
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Chuyển trạng thái</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              Suborder này sẽ được chuyển từ trạng thái
              <b> "{currentStatus}" </b>
              sang trạng thái
              <b> "{nextStatus}" </b>
            </p>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            className={classes.deleteButton}
            variant="outline"
            onClick={handleClose}>
            Không
          </Button>
          <Button
            className={classes.acceptButton}
            variant="outline"
            onClick={handleUpdateStatus}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
