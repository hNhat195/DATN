import * as React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import DeletePopup from "./DeletePopup";
import { BorderAll } from "@material-ui/icons";

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
    height: '30px',
    width: '100px',
    border: '0',
    // "&[disabled]": {
    //   opacity: '1',
    // }
  }
}));

export default function OrderTableItem({
  row,
  index,
  setProductList,
  productList,
}) {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [fabricLength, setFabricLength] = useState(row.length);
  const inputRef = useRef(null);
  const handleEdit = () => {
    setIsEdit(true);
    inputRef.current.focus();
  };

  const handleSave = () => {
    const temp = productList;
    temp[index]["length"] = fabricLength;
    setProductList(temp);
    setIsEdit(false);
  };

  const handleChange = (e) => {
    setFabricLength(e.target.value);
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {row?.typeId}
      </TableCell>
      <TableCell align="left">{row?.colorCode}</TableCell>
      <TableCell align="left">
        <input
          type="number"
          defaultValue={fabricLength}
          disabled={!isEdit}
          onChange={(e) => handleChange(e)}
          ref={inputRef}
          autoFocus
          min="0" step="1"
          className={classes.lengthField}
        />
      </TableCell>
      <TableCell>
        {isEdit ? (
          <Button
            variant="outline"
            onClick={() => handleSave()}
            className={clsx(classes.cssButton, classes.saveButton)}
            title="Lưu"
          >
            <CheckIcon />
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => handleEdit()}
            className={clsx(classes.cssButton, classes.editButton)}
            title="Chỉnh sửa số lượng"
          >
            <BorderColorIcon />
          </Button>
        )}

        <DeletePopup
          productList={productList}
          setProductList={setProductList}
          index={index}
          className={clsx(classes.cssButton)}
        />
      </TableCell>
    </TableRow>
  );
}
