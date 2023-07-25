import axiosClient from "./axiosClient";
class fabricTypeApi {
  getAllFabricTypes = (params) => {
    const url = "/fabrictypes";
    return axiosClient.get(url, { params });
  };

  getFabricTypesByMaterial = (material) => {
    const url = `/fabrictypes/${material}`;
    return axiosClient.get(url);
  };
}
const fabricTypeAPI = new fabricTypeApi();

export default fabricTypeAPI;
