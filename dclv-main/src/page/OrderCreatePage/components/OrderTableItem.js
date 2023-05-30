import * as React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState, useRef, useEffect } from "react";
import AutoFocus from "./AutoFocus";

export default function OrderTableItem({
  row,
  index,
  setProductList,
  productList,
}) {
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

  const handleDelete = () => {
    console.log(productList)
    const temp = productList.filter((item, i) => i !== index);;
    setProductList(temp);
  };

  const handleChange = (e) => {
    setFabricLength(e.target.value);
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  useEffect(() => {
    console.log(productList)
  }, [productList])

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {row?.typeId}
      </TableCell>
      <TableCell align="left">{row?.colorCode}</TableCell>
      <TableCell align="left">
        <input
          type="text"
          defaultValue={fabricLength}
          disabled={!isEdit}
          onChange={(e) => handleChange(e)}
          ref={inputRef}
          autoFocus
        />
      </TableCell>
      <TableCell>
        {isEdit ? (
          <button onClick={() => handleSave()}>
            <CheckIcon />
          </button>
        ) : (
          <button onClick={() => handleEdit()}>
            <BorderColorIcon />
          </button>
        )}

        <button onClick={() => handleDelete()}>
          <CancelIcon />
        </button>
        
      </TableCell>
    </TableRow>
  );
}
