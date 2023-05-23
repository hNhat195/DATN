import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Order from "./components/Order";
import FilterBar from "./components/FilterBar";
import ListHeader from "./components/ListHeader";
import orderApi from "../../api/orderApi";
import CreateButton from "./components/CreateButton";
import ListPagination from "../../components/ListPagination";

import Pagination from '@mui/material/Pagination';


export default function OrderListPage() {
  const [orderList, setOrderList] = useState([]);
  const [filteredOrderList, setFilteredOrderList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      // const response = await orderApi.getAll(0, 100);
      // setOrderList(response);
      // setFilteredOrderList(response);
      setLoading(false)
    }
    fetchData();
  }, []);

  useEffect(() => {
    let tempOrderList = [];
    if (filter !== "all")
      tempOrderList = orderList.filter(
        (item) => item.orderStatus[item.orderStatus.length - 1].name === filter
      );
    else {
      tempOrderList = orderList;
    }

    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      tempOrderList = tempOrderList?.filter(
        (item) =>
          Date.parse(item.orderTime) >= Date.parse(dateRangeFilter.startDate) &&
          Date.parse(item.orderTime) <= Date.parse(dateRangeFilter.endDate)
      );
    }

    if (searchKeyword) {
      tempOrderList = tempOrderList?.filter((item) =>
        item.orderId?.toString().includes(searchKeyword)
      );
    }

    setFilteredOrderList(tempOrderList);
  }, [filter, dateRangeFilter, searchKeyword]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleDateRangeFilterChange = (newDateRange) => {
    setDateRangeFilter(newDateRange);
  };

  const handleSearchKeywordChange = (newSearchKeyword) => {
    setSearchKeyword(newSearchKeyword);
  };

  
  return (
    <>
      <Container maxWidth="xl">
        <FilterBar
          filter={filter}
          handleFilterChange={handleFilterChange}
          dateRangeFilter={dateRangeFilter}
          handleDateRangeFilterChange={handleDateRangeFilterChange}
          handleSearchKeywordChange={handleSearchKeywordChange}
        />
        <ListHeader />
        {orderList?.map((item, idx) => {
          return <Order key={idx} order={item} />;
        })}
        
        <ListPagination orderList={orderList} setOrderList={setOrderList}/>

      </Container>
    </>
  );
}
