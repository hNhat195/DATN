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
import fabricTypeApi from "../../api/fabricTypeApi";
import "./styles.css";

const ProductList = () => {
  const { materialSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [fabrics, setFabrics] = useState(null);
  const [fabricTypes, setFabricTypes] = useState([]);

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

  useEffect(() => {
    const fetchFabricTypes = async () => {
      try {
        const types = await fabricTypeApi.getFabricTypesByMaterial(
          materialSlug
        );
        if (types) {
          console.log(types, "tranquangkha");
          setFabricTypes(types);
        } else {
          throw new Error("Failed to fetch fabric types");
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (materialSlug) {
      fetchFabricTypes();
    }
  }, []);

  const translateFabricTypesToSideBar = (fabricTypes) => {
    return fabricTypes?.map((fabricType) => {
      return { id: fabricType._id, checked: false, label: fabricType.name };
    });
  };

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
              cuisines={translateFabricTypesToSideBar(fabricTypes)}
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
