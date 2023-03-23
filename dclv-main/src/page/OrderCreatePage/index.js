import { Button, Grid, Typography, Container, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";
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
  }, [id]);

  console.log(detail);

  const handleBack = () => {
    history.push(`/order`);
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
          <img src='./cat.jpg' alt="cat image"></img>
        </Grid>
        <Grid item xs={12} md={5}>
          <div>
            <FormControl>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
          </div>
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
