import axiosClient from "./axiosClient";
class fabricTypeApi {
  getAllFabricTypes = (params) => {
    const url = "/fabrictypes";
    return axiosClient.get(url, { params });
  };
}
const fabricTypeAPI = new fabricTypeApi();

export default fabricTypeAPI;
