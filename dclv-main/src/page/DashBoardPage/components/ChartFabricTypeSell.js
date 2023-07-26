import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Label,
  Format,
  Legend,
  Export,
} from "devextreme-react/chart";
import productApi from "../../../api/productApi";
import orderApi from "../../../api/orderApi";

function ChartFabricTypeSell() {
  const [fabrictypesell, setFabricTypeSell] = useState([]);
  useEffect(() => {
    function addQuantities(arr) {
      const quantities = {};
      for (let i = 0; i < arr.length; i++) {
        const name = arr[0].fabricID;
        const quantity = arr[0].quantity
        const key = JSON.stringify(name);
        if (!quantities[key]) {
          quantities[key] = 0;
        }
        quantities[key] += quantity;
      }
      return Object.keys(quantities).map(key => ({ name: JSON.parse(key), quantity: quantities[key] }));
    }

    const fetchFabricTypeSell = async () => {
      try {
        // const response = await productApi.getFabricTypeSell();
        const response = await orderApi.getCompletedSubOrderItem()
        const temp = response.map((item) => item.products)
        const tempList = []
        for (let i = 0; i < fabrictypesell.length; i++) {
          tempList.push(...fabrictypesell[i]);
        }
        console.log(tempList)
        const resultList = addQuantities(tempList)
        console.log(resultList)
        setFabricTypeSell(resultList);
      } catch (error) {
        console.log("Failed to fetch fabric type sell", error);
      }
    };
    fetchFabricTypeSell();
  }, []);
  useEffect(() => {
    
    // console.log(fabrictypesell)
    
  }, [fabrictypesell])
  return (
    <Paper style={{ padding: 5 }}>
      <Chart
        id="chart"
        title="Số lượng cây trong từng loại vải đã bán"
        dataSource={fabrictypesell}
        // onPointClick={this.onPointClick}
        rotated={true}>
        {/* <CommonSeriesSettings
          argumentField="_id"
          type="bar"
          hoverMode="allArgumentPoints"
          selectionMode="allArgumentPoints"
        >
          <Label visible={true}>
            <Format type="fixedPoint" precision={0} />
          </Label>
        </CommonSeriesSettings> */}
        <Series
          valueField="countFabrictype"
          argumentField="_id"
          type="bar"
          color="#f3c40b"
          // style={{margin: 100}}
        >
          <Label visible={true} />
        </Series>
        <Legend visible={false} />
        <Export enabled={true} />
      </Chart>
    </Paper>
  );
}

export default ChartFabricTypeSell;
