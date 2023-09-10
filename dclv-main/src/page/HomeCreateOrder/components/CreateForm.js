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
import clsx from "clsx";
import orderApi from "../../../api/orderApi";
import productApi from "../../../api/productApi";
import { makeStyles } from "@material-ui/core/styles";
import CreateButtonPopup from "./CreateButtonPopup";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import fabricTypeAPI from "../../../api/fabricTypeApi";
import cartUtil from "../../../utils/cart";

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
    backgroundColor: "rgb(252, 186, 3)",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgb(230, 170, 5)",
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
  paddingGrid: {
    paddingTop: "20px",
  },
  popupContainer: {
    margin: "0 auto",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "100px",
  },
  errorIcon: {
    color: "rgb(245, 66, 51)",
    border: "3px solid rgb(245, 66, 51)",
    borderRadius: "50%",
    marginTop: "10px",
    marginBottom: "20px",
  },
  menu: {
    maxHeight: "300px",
  },
  spaceBlank: {
    height: "25px",
  },
}));

const objectIdPattern = /^[0-9a-fA-F]{24}$/;
const collections = [
  { label: "Silk", value: "silk" },
  { label: "Linen", value: "linen" },
  { label: "Merino", value: "merino" },
];

function ErrorPopup({ open, closePopup }) {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={closePopup} maxWidth="xs" fullWidth>
      <DialogTitle>Lỗi</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.popupContainer}>
          <CloseIcon
            sx={{ fontSize: 40 }}
            className={classes.errorIcon}
          ></CloseIcon>

          <h3>Vui lòng nhập thông tin sản phẩm hợp lệ</h3>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outline"
          onClick={closePopup}
          className={classes.deleteButton}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function CreateForm({
  allMaterials,
  allFabricTypes,
  allFabricColors,
  allProducts,
  productList,
  syncProductList,
}) {
  const [fabricColor, setFabricColor] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [fabricQuantity, setFabricQuantity] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);
  const [fabricCollection, setFabricCollection] = useState(null);

  const [filteredFabricTypes, setFilteredFabricTypes] = useState([]);
  const [filteredFabricColors, setFilteredFabricColors] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const classes = useStyles();

  const filterFabricTypesByMaterial = (fabricTypes, material) => {
    return fabricTypes.filter((fabricType) => fabricType.material == material);
  };

  const filterFabricColorsByFabricTypeId = (fabricColors, fabricTypeId) => {
    const filtertedProducts = allProducts.filter(
      (product) => product.fabricTypeId == fabricTypeId
    );

    const filteredColorIds = filtertedProducts?.map(
      (product) => product.colorId
    );

    return fabricColors.filter((fabricColor) =>
      filteredColorIds.includes(fabricColor._id)
    );
  };

  const selectProductByTypeIdAndColorId = (typeId, colorId) => {
    const selectedProduct = allProducts.find(
      (product) => product.fabricTypeId == typeId && product.colorId == colorId
    );
    return selectedProduct;
  };

  const closePopup = () => {
    setErrorPopup(false);
  };

  const handleAdd = (event) => {
    if (
      fabricColor == "" ||
      fabricType == "" ||
      isNaN(Number.parseInt(fabricQuantity)) ||
      Number.parseInt(fabricQuantity) <= 0
    ) {
      setErrorPopup(true);
    } else {
      syncProductList(selectedProduct, fabricQuantity, "add");
    }
    event.preventDefault();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Tạo đơn hàng 111
      </Typography>

      <Grid container spacing={3} xs={12}>
        <Grid item xs={12} md={9}></Grid>
        <Grid item xs={12} md={3}></Grid>

        <Grid item xs={12} md={9}>
          <FormControl fullWidth={true}>
            <InputLabel id="fabric-collection">Chất liệu</InputLabel>
            <Select
              MenuProps={{ classes: { paper: classes.menu } }}
              labelId="fabric-collection"
              id="fabric-collection"
              label="Collection"
              onChange={async (e) => {
                setFabricCollection(e.target.value);
                setFilteredFabricTypes(
                  filterFabricTypesByMaterial(allFabricTypes, e.target.value)
                );
              }}
              value={fabricCollection || ""}
            >
              {collections.length > 0 &&
                collections?.map((item, idx) => {
                  return (
                    <MenuItem key={idx} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}></Grid>

        <Grid item xs={12} md={9}>
          <FormControl fullWidth={true}>
            <InputLabel id="fabric-material">Loại vải</InputLabel>
            <Select
              MenuProps={{ classes: { paper: classes.menu } }}
              labelId="fabric-material"
              id="fabric-material"
              label="Material"
              onChange={async (e) => {
                setFabricType(e.target.value);

                setFilteredFabricColors(
                  filterFabricColorsByFabricTypeId(
                    allFabricColors,
                    e.target.value
                  )
                );
              }}
              value={fabricType || ""}
            >
              {filteredFabricTypes.length > 0 &&
                filteredFabricTypes?.map((item, idx) => {
                  return (
                    <MenuItem key={idx} value={item._id}>
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
              MenuProps={{ classes: { paper: classes.menu } }}
              labelId="fabric-color"
              id="fabric-color"
              label="Color"
              onChange={(e) => {
                setFabricColor(e.target.value);
                setSelectedProduct(
                  selectProductByTypeIdAndColorId(fabricType, e.target.value)
                );
              }}
              value={fabricColor || ""}
            >
              {filteredFabricColors.length > 0 &&
                filteredFabricColors?.map((item, idx) => {
                  return (
                    <MenuItem key={idx} value={item._id}>
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
              setFabricQuantity(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}></Grid>
      </Grid>
      <Grid container className={classes.spaceBlank}></Grid>
      <Grid container spacing={8} className={classes.paddingGrid}>
        <Grid item xs={4}></Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          {/* <CreateButtonPopup productList={productList}></CreateButtonPopup> */}
          <Button
            variant="contained"
            type="button"
            onClick={handleAdd}
            className={clsx(classes.buttonCss, classes.changeButton)}
          >
            Thêm
          </Button>
        </Grid>
      </Grid>
      {errorPopup && (
        <ErrorPopup open={errorPopup} closePopup={closePopup}></ErrorPopup>
      )}
    </div>
  );
}
