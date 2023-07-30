import CustomerInfo from "./components/CustomerInfo";
import OrderInfo from "./components/OrderInfo";
import TimelineStatus from "./components/TimelineStatus";
import ListBill from "./components/ListBill";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import { useState, useEffect } from "react";
import orderApi from "../../api/orderApi";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack, ArrowUpward, Cancel, Publish } from "@material-ui/icons";
import DefaultButton from "../../components/Button/DefaultButton";
import { useHistory, useParams } from "react-router-dom";
import SubOrderPopup from "./components/SubOrderPopup";

import { OrderStatus } from "../../const/OrderStatus";
import ChangeStatusPopup from "./components/ChangeStatusPopup";
import SubOrderList from "./components/SubOrderList";

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
    backgroundColor: "#fff",
    color: "#696983",
    "&:hover": {
      backgroundColor: "red",
      color: "black",
    },
    textTransform: "none",
    padding: theme.spacing(1.5),
  },
  btnUpdate: {
    backgroundColor: "#fff",
    color: "#696983",
    "&:hover": {
      backgroundColor: "rgb(252, 186, 3)",
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

export default function OrderDetail() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const role = localStorage.getItem("role");

  const [detail, setDetail] = useState({
    orderStatus: [],
    products: [],
    detailBill: [],
    subOrder: [],
  });
  const [lastStatus, setLastStatus] = useState();

  const handleOrderStatus = async () => {
    console.log(detail);
  };

  const handleCancel = async () => {
    const res = await orderApi.updateStatusCancelOrder(id, {
      status: "cancel",
      reason: "cancel by admin",
    });

    let temp = detail;
    temp.orderStatus.push(
      res?.data.orderStatus[res.data.orderStatus.length - 1]
    );
    setDetail(temp);
    setLastStatus(
      res?.data.orderStatus[res?.data.orderStatus?.length - 1]?.name
    );
  };

  const handleCancelSubOrder = async (e, subOrder, idx) => {
    const res = await orderApi.cancelSubOrder(subOrder._id, {
      status: "cancel",
      reason: "cancel by admin",
    });
    let temp = detail;
    temp.subOrder[idx] = res;
    setDetail(temp);
  };

  const handleUpdateSubOrderStatus = async (e, subOrderId, idx) => {
    const res = await orderApi.updateSubOrderStatus(subOrderId, {
      reason: "cancel by admin",
    });
    let temp = detail;
    temp.subOrder[idx] = res;
    setDetail(temp);
  };

  useEffect(() => {}, [lastStatus, detail.subOrder]);

  useEffect(() => {
    let mounted = true;
    const fetchOrderDetail = async () => {
      const response = await orderApi.getOne(id);

      if (mounted) {
        setDetail(response);
      }
    };
    fetchOrderDetail();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(detail);
  }, [detail]);

  const handleBack = () => {
    history.push(`/order`);
  };

  return (
    <Container maxWidth="xl" className={classes.orderDetailBox}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4" className={classes.titlePage}>
            {"Chi tiết đơn đặt hàng MDH" + detail.orderId}
          </Typography>
        </Grid>
        
      </Grid>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} md={7}>
          <OrderInfo products={detail.products} deposit={detail.deposit} />
        </Grid>
        <Grid item xs={12} md={5}>
          <TimelineStatus statusList={detail.orderStatus} />
        </Grid>
        <Grid container spacing={2} className={classes.btnGroup}>
        <Grid item>
          <SubOrderPopup
            orderId={id}
            products={detail.products}
            subOrder={detail.subOrder}
          ></SubOrderPopup>
        </Grid>
        <Grid item>
          
          <Button
            startIcon={<Cancel />}
            onClick={() => {
              handleCancel();
            }}
            disabled={lastStatus === (OrderStatus.CANCELED ||OrderStatus.COMPLETED)}
            size="medium"
            className={classes.btnCancel}
          >
            <Typography variant="h6" className={classes.btnCancelTitle}>
              Hủy
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          {/* <DefaultButton
            title="Quay lại"
            icon={ArrowBack}
            clickEvent={handleBack}
          /> */}
          
        </Grid>
        <Grid item>
          {/* <DefaultButton title="Cập nhật" icon={ArrowUpward} /> */}
          <Button
            startIcon={<Publish />}
            disabled={lastStatus === (OrderStatus.CANCELED ||OrderStatus.COMPLETED)}
            size="medium"
            className={classes.btnUpdate}
          >
            <Typography variant="h6" className={classes.btnCancelTitle}>
              Cập nhật
            </Typography>
          </Button>
        </Grid>
      </Grid>
        <Grid item xs={12} md={7}>
          <ListBill detailBill={detail.detailBill} />
        </Grid>
        <Grid item xs={12} md={5}>
          <CustomerInfo
            customer={detail.clientID}
            receiverName={detail.receiverName}
            receiverPhone={detail.receiverPhone}
            receiverAddress={detail.receiverAddress}
            id={id}
          />
        </Grid>

        {detail.subOrder?.map((item, idx) => (
          <SubOrderList item={item} idx={idx} detail={detail} setDetail={setDetail}></SubOrderList>
        ))}
      </Grid>
      
    </Container>
  );
}
