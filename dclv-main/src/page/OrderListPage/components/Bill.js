import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Modal,
  Backdrop,
  Card,
  Collapse,
  Typography,
  CardContent,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import orderApi from "../../../api/orderApi";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "15px",
    color: "#000040",
    backgroundColor: "#FFF",
    borderRadius: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    paddingLeft: "5px",
    display: "flex",
    direction: "row",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      boxShadow: theme.shadows[5],
      transition: "box-shadow 0.3s ease-in-out",
    },
  },
  billId: {
    color: "#000040",
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0px",
  },
  verticalCenter: {
    direction: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonWidth: {
    minWidth: "24px",
    padding: "0px",
    height: "80%",
  },
  pLeft10: {
    paddingLeft: "10px",
  },
  noPadding: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  alignVerticalCenter: {
    justifyContent: "center",
    direction: "row",
    display: "flex",
    alignItems: "center",
  },
  productScroll: {
    padding: "0",
    maxHeight: "350px",
    minHeight: "349px",
    overflowX: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  exportedTypo: {
    color: "#ff9800",
    fontWeight: "bold",
  },
  deliveryTypo: {
    color: "#2196f3",
    fontWeight: "bold",
  },
  successTypo: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  failTypo: {
    color: "#f44336",
    fontWeight: "bold",
  },
}));

export default function Bill({ subOrderId, index }) {
  // const { bill } = props;
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [listFabricRoll, setListFabricRoll] = useState([]);
  const [subOrder, setSubOrder] = useState({});

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  useEffect(async () => {
    const response = await orderApi.getSubOrder(subOrderId);
    setSubOrder(response);
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={2}
        className={clsx(classes.billId, classes.verticalCenter)}>
        Sub Order {index}
      </Grid>
      <Grid item xs={2} className={classes.verticalCenter}>
        {/* {moment(bill.exportBillTime).subtract(1, "days").format("DD/MM/YYYY")} */}
        {subOrder?.totalQty}
      </Grid>
      <Grid item xs={2}>
        {/* {bill.salesmanID ? bill.salesmanID.name : "Trống"} */}

        {/* {subOrder?.subOrderStatus[subOrder?.subOrderStatus?.length - 1].name} */}
      </Grid>
      <Grid item xs={2} className={classes.verticalCenter}>
        {/* {bill.clientID ? bill.clientID.name : "Trống"} */}
      </Grid>
      <Grid item xs={2} className={classes.alignVerticalCenter}>
        <Button onClick={handleOpen}>Chi tiết</Button>
      </Grid>
      <Grid container item xs={2}></Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              Danh sách cây vải
            </Typography>
            <TableContainer component={Paper} className={classes.productScroll}>
              <Table
                stickyHeader
                sx={{ minWidth: "40vh" }}
                aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headerTable}>STT</TableCell>
                    <TableCell className={classes.headerTable}>
                      Mã màu
                    </TableCell>
                    <TableCell className={classes.headerTable}>Tên</TableCell>
                    {/* <TableCell className={classes.headerTable}>Lô</TableCell> */}
                    <TableCell className={classes.headerTable}>
                      Chiều dài
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subOrder?.products?.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableContentBlack}>
                        {idx + 1}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableContentBlack}>
                        {row?.fabricID.color}
                      </TableCell>
                      <TableCell className={classes.tableContentBlack}>
                        {row?.fabricID.fabricType}
                      </TableCell>
                      {/* <TableCell className={classes.tableContentBlack}>
                        {row?.lot}
                      </TableCell> */}
                      <TableCell className={classes.tableContentBlack}>
                        {row?.quantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Modal>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography paragraph>Method:</Typography>
      </Collapse>
    </Grid>
  );
}
