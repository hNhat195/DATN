import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Order from "./components/Order";
import FilterBar from "./components/FilterBar";
import ListHeader from "./components/ListHeader";
import orderApi from "../../api/orderApi";

export default function OrderListPage() {
  const [orderList, setOrderList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    let mounted = true;
    const fetchOrder = async () => {
      const response = await orderApi.getAll(1, 100);
      if (mounted && response.length > 0) {
        let tempOrderList = [];
        if (filter !== "all")
          tempOrderList = response.filter(
            (item) =>
              item.orderStatus[item.orderStatus.length - 1].name === filter
          );
        else tempOrderList = response;

        if (dateRangeFilter.startDate && dateRangeFilter.startDate) {
          setOrderList(
            tempOrderList?.filter(
              (item) =>
                Date.parse(item.orderTime) >=
                  Date.parse(dateRangeFilter.startDate) &&
                Date.parse(item.orderTime) <=
                  Date.parse(dateRangeFilter.endDate)
            )
          );
        } else {
          setOrderList(tempOrderList);
        }
      }
    };
    fetchOrder();

    return () => {
      mounted = false;
    };
  }, [filter, dateRangeFilter]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleDateRangeFilterChange = (newDateRange) => {
    setDateRangeFilter(newDateRange);
  };

  return (
    <>
      <Container maxWidth="xl">
        <FilterBar
          filter={filter}
          handleFilterChange={handleFilterChange}
          dateRangeFilter={dateRangeFilter}
          handleDateRangeFilterChange={handleDateRangeFilterChange}
        />
        <ListHeader />
        {orderList.map((item, idx) => {
          return <Order key={idx} order={item} />;
        })}
      </Container>
    </>
  );
}
