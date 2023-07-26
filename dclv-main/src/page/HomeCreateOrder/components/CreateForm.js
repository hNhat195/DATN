import {
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import orderApi from "../../../api/orderApi";
import productApi from "../../../api/productApi";
import { makeStyles } from "@material-ui/core/styles";
import CreateButtonPopup from "./CreateButtonPopup";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles((theme) => ({
  alignRight: {
    justifyContent: "right",
    alignItems: "right",
  },
  container: {
    display: "contents",
  },
  buttonCss: {
    maxWidth: "true",
  },
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
  paddingGrid: {
    paddingTop: "20px"
  },
  popupContainer: {
    margin: "0 auto",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "100px",
  },
  errorIcon: {
    color: 'rgb(245, 66, 51)',
    border: '3px solid rgb(245, 66, 51)',
    borderRadius: '50%',
    marginTop: "10px",
    marginBottom: "20px"
  }
}));

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

function ErrorPopup({ open, closePopup }) {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={closePopup} maxWidth="xs" fullWidth>
      <DialogTitle>Lỗi</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.popupContainer}>
          <CloseIcon sx={{ fontSize: 40 }} className={classes.errorIcon}></CloseIcon>
          
          <h3>Vui lòng nhập thông tin sản phẩm hợp lệ</h3>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button variant="outline" onClick={closePopup} className={classes.deleteButton}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CreateForm({
  productList,
  setProductList,
  colorList,
  materialList,
  setColorList,
  setMaterialList,
}) {
  const [fabricColor, setFabricColor] = useState("");
  const [fabricMaterial, setFabricMaterial] = useState("");
  const [fabricLength, setFabricLength] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [errorPopup, setErrorPopup] = useState(false)
  const history = useHistory();
  const classes = useStyles();
  const postOrder = async (postData) => {
    const response = await orderApi.create(postData);
    return response;
  };

  const handleSubmit = async (event) => {
    if (productList.length > 0) {
      let postData = {
        note: "front end call api",
        receiverName: "Front end",
        receiverPhone: "094444",
        deposit: 10,
        clientID: null,
        products: productList,
        receiverAddress: "front end test",
      };
      await postOrder(postData);
      event.preventDefault();
      history.push(`/order`);
    } else console.log("please add product");
  };

  const closePopup = () => {
    setErrorPopup(false)
  }

  const handleAdd = (event) => {
    if (
      fabricColor == "" ||
      fabricMaterial == "" ||
      isNaN(Number.parseInt(fabricLength)) ||
      Number.parseInt(fabricLength) <= 0
    ) {
      setErrorPopup(true)
    } else {
      let addData = {
        colorCode: fabricColor,
        typeId: fabricMaterial,
        length: Number.parseInt(fabricLength),
      };
      let checkDuplicate = false;
      let i = 0
      for (; i < productList.length; i++) {
        if (addData.colorCode == productList[i].colorCode && addData.typeId == productList[i].typeId) {
          checkDuplicate = true;
          break;
        }
      }

      if (checkDuplicate) {
        setErrorPopup(true)

      }
      else {
        setProductList([...productList, addData]);
      }
      event.preventDefault();
    }
  };

  useEffect(() => {
    const fetchMaterial = async () => {
      const response = await productApi.getAllMaterialCode();

      setMaterialList(response);
    };
    fetchMaterial();
  }, []);

  const fetchColor = async () => {
    if (objectIdPattern.test(materialId)) {
      const response = await productApi.getColorByMaterial(materialId);
      setColorList(response);
    }

  };
  useEffect(async () => {
    await fetchColor();
  }, [materialId]);

  useEffect(() => {

  }, [productList]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Tạo đơn hàng
      </Typography>

      <Grid container spacing={3} xs={12}>
        <Grid item xs={12} md={9}></Grid>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={9}>
          <FormControl fullWidth={true}>
            <InputLabel id="fabric-material">Chất liệu</InputLabel>
            <Select
              labelId="fabric-material"
              id="fabric-material"
              label="Material"
              onChange={async (e) => {
                setFabricMaterial(e.target.value);
                const mat = await materialList.find((x) => {
                  return x.name === e.target.value;
                });
                setMaterialId(mat._id);
              }}
              value={fabricMaterial || ""}>
              {materialList.length > 0 && materialList?.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={9}>
          <FormControl fullWidth={true}>
            <InputLabel id="fabric-color">Mã màu</InputLabel>
            <Select
              labelId="fabric-color"
              id="fabric-color"
              label="Color"
              onChange={(e) => {

                setFabricColor(e.target.value);
              }}
              value={fabricColor || ""}>
              {colorList.length > 0 && colorList?.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item.colorCode}>
                    {item.colorCode}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={9}>
          <TextField
            id="fabric-length"
            name="fabric-length"
            label="Số lượng"
            fullWidth
            autoComplete="fabric length"
            variant="standard"
            type="number"
            inputProps={{ min: 0, step: 1 }}
            onChange={(e) => {
              setFabricLength(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}></Grid>
      </Grid>

      <Grid container spacing={8} className={classes.paddingGrid}>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            type="button"
            onClick={handleAdd}
            className={clsx(classes.buttonCss, classes.changeButton)}>
            Thêm
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          {/* <Button
            variant="outlined"
            type="button"
            className={clsx(classes.buttonCss, classes.acceptButton)}
            onClick={handleSubmit}>
            Tạo đơn
          </Button> */}
          <CreateButtonPopup productList={productList}></CreateButtonPopup>
        </Grid>
      </Grid>
      {errorPopup && <ErrorPopup open={errorPopup} closePopup={closePopup}></ErrorPopup>}
    </div>
  );
}
