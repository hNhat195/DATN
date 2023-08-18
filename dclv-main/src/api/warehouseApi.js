import axiosClient from "./axiosClient";

class WarehouseApi {
  getAllWarehouse = () => {
    const url = `/warehouse/get-all`;
    return axiosClient.get(url);
  };
}
const warehouseApi = new WarehouseApi();
export default warehouseApi;
