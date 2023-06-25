import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useEffect } from "react";

function getNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const useStyles = makeStyles({
  orderInfoBox: {
    backgroundColor: "#F6F6F8",
    borderRadius: "5px",
    padding: "10px",
    fontFamily: "'Roboto', sans-serif",
    height: "100%",
  },
  title: {
    color: "#000040",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  totalMoney: {
    color: "#000040",
    fontSize: "20px",
    fontWeight: "bolder",
  },
  alignMoneyRight: {
    textAlign: "right",
  },
  estimateMoney: {
    color: "#000040",
    fontSize: "16px",
    fontWeight: "bolder",
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
});
export default function OrderInfo({ products, deposit }) {
  const classes = useStyles();

  let totalLength = products?.reduce(
    (totalLength, item) => totalLength + (item.quantity || 0),
    0
  );

  let totalShippedLength = products?.reduce(
    (totalShippedLength, item) => totalShippedLength + item.shipped,
    0
  );
  return (
    <div className={classes.orderInfoBox}>
      <Typography variant="h5" className={classes.title}>
        Thông tin đơn hàng
      </Typography>
      <TableContainer component={Paper} className={classes.productScroll}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Loại vải</TableCell>
              <TableCell>Mã màu</TableCell>
              <TableCell>Đã đặt&nbsp;(Cây)</TableCell>
              <TableCell>Đã giao&nbsp;(Cây)</TableCell>
              <TableCell>Còn lại&nbsp;(Cây)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.length>0 && products?.map((item, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2">{idx + 1}</Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="subtitle2">
                    {item.fabricID.fabricTypeId.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {item.fabricID.colorId.colorCode}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {Number.parseInt(item.quantity)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {Number.parseInt(item.shipped)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    {Number.parseInt(item.quantity) -
                      Number.parseInt(item.shipped)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <hr />
      <Grid container>
        <Grid item xs={6}>
          <Typography component="p" className={classes.estimateMoney}>
            Tổng số cây đã đặt
          </Typography>
          <Typography component="p" className={classes.estimateMoney}>
            Tổng số cây đã giao
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.alignMoneyRight}>
          <Typography component="p" className={classes.estimateMoney}>
            {totalLength} Cây
          </Typography>
          <Typography component="p" className={classes.estimateMoney}>
            {totalShippedLength} Cây
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
