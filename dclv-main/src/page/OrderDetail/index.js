import CustomerInfo from "./components/CustomerInfo";
import OrderInfo from "./components/OrderInfo";
import TimelineStatus from "./components/TimelineStatus";
import ListBill from "./components/ListBill";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import { useState, useEffect } from "react";
import orderApi from "../../api/orderApi";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import SubOrderPopup from "./components/SubOrderPopup";
import SubOrderList from "./components/SubOrderList";
import ChangeOrderStatusPopup from "./components/ChangeOrderStatusPopup";
import CancelOrderPopup from "./components/CancelOrderPopup";
import { OrderStatus } from "../../const/OrderStatus";

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
    setOpenCancel(false);
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
    setOpenChange(false);
  };

  useEffect(() => {}, [lastStatus, detail.subOrder]);
  const downloadFile = (base64Data, fileName) => {
    // Convert the base64 data to a Blob
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const fileBlob = new Blob([byteArray], {
      type: "application/octet-stream",
    });

    // Create a URL for the Blob
    const fileUrl = URL.createObjectURL(fileBlob);

    // Create a link element and simulate a click to initiate the download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the link and revoke the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };

  const handleExport = async () => {
    const res = await orderApi.exportBill(id);

    downloadFile(res.data, "Bill.pdf");
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
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={2}>
            <SubOrderPopup
              orderId={id}
              products={detail.products}
              subOrder={detail.subOrder}
            ></SubOrderPopup>
          </Grid>
          <Grid item xs={5}>
            <Button
              color="warning"
              variant="contained"
              onClick={handleExport}
            >
              Xuất hoá đơn
            </Button>
          </Grid>
          <Grid item xs={2}>
            <CancelOrderPopup
              disabledChange={
                lastStatus == OrderStatus.COMPLETED ||
                lastStatus == OrderStatus.CANCELED
                  ? true
                  : false
              }
              handleCancel={handleCancel}
              open={openCancel}
              setOpen={setOpenCancel}
            ></CancelOrderPopup>
          </Grid>
          <Grid item xs={3}>
            <ChangeOrderStatusPopup
              lastStatus={lastStatus}
              disabledChange={
                lastStatus == OrderStatus.COMPLETED ||
                lastStatus == OrderStatus.CANCELED
                  ? true
                  : false
              }
              orderDetail={detail?.orderStatus}
              handleUpdateStatus={handleUpdateStatus}
              open={openChange}
              setOpen={setOpenChange}
            ></ChangeOrderStatusPopup>
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
          <SubOrderList
            item={item}
            idx={idx}
            detail={detail}
            setDetail={setDetail}
          ></SubOrderList>
        ))}
      </Grid>
    </Container>
  );
}
