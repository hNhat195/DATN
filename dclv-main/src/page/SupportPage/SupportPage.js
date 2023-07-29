import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import ListHeader from "./components/ListHeader";
import SupportItem from "./components/SupportItem";
import FilterBar from "./components/FilterBar";
import supportApi from "../../api/supportApi";
import orderApi from "../../api/orderApi";
import { async } from "validate.js";
import userUtil from "../../utils/user";

export default function SupportPage() {
  const [refresh, setRefresh] = useState(true);
  const [supportList, setSupportList] = useState([]);
  const [userOrderList, setUserOrderList] = useState([]);

  const getSupportList = async () => {
    try {
      const role = userUtil.getCurrentUserRole();
      let supports;
      if (role === userUtil.userRole.customer) {
        const userId = userUtil.getCurrentUserId();
        supports = await supportApi.getSupportsByClientId(userId);
      } else {
        supports = await supportApi.getAllSupports();
      }

      setSupportList(supports);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserOrdertList = async () => {
    try {
      const userId = userUtil.getCurrentUserId();
      const orderList = await orderApi.getOrdersByUserId(userId);
      setUserOrderList(orderList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSupportList();
  }, [refresh]);

  useEffect(() => {
    getSupportList();
    getUserOrdertList();
  }, []);

  return (
    <Container maxWidth="xl">
      <FilterBar />
      <ListHeader />
      {supportList?.map((item, idx) => (
        <SupportItem item={item} user={userUtil.getCurrentUser()} key={idx} />
      ))}
    </Container>
  );
}
