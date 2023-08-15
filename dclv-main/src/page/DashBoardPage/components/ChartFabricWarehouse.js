import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Chart, Series, Label, Legend, Export } from "devextreme-react/chart";
import productApi from "../../../api/productApi";

function ChartFabricWarehouse() {
  const [chartWarehouse, setChartWarehouse] = useState([]);
  useEffect(() => {
    const fetChartWarehouse = async () => {
      try {
        const response = await productApi.getChartWarehouseTrue();

        setChartWarehouse(response);
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
          valueField="countFabric"
          argumentField="_id"
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
