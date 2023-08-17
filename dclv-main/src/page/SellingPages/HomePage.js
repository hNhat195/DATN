import React from "react";
import Announcement from "../../components/SellingPages/Announcement";
import Categories from "../../components/SellingPages/Categories";
import Footer from "../../components/SellingPages/Footer";
import Navbar from "../../components/SellingPages/Navbar";
import Newsletter from "../../components/SellingPages/Newsletter";
import Products from "../../components/SellingPages/Products";
import Slider from "../../components/SellingPages/Slider";
import Navbar2 from "../../components/SellingPages/DropdownBar/Navbar.js";
import { useState, useEffect } from "react";
import productApi from "../../api/productApi";
import { Typography } from "@material-ui/core";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const wait = async () => {
      const response = await productApi.getProductHomepage();
      setProducts(response);
    };
    wait();
  }, []);
  return (
    <div>
      <div>
        <Announcement />
        <Navbar />
        <Navbar2 />
        <Slider />
        <Categories />
        <Typography variant="h4">Our latest products</Typography>
        <Products products={products} />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
