import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditForm from "./EditForm";

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
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
