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

import productApi from "../../../api/productApi";

export default function CreateForm() {
    const [colorList, setColorList] = useState([]);
    const [materialList, setMaterialList] = useState([]);
    useEffect(() => {
        let mounted = true;
        const fetchColor = async () => {
          const response = await productApi.getAllColorCode();
          console.log(response)
        //   if (mounted && response.length > 0) {
        //     if (filter !== "")
        //       setOrderList(
        //         response.filter(
        //           (item) =>
        //             item.orderStatus[item.orderStatus.length - 1].name === filter
        //         )
        //       );
        //     else setOrderList(response);
        //   }
            setColorList(response)
        };
        fetchColor();
    
        return () => {
          mounted = false;
        };
      }, []);

    // <form onSubmit={handleSubmit} id="order-creation">
    return (
        <form id="order-creation">
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
                  <FormControl fullWidth={true}>
                  <InputLabel id="fabric-name">Name</InputLabel>
                  <Select
                    labelId="fabric-name"
                    id="fabric-name"
                    label="Name"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  </FormControl>
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
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={8}>
                  {/* <TextField
                    required
                    id="fabric-length"
                    name="fabric-length"
                    label="Length"
                    fullWidth
                    autoComplete="fabric length"
                    variant="standard"
                    onChange={handlePrice}
                  /> */}
                  <FormControl fullWidth={true}>
                  <InputLabel id="fabric-length">Length</InputLabel>
                  <Select
                    labelId="fabric-length"
                    id="fabric-length"
                    label="Length"
                    fullWidth="true"
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
              </Grid>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            
          </form>
    );
}