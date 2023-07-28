import React from "react";
import PieChart, {
  Legend,
  Export,
  Series,
  Label,
  Font,
  Connector,
} from "devextreme-react/pie-chart";
import { Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import orderApi from "../../../api/orderApi";

function ChartOrderHandle({dateRangeFilter}) {
  const [orderstatus, setOrderStatus] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  function counting(arr) {
    const countStatus = {}
    countStatus["pending"] = 0
    countStatus["canceled"] = 0
    countStatus["completed"] = 0
    countStatus["in-progress"] = 0
    for(let i=0; i<arr.length; i++) {
      if(arr[i].status == "pending") {
        countStatus['pending']++
      }
      else if(arr[i].status == "completed") countStatus['completed']++
      else if(arr[i].status == "in-progress") countStatus['in-progress']++
      else countStatus['canceled']++
    }
    return Object.keys(countStatus).map(key => ({ status: key, quantity: countStatus[key] }));
  }
  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        // const response = await orderApi.getOrderStatus();
        const response = await orderApi.getAll()
        setOrderStatus(response);
        const mapping = response.map((item) => {return {status: item.orderStatus[item.orderStatus.length-1].name, orderTime: item.orderTime}})
        const countStatus = counting(mapping)
        setFilteredList(countStatus)
      } catch (error) {
        console.log("Failed to fetch fabric type sell", error);
      }
    };
    fetchOrderStatus();
  }, []);
  useEffect(() => {
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      let temp = orderstatus?.filter(
        (item) =>
          Date.parse(item.orderTime) >= Date.parse(dateRangeFilter.startDate) &&
          Date.parse(item.orderTime) <= Date.parse(dateRangeFilter.endDate)
      );
      // console.log(temp)
      const mapping = temp.map((item) => {return {status: item.orderStatus[item.orderStatus.length-1].name, orderTime: item.orderTime}})
      const countStatus = counting(mapping)
      setFilteredList(countStatus)
    }
    else {
      let temp = orderstatus
      const mapping = temp.map((item) => {return {status: item.orderStatus[item.orderStatus.length-1].name, orderTime: item.orderTime}})
      const countStatus = counting(mapping)
      setFilteredList(countStatus)
    }
  }, [dateRangeFilter])
  const customizePoint = (pointInfo) => {
    if (pointInfo.argument == "completed")
      return {
        color: "#4caf50",
      };
    else if (pointInfo.argument == "pending")
      return {
        color: "#f8ca00",
      };
    else if (pointInfo.argument == "canceled")
      return {
        color: "#f44336",
      };
    else if (pointInfo.argument == "in-progress")
      return {
        color: "#bfbfbf",
      }
  };
  // const customizeLegendText = (legendInfo) => {
  //   if(legendInfo.argumentText == "completed")
  //     return {
  //       argumentText:"Hoàn tất"
  //     }
  //   else if(legendInfo.argumentText == "pending")
  //     return {
  //       argumentText: "Đang xử lý"
  //     }
  //   else if(legendInfo.argumentText == "canceled")
  //     return {
  //       argumentText: "Đã hủy"
  //     }
  // };
  return (
    <Paper style={{ padding: 5 }}>
      <PieChart
        id="pie"
        palette="Bright"
        dataSource={filteredList}
        title="Tình trạng đơn đặt hàng"
        customizePoint={customizePoint}>
        <Legend
          orientation="horizontal"
          itemTextPosition="right"
          horizontalAlignment="center"
          verticalAlignment="bottom"
          columnCount={4}
          // customizeText={customizeLegendText}
        />
        <Export enabled={true} />
        <Series argumentField="status" valueField="quantity">
          <Label
            visible={true}
            position="columns"
            customizeText={customizeText}>
            <Font size={16} />
            <Connector visible={true} width={0.5} />
          </Label>
        </Series>
      </PieChart>
    </Paper>
  );
}

function customizeText(arg) {
  return `${arg.percentText}`;
}

export default ChartOrderHandle;
