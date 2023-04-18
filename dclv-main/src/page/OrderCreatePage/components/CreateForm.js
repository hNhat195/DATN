import {
  Button,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useState, useEffect } from "react";

import orderApi from "../../../api/orderApi";
import productApi from "../../../api/productApi";

export default function CreateForm() {
  const [colorList, setColorList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [fabricColor, setFabricColor] = useState("");
  const [fabricMaterial, setFabricMaterial] = useState("");
  const [fabricLength, setFabricLength] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [materialType, setMaterialType] = useState("");

  const postOrder = async (postData) => {
    const response = await orderApi.create(postData);
    console.log(response);
  };

  const handleSubmit = async (event) => {
    console.log("Material: ", fabricMaterial);
    console.log("Color: ", fabricColor);
    console.log("Length: ", fabricLength);
    let postData = {
      note: "front end call api",
      receiverName: "Front end",
      receiverPhone: "094444",
      deposit: 10,
      clientID: null,
      products: await [
        {
          colorCode: fabricColor,
          typeId: materialId,
          length: Number.parseInt(fabricLength),
        },
      ],
      receiverAddress: "front end test",
    };
    postOrder(postData);
    // console.log(postData)
    event.preventDefault();
  };
  const fetchColor = async () => {
    //const response = await productApi.getAllColorCode();
    console.log("mattype: //////////////" + materialType);
    const response = await productApi.getColorByMaterial(materialType);
    console.log("fetch color response: sssssssssssss" + response);
    return response;
    //setColorList(response)
  };
  useEffect(() => {
    const fetchMaterial = async () => {
      const response = await productApi.getAllMaterialCode();
      console.log(response);

      setMaterialList(response);
    };

    fetchMaterial();
  }, []);

  useEffect(async () => {
    const response = await fetchColor();

    setColorList(response);
  }, [materialType]);

  // <form onSubmit={handleSubmit} id="order-creation">
  return (
    <form id="order-creation" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Order Creation
      </Typography>

      <Grid container spacing={3} xs={12}>
        <Grid item xs={12} md={8}>
          {/* <TextField
                    required
                    id="fabric-name"
                    name="fabric-name"
                    label="Fabric name"
                    fullWidth
                    autoComplete="fabric name"
                    variant="standard"
                    onChange={handleName}
                  /> */}
          {/* <FormControl fullWidth={true}>
                  <InputLabel id="fabric-name">Name</InputLabel>
                  <Select
                    labelId="fabric-name"
                    id="fabric-name"
                    label="Name"
                    value="fabric-name"
                  >
                    <MenuItem>Ten</MenuItem>
                    <MenuItem>Twenty</MenuItem>
                    <MenuItem>Thirty</MenuItem>
                  </Select>
                  </FormControl> */}
        </Grid>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={8}>
          {/* <TextField
                    required
                    id="fabric-material"
                    name="fabric-material"
                    label="Material"
                    fullWidth
                    autoComplete="fabric material"
                    variant="standard"
                    onChange={handleMaterial}
                  /> */}
          <FormControl fullWidth={true}>
            <InputLabel id="fabric-material">Material</InputLabel>
            <Select
              labelId="fabric-material"
              id="fabric-material"
              label="Material"
              onChange={async (e) => {
                setFabricMaterial(e.target.value);
                const mat = await materialList.find((x) => {
                  return x.id === e.target.value;
                });
                
                setMaterialId(mat._id);
                setMaterialType(e.target.value);
                
              }}
              value={fabricMaterial || ""}
              // value="type0001"
            >
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
          {/* <TextField
                    id="fabric-color"
                    name="fabric-color"
                    label="Color"
                    fullWidth
                    autoComplete="fabric color"
                    variant="standard"
                    onChange={handleColor}
                  /> */}
          <FormControl fullWidth={true}>
            <InputLabel id="fabric-color">Color</InputLabel>
            <Select
              labelId="fabric-color"
              id="fabric-color"
              label="Color"
              onChange={(e) => {
                setFabricColor(e.target.value);
                console.log(e.target.value);
              }}
              value={fabricColor || ""}
              // value="ffffff"
            >
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
            label="Length"
            fullWidth
            autoComplete="fabric length"
            variant="standard"
            onChange={(e) => {
              setFabricLength(e.target.value);
              console.log(e.target.value);
            }}
          />
          {/* <FormControl fullWidth={true}>
                  <InputLabel id="fabric-length">Length</InputLabel>
                  <Select
                    labelId="fabric-length"
                    id="fabric-length"
                    label="Length"
                    fullWidth="true"
                    //value="fabric-length"
                  >
                    <MenuItem>Ten</MenuItem>
                    <MenuItem>Twenty</MenuItem>
                    <MenuItem>Thirty</MenuItem>
                  </Select>
                  </FormControl> */}
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
