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
import orderApi from "../../api/orderApi";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack, ArrowUpward, Cancel, Publish } from "@material-ui/icons";
import DefaultButton from "../../components/Button/DefaultButton";
import { useHistory, useParams } from "react-router-dom";
import CreateForm from "./components/CreateForm";

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
  const [fabricLength, setFabricLength] = useState("");
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

  const postOrder = async (postData) => {
    // const response = await orderApi.getAll(1, 100);
    // if (mounted && response.length > 0) {
    //   if (filter !== "")
    //     setOrderList(
    //       response.filter(
    //         (item) =>
    //           item.orderStatus[item.orderStatus.length - 1].name === filter
    //       )
    //     );
    //   else setOrderList(response);
    // }
    const response = await orderApi.create(postData);
    console.log(response);
  };

  const handleSubmit = async (event) => {
    console.log("Name: ", fabricName);
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
        { colorCode: fabricColor, length: Number.parseInt(fabricLength) },
      ],
      receiverAddress: "front end test",
    };
    postOrder(postData);
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
    setFabricLength(form.get("fabric-length"));
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
        <Grid item xs={12} md={6}>
          <img src="./cat.jpg" alt="cat image"></img>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12} md={12}>
            <CreateForm></CreateForm>
          </Grid>
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
