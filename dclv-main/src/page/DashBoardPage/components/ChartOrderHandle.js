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

function ChartOrderHandle() {
  const [orderstatus, setOrderStatus] = useState([]);
  useEffect(() => {
    function counting(arr) {
      const countStatus = {}
      countStatus["pending"] = 0
      countStatus["canceled"] = 0
      countStatus["completed"] = 0
      for(let i=0; i<arr.length; i++) {
        if(arr[i].status == "pending") {
          countStatus['pending']++
        }
        else if(arr[i].status == "completed") countStatus['completed']++
        else countStatus['canceled']++
      }
      return Object.keys(countStatus).map(key => ({ status: key, quantity: countStatus[key] }));
    }

    const fetchOrderStatus = async () => {
      try {
        // const response = await orderApi.getOrderStatus();
        const response = await orderApi.getAll()
        const mapping = response.map((item) => {return {status: item.orderStatus[item.orderStatus.length-1].name, orderTime: item.orderTime}})
        const countStatus = counting(mapping)
        setOrderStatus(countStatus);
      } catch (error) {
        console.log("Failed to fetch fabric type sell", error);
      }
    };
    fetchOrderStatus();
  }, []);
  useEffect(() => {
    console.log(orderstatus)
  }, [orderstatus])
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
        dataSource={orderstatus}
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
