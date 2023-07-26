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
  const [filteredFabrics, setFilteredFabrics] = useState(null);

  const [fabricTypes, setFabricTypes] = useState([]);
  const [fabricTypeItems, setFabricTypeItems] = useState(null);

  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fabrics = await productApi.getProductsByMaterialSlug(
          materialSlug
        );
        const types = await fabricTypeApi.getFabricTypesByMaterial(
          materialSlug
        );

        if (fabrics) {
          setFabrics(fabrics);
          setFilteredFabrics(fabrics);
        } else {
          throw new Error("Failed to fetch product");
        }

        if (types) {
          setFabricTypes(types);
          setFabricTypeItems(translateFabricTypesToSideBar(types));
        } else {
          throw new Error("Failed to fetch fabric types");
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    if (materialSlug) {
      fetchData();
    }
  }, [materialSlug]);

  const translateFabricTypesToSideBar = (fabricTypes) => {
    return fabricTypes?.map((fabricType) => {
      return { id: fabricType._id, checked: false, label: fabricType.name };
    });
  };

  const handleChangeChecked = (id) => {
    const typeItems = fabricTypeItems;
    const updatedCheckedTypeItems = typeItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    const checkedTypeIds = updatedCheckedTypeItems
      .filter((item) => {
        return item.checked;
      })
      .map((item) => {
        return item.id;
      });

    setFilteredFabrics(
      checkedTypeIds?.length === 0
        ? fabrics
        : fabrics.filter((fabric) =>
            checkedTypeIds.includes(fabric.fabricTypeId)
          )
    );

    setFabricTypeItems(updatedCheckedTypeItems);
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
              cuisines={fabricTypeItems}
              changeChecked={handleChangeChecked}
            />
          </div>
          {/* List & Empty View */}
          <div className="home_list-wrap">
            <Products products={filteredFabrics} />
          </div>
        </div>

        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default ProductList;
