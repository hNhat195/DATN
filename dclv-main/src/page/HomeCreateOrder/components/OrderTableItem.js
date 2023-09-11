import * as React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckIcon from "@mui/icons-material/Check";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import DeletePopup from "./DeletePopup";
import "./styled.css";
const useStyles = makeStyles((theme) => ({
  cssButton: {
    border: "0 0",
    padding: "0 2px",
  },
  editButton: {
    "&:hover": {
      color: "rgb(249, 195, 80)",
    },
    // "&:hover::before": {
    //   content: "attr(title)",
    //   backgroundColor: "#333",
    //   color: "#fff",
    //   padding: "5px",
    //   position: "absolute",
    //   zindex: "1",
    //   left: "50%",
    //   transform: "translateX(-50%)",
    //   whiteSpace: "nowrap",
    //   borderRadius: "5px",
    //   fontSize: "14px",
    // },
  },
  saveButton: {
    "&:hover": {
      color: "rgb(47, 238, 52)",
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
}));

export default function OrderTableItem({
  row,
  index,
  syncProductList,
  productList,
}) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [fabricQuantity, setFabricQuantity] = useState(row.quantity);
  const inputRef = useRef(null);
  const handleEdit = () => {
    setIsEdit(true);
    inputRef.current.focus();
  };

  const handleSave = () => {
    const temp = productList[index];
    const quantity = Number(fabricQuantity);
    temp["quantity"] = quantity;
    syncProductList(temp, quantity, "update");
    setIsEdit(false);
  };

  const handleChange = (e) => {
    setFabricQuantity(e.target.value);
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);
  useEffect(() => {
    setFabricQuantity(row.quantity);
  }, [row.quantity]);

  return (
    <TableRow>
      <TableCell width="200px">{row?.fabricType}</TableCell>
      <TableCell width="150px" align="left">
        {row?.color}
      </TableCell>
      <TableCell width="80px" align="left">
        <input
          type="number"
          defaultValue={fabricQuantity}
          disabled={!isEdit}
          onChange={(e) => handleChange(e)}
          ref={inputRef}
          autoFocus
          min="0"
          step="1"
          className={classes.lengthField}
        />
      </TableCell>
      <TableCell width="170px">
        {isEdit ? (
          <Button
            variant="outline"
            onClick={() => handleSave()}
            className={clsx(classes.cssButton, classes.saveButton)}
            title="Lưu">
            <CheckIcon />
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => handleEdit()}
            className={clsx(classes.cssButton, classes.editButton)}
            title="Chỉnh sửa số lượng">
            <BorderColorIcon />
          </Button>
        )}

        <DeletePopup
          productList={productList}
          syncProductList={syncProductList}
          index={index}
          className={clsx(classes.cssButton)}
        />
      </TableCell>
    </TableRow>
  );
}
