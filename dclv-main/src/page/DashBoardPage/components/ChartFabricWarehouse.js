import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Chart, Series, Label, Legend, Export } from "devextreme-react/chart";
import warehouseApi from "../../../api/warehouseApi";
function ChartFabricWarehouse() {
  const [chartWarehouse, setChartWarehouse] = useState([]);
  useEffect(() => {
    const fetChartWarehouse = async () => {
      try {
        // const response = await productApi.getChartWarehouseTrue();
        const response = await warehouseApi.getAllWarehouse();
        // console.log(response)
        const result = response.map((item, idx) => {
          return item.products.reduce(
            (accumulator, currentValue) => accumulator + currentValue.quantity,
            0
          );
        });
        const arrayResult = [];
        for (let i = 0; i < response.length; i++) {
          arrayResult.push({
            name: "Warehouse " + response[i].id,
            total: result[i],
          });
        }
        setChartWarehouse(arrayResult);
      } catch (error) {
        alert("Failed to fetch warehouse");
      }
    };
    fetChartWarehouse();
  }, []);
  return (
    <Paper style={{ padding: 5 }}>
      <Chart
        id="chart"
        title="Số lượng cây vải trong từng kho"
        dataSource={chartWarehouse}>
        <Series
          valueField="total"
          argumentField="name"
          type="bar"
          color="#42A5F5">
          <Label visible={true} />
        </Series>
        <Legend visible={false} />
        <Export enabled={true} />
      </Chart>
    </Paper>
  );
}

export default ChartFabricWarehouse;
