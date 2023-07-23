import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Announcement from "../../components/SellingPages/Announcement";

import Footer from "../../components/SellingPages/Footer";
import Navbar from "../../components/SellingPages/Navbar";
import Newsletter from "../../components/SellingPages/Newsletter";
import Products from "../../components/SellingPages/Products";

import Navbar2 from "../../components/SellingPages/DropdownBar/Navbar.js";
import SideBar from "../../components/SellingPages/SideBar";
import productApi from "../../api/productApi";
import "./styles.css";

const ProductList = () => {
  const { materialSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [fabrics, setFabrics] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fabrics = await productApi.getProductsByMaterialSlug(
          materialSlug
        );
        if (fabrics) {
          setFabrics(fabrics);
        } else {
          throw new Error("Failed to fetch product");
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (materialSlug) {
      fetchProducts();
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!fabrics) {
    return <p>Failed to fetch product.</p>;
  }

  const cuisines = [
    { id: 1, checked: false, label: "American" },
    { id: 2, checked: false, label: "Chinese" },
    { id: 3, checked: false, label: "Italian" },
  ];

  return (
    <div>
      <div>
        <Announcement />
        <Navbar />
        <Navbar2 />
        <div className="home_panelList-wrap">
          {/* Filter Panel */}
          <div className="home_panel-wrap">
            <SideBar
              // selectedRating={selectedRating}
              // selectRating={handleSelectRating}
              cuisines={cuisines}
              // changeChecked={handleChangeChecked}
            />
          </div>
          {/* List & Empty View */}
          <div className="home_list-wrap">
            <Products products={fabrics} />
          </div>
        </div>

        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default ProductList;
