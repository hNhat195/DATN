import axiosClient from "./axiosClient";

const orderApi = {
  getAll: (page, limit) => {
    let url;

    if (page && limit) url = `/order?page=${page}&limit=${limit}`;
    else url = `/order`;
    return axiosClient.get(url);
  },
  create: (data) => {
    const url = "/order/create";
    return axiosClient.post(url, data);
  },
  createSubOrder: (data) => {
    const url = "/order/sub-order-create"
    return axiosClient.post(url, data);
  },
  getOne: (orderId) => {
    const url = `/order/${orderId}`;
    return axiosClient.get(url);
  },
  getProducts: (orderId) => {
    const url = `/order/${orderId}/products`;
    return axiosClient.get(url);
  },
  updateStatus: (orderId, data) => {
    const url = `/order/${orderId}/update_status`;
    return axiosClient.put(url, data);
  },
  totalDeposit: (date) => {
    const url = `/order/deposit?date=${date}`;
    return axiosClient.get(url);
  },
  getOrderStatus: (date) => {
    const url = `/order/getorderstatus?date=${date}`;
    return axiosClient.get(url);
  },
  countAllOrderMonthly: (date) => {
    const url = `/order/getorderbymonth?date=${date}`;
    return axiosClient.get(url);
  },

  countOrderDailyMonthly: (date) => {
    const url = `/order/getorderdaily?date=${date}`;
    return axiosClient.get(url);
  },

  getOrderByDateRange: (from_date, to_date) => {
    const url = `/order/getorderbydaterange?from_date=${from_date}&to_date=${to_date}`;
    return axiosClient.get(url);
  },

  cancelStatus: (orderId) => {
    const url = `/order/${orderId}/cancelStatus`;
    return axiosClient.put(url);
  },

  getOrderIdByCustomer: (id) => {
    const url = `/order/customer/${id}`;
    return axiosClient.get(url);
  },

  filterByCustomer: (id, status, sort) => {
    let sortNum = sort == "latest" ? -1 : 1;
    const url = `/order/customer/${id}/filter?status=${status}&sort=${sortNum}`;
    return axiosClient.get(url);
  },

  searchByCustomer: (id, keyword) => {
    const url = `/order/customer/${id}/search?keyword=${keyword}`;
    return axiosClient.get(url);
  },

  filterByStaff: (status, sort) => {
    let sortNum = sort == "latest" ? -1 : 1;
    const url = `/order/filter?status=${status}&sort=${sortNum}`;
    return axiosClient.get(url);
  },

  searchByStaff: (keyword) => {
    const url = `/order/search?keyword=${keyword}`;
    return axiosClient.get(url);
  },
  updateStatusCancelOrder: (orderId, data) => {
    const url = `/order/${orderId}/update_status_cancel_order`;
    return axiosClient.put(url, data);
  },
};
export default orderApi;
