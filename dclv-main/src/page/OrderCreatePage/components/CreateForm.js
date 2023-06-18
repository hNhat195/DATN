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
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import orderApi from "../../../api/orderApi";
import productApi from "../../../api/productApi";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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
}));
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
  const [materialType, setMaterialType] = useState("");
  const [materialName, setMaterialName] = useState("");
  //const [productList, setProductList] = useState([])
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

  const handleAdd = (event) => {
    let addData = {
      colorCode: fabricColor,
      typeId: materialName,
      length: Number.parseInt(fabricLength),
    };
    if (
      addData.colorCode == "" ||
      addData.typeId == "" ||
      isNaN(addData.length)
    ) {
      console.log("please add information");
    } else setProductList([...productList, addData]);

    event.preventDefault();
  };

  useEffect(() => {
    const fetchMaterial = async () => {
      const response = await productApi.getAllMaterialCode();
      setMaterialList(response);
    };
    //console.log(materialList)
    fetchMaterial();
  }, []);

  const fetchColor = async () => {
    // console.log(materialType)
    const response = await productApi.getColorByMaterial(materialType);
    return response;
  };
  useEffect(async () => {
    const response = await fetchColor();
    setColorList(response);
  }, [materialType]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
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
                  return x.id === e.target.value;
                });
                setMaterialName(mat.name);
                setMaterialId(mat._id);
                setMaterialType(e.target.value);
              }}
              value={fabricMaterial || ""}>
              {materialList.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item.id}>
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
                //console.log(e.target.value)
                setFabricColor(e.target.value);
              }}
              value={fabricColor || ""}>
              {colorList.map((item, idx) => {
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
            required
            id="fabric-length"
            name="fabric-length"
            label="Số cây vải"
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

      <Grid container spacing={8}>
        <Grid item xs={4}>
          <Button
            variant="contained"
            type="button"
            onClick={handleAdd}
            className={classes.buttonCss}>
            Thêm
          </Button>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            type="button"
            className={classes.buttonCss}
            onClick={handleSubmit}>
            Tạo đơn
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
