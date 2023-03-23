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
} from "@material-ui/core";
import { useState, useEffect } from "react";
import orderApi from "../../api/orderApi";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack, ArrowUpward, Cancel, Publish } from "@material-ui/icons";
import DefaultButton from "../../components/Button/DefaultButton";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  alignStatusRight: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
  },
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "#fafafb",
      color: theme.palette.primary.main,
    },
  },
  container: {
    display: "flex",
  },
  btnGroup: {
    justifyContent: "flex-end",
  },
  titlePage: {
    fontWeight: "bold",
    color: "#000040",
  },
  btnCancel: {
    backgroundColor: "#EAECFF",
    color: "#696983",
    "&:hover": {
      backgroundColor: "red",
      color: "black",
    },
    textTransform: "none",
    padding: theme.spacing(1.5),
  },
  btnCancelTitle: {
    ...theme.typography.buttonPrimary,
  },
  orderDetailBox: {
    padding: "10px",
  },
}));

export default function OrderCreatePage() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const role = localStorage.getItem("role");
  console.log(id);
  const [detail, setDetail] = useState({
    orderStatus: [],
    products: [],
    detailBill: [],
  });
  const [fabricName, setFabricName] = useState("");
  const [fabricMaterial, setFabricMaterial] = useState("");
  const [fabricColor, setFabricColor] = useState("");
  const [fabricPrice, setFabricPrice] = useState("");
  useEffect(() => {
    let mounted = true;
    const fetchOrderDetail = async () => {
      const response = await orderApi.getOne(id);
      console.log(response);
      if (mounted) {
        setDetail(response);
      }
    };
    fetchOrderDetail();

    return () => {
      mounted = false;
    };
  }, [id, fabricName]);

  console.log(detail);

  const handleBack = () => {
    history.push(`/order`);
  };

  const handleSubmit = (event) => {
    console.log("Name: ", fabricName);
    console.log("Material: ", fabricMaterial);
    console.log("Color: ", fabricColor);
    console.log("Price: ", fabricPrice);
    event.preventDefault();
  };

  const handleName = () => {
    let form = new FormData(document.getElementById("order-creation"));
    setFabricName(form.get("fabric-name"));
  };
  const handleMaterial = () => {
    let form = new FormData(document.getElementById("order-creation"));
    setFabricMaterial(form.get("fabric-material"));
  };
  const handleColor = () => {
    let form = new FormData(document.getElementById("order-creation"));
    setFabricColor(form.get("fabric-color"));
  };
  const handlePrice = () => {
    let form = new FormData(document.getElementById("order-creation"));
    setFabricPrice(form.get("fabric-price"));
  };

  return (
    <Container maxWidth="xl" className={classes.orderDetailBox}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Typography variant="h4" className={classes.titlePage}>
            {"Chi tiết đơn đặt hàng MDH" + detail.orderId}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} md={7}>
          <img src="./cat.jpg" alt="cat image"></img>
        </Grid>
        <Grid item xs={12} md={5}>
          <form onSubmit={handleSubmit} id="order-creation">
            <Typography variant="h6" gutterBottom>
              Order Creation
            </Typography>
            <FormControl>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="fabric-name"
                    name="fabric-name"
                    label="Fabric name"
                    fullWidth
                    autoComplete="fabric name"
                    variant="standard"
                    onChange={handleName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="fabric-material"
                    name="fabric-material"
                    label="Material"
                    fullWidth
                    autoComplete="fabric material"
                    variant="standard"
                    onChange={handleMaterial}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="fabric-color"
                    name="fabric-color"
                    label="Color"
                    fullWidth
                    autoComplete="fabric color"
                    variant="standard"
                    onChange={handleColor}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="fabric-price"
                    name="fabric-price"
                    label="Price"
                    fullWidth
                    autoComplete="fabric price"
                    variant="standard"
                    onChange={handlePrice}
                  />
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </FormControl>
          </form>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.btnGroup}>
        <Grid item>
          <Button
            startIcon={<Cancel />}
            size="large"
            className={classes.btnCancel}
          >
            <Typography variant="h6" className={classes.btnCancelTitle}>
              Hủy
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <DefaultButton
            title="Quay lại"
            icon={ArrowBack}
            clickEvent={handleBack}
          />
        </Grid>
        <Grid item>
          <DefaultButton title="Cập nhật" icon={ArrowUpward} />
        </Grid>
      </Grid>
    </Container>
  );
}
