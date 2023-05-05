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

import orderApi from "../../../api/orderApi";
import productApi from "../../../api/productApi";

export default function CreateForm({productList, setProductList}) {
  const [colorList, setColorList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [fabricColor, setFabricColor] = useState("");
  const [fabricMaterial, setFabricMaterial] = useState("");
  const [fabricLength, setFabricLength] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [materialName, setMaterialName] = useState("");
  //const [productList, setProductList] = useState([])

  const postOrder = async (postData) => {
    const response = await orderApi.create(postData);
    return response;
  };

  const handleSubmit = async (event) => {
    let postData = {
      note: "front end call api",
      receiverName: "Front end",
      receiverPhone: "094444",
      deposit: 10,
      clientID: null,
      products: productList,
      receiverAddress: "front end test",
    };
    postOrder(postData);
    event.preventDefault();
  };

  const handleAdd = (event) => {
    let addData = {
      colorCode: fabricColor,
      typeId: materialName,
      length: Number.parseInt(fabricLength),
    };
    
    setProductList([...productList, addData])
    
    event.preventDefault();
  };

  useEffect(() => {
    const fetchMaterial = async () => {
      const response = await productApi.getAllMaterialCode();
      setMaterialList(response);
    };

    fetchMaterial();
  }, []);

  useEffect(async () => {
    const fetchColor = async () => {
      const response = await productApi.getColorByMaterial(materialType);
      return response;
    };
    const response = await fetchColor();
    setColorList(response);
  }, [materialType]);

  return (
    <form id="order-creation" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Tạo đơn hàng
      </Typography>

      <Grid container spacing={3} xs={12}>
        <Grid item xs={12} md={8}></Grid>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={8}>
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
                setMaterialName(mat.name)
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
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={8}>
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
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={8}>
          <TextField
            required
            id="fabric-length"
            name="fabric-length"
            label="Số cây vải"
            fullWidth
            autoComplete="fabric length"
            variant="standard"
            type="number"
            onChange={(e) => {
              setFabricLength(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
      <Button variant="contained" color="primary" type="button" onClick={handleAdd}>
        Thêm
      </Button>
      <Button variant="contained" color="primary" type="submit">
        Tạo đơn hàng
      </Button>
    </form>
  );
}
