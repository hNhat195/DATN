import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import cartUtil from "../../../utils/cart";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    "&:hover": {
      color: "rgb(245, 66, 51)",
    },
  },
}));

export default function DeletePopup({ productList, syncProductList, index }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const temp = productList.find((item, i) => i === index);
    syncProductList(temp, 0, "remove");
    setOpen(false);
  };

  return (
    <span>
      <Button
        variant="outline"
        onClick={handleClickOpen}
        className={classes.deleteButton}
        title="Xóa">
        <CancelIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có muốn xóa mặt hàng này khỏi đơn hàng hiện tại chứ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handleDelete}>Xóa</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
