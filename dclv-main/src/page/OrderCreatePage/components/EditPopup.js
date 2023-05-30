import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditForm from "./EditForm";
import CreateForm from "./CreateForm";

export default function EditPopup(
  index,
  productList,
  setProductList,
  row,
  colorList,
  setColorList,
  materialList,
  setMaterialList
) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <Button variant="outline" onClick={handleClickOpen}>
        <BorderColorIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <EditForm
            chosenProduct={index}
            productList={productList}
            setProductList={setProductList}
            row={row}
            colorList={colorList}
            setColorList={setColorList}
            materialList={materialList}
            setMaterialList={setMaterialList}
          />
          {/* <CreateForm productList={productList} setProductList={setProductList} /> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
