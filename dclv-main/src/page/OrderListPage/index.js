import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Order from "./components/Order";
import FilterBar from "./components/FilterBar";
import ListHeader from "./components/ListHeader";
import orderApi from "../../api/orderApi";
import CreateButton from "./components/CreateButton";
import ListPagination from "../../components/ListPagination";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  containerStyled: {
    minHeight: "575px",
  },
  paginationStyled: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
}));

export default function OrderListPage() {
  const [orderList, setOrderList] = useState([]);
  const [filteredOrderList, setFilteredOrderList] = useState([]);
  const [filter, setFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [orderPerPage, setOrderPerPage] = useState([]);
  const pageSize = 6;

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const response = await orderApi.getAll(0, 100);
      setOrderList(response);
      setFilteredOrderList(response);
      setOrderPerPage(response.slice(0, pageSize));
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
        <Container maxWidth="xl" className={classes.containerStyled}>
          <FilterBar
            filter={filter}
            handleFilterChange={handleFilterChange}
            dateRangeFilter={dateRangeFilter}
            handleDateRangeFilterChange={handleDateRangeFilterChange}
            handleSearchKeywordChange={handleSearchKeywordChange}
          />
          <ListHeader />
          {orderPerPage.length > 0 &&
            orderPerPage?.map((item, idx) => {
              return <Order key={idx} order={item} />;
            })}
        </Container>
        <ListPagination
          className={classes.paginationStyled}
          pageSize={pageSize}
          itemList={filteredOrderList}
          setItemList={setFilteredOrderList}
          itemPerPage={orderPerPage}
          setItemPerPage={setOrderPerPage}
          filter={filter}
        />
      </Container>
    </>
  );
}
