import React from "react";
import Announcement from "../../components/SellingPages/Announcement";
import Categories from "../../components/SellingPages/Categories";
import Footer from "../../components/SellingPages/Footer";
import Navbar from "../../components/SellingPages/Navbar";
import Newsletter from "../../components/SellingPages/Newsletter";
import Products from "../../components/SellingPages/Products";
import Slider from "../../components/SellingPages/Slider";
import Navbar2 from "../../components/SellingPages/DropdownBar/Navbar.js";

const ProductList = () => {
  return (
    <div>
      <div>
        <Announcement />
        <Navbar />
        <Navbar2 />
        <Products />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default ProductList;
