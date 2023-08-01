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
import ChangeOrderStatusPopup from "./components/ChangeOrderStatusPopup";
import CancelOrderPopup from "./components/CancelOrderPopup";

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
    // justifyContent: "flex-end",
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
  const [openChange, setOpenChange] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

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
    setOpenCancel(false)
  };

  const handleUpdateStatus = async () => {
    const res = await orderApi.updateStatus(id, {
      status: "change status",
      reason: "change status by admin",
    });

    let temp = detail;
    temp.orderStatus.push(
      res?.data.orderStatus[res.data.orderStatus.length - 1]
    );
    setDetail(temp);
    setLastStatus(
      res?.data.orderStatus[res?.data.orderStatus?.length - 1]?.name
    );
    setOpenChange(false)
  };

  useEffect(() => { }, [lastStatus, detail.subOrder]);

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
        <Grid container spacing={3} className={classes.btnGroup}>
          <Grid item xs={7}></Grid>
          <Grid item>
            <SubOrderPopup
              orderId={id}
              products={detail.products}
              subOrder={detail.subOrder}></SubOrderPopup>
          </Grid>
          <Grid item>
            <CancelOrderPopup
              disabledChange={(lastStatus == OrderStatus.COMPLETED || lastStatus == OrderStatus.CANCELED) ? true : false}
              handleCancel={handleCancel}
              open={openCancel}
              setOpen={setOpenCancel}></CancelOrderPopup>
          </Grid>
          
          <Grid item>
            <ChangeOrderStatusPopup
              lastStatus={lastStatus}
              disabledChange={(lastStatus == OrderStatus.COMPLETED || lastStatus == OrderStatus.CANCELED) ? true : false}
              orderDetail={detail?.orderStatus}
              handleUpdateStatus={handleUpdateStatus}
              open={openChange}
              setOpen={setOpenChange}></ChangeOrderStatusPopup>
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
          // <Grid item container key={idx} xs={12} md={12}>
          //   <Grid item container xs={12} md={6}>
          //     <OrderInfo products={item.products} />
          //     <Grid item xs={3}>
          //       {/* <button
          //         onClick={(e) => handleUpdateSubOrderStatus(e, item._id, idx)}
          //       >
          //         Chuyển trạng thái
          //       </button> */}
          //       <ChangeStatusPopup subOrder={item} idx={idx} detail={detail} setDetail={setDetail}></ChangeStatusPopup>
          //     </Grid>
          //     <Grid item xs={3}>
          //       <button onClick={(e) => handleCancelSubOrder(e, item, idx)}>
          //         Hủy đơn hàng
          //       </button>
          //     </Grid>
          //   </Grid>
          //   <Grid>
          //     <TimelineStatus statusList={item.subOrderStatus} />
          //   </Grid>
          // </Grid>
          <SubOrderList item={item} idx={idx} detail={detail} setDetail={setDetail}></SubOrderList>
        ))}
      </Grid>

    </Container>
  );
}
