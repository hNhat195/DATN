import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { alpha, styled } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";
// utils
import { fNumber } from "../../../utils/formatNumber";
import billApi from "../../../api/billApi";
import orderApi from "../../../api/orderApi";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.dark,
  //backgroundColor: theme.palette.info.lighter
  backgroundColor: "#D0F2FF",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

export default function StaffBillComplete({ dateRangeFilter }) {
  const [billComplete, setBillComplete] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
    const fetCountBillComplete = async () => {
      try {
        // const response = await billApi.getBillCompleted();
        const response = await orderApi.getOrderCompleted();
        setBillComplete(response);
        setFilteredList(response);
      } catch (error) {
        alert("Failed to fetch bill complete count");
      }
    };
    fetCountBillComplete();
  }, []);
  useEffect(() => {
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      let temp = billComplete?.filter(
        (item) =>
          Date.parse(item.orderTime) >= Date.parse(dateRangeFilter.startDate) &&
          Date.parse(item.orderTime) <= Date.parse(dateRangeFilter.endDate)
      );
      setFilteredList(temp);
    } else {
      let temp = billComplete;
      setFilteredList(temp);
    }
  }, [dateRangeFilter]);
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon
          icon="carbon:task-complete"
          color="rgb(12, 83, 183)"
          width="35"
          height="35"
        />
      </IconWrapperStyle>
      <Typography variant="h4">{filteredList.length}</Typography>
      <Typography variant="h6" sx={{ opacity: 0.72 }}>
        Đơn hàng giao thành công
      </Typography>
    </RootStyle>
  );
}
