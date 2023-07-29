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
  const [fabrics, setFabrics] = useState([]);
  const [filteredFabrics, setFilteredFabrics] = useState([]);

  const [fabricTypes, setFabricTypes] = useState([]);
  const [fabricTypeItems, setFabricTypeItems] = useState(null);

  const [sortBy, setSortBy] = useState('best');
  const [searchWord, setSearchWord] = useState("")
  const [filtered, setFiltered] = useState([])
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
          // console.log(fabrics)
          setFabrics(fabrics);
          setFilteredFabrics(fabrics);
        } else {
          throw new Error("Failed to fetch product");
        }

        if (types) {
          // console.log(types)
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

  const handleChangeChecked = (id, event) => {
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

  useEffect(() => {
    let sorted = [...fabrics];
    if (sortBy === 'asc') {
      sorted = sorted.sort((a, b) => a.price - b.price);

    } else if (sortBy === 'desc') {
      sorted = sorted.sort((a, b) => b.price - a.price);

    } else if (sortBy === 'nameAsc') {
      sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));

    } else if (sortBy === 'nameDesc') {
      sorted = sorted.sort((a, b) => b.name.localeCompare(a.name));

    }
    
    let temp = sorted?.filter((item) => item.name.toLowerCase().includes(searchWord.toLowerCase()))
    setFilteredFabrics(temp)
  }, [searchWord, sortBy])

  return (
    <div>
      <div>
        <Announcement />
        <Navbar searchWord={searchWord} setSearchWord={setSearchWord} />
        <Navbar2 />
        <div className="home_panelList-wrap">
          {/* Filter Panel */}
          <div className="home_panel-wrap">
            <SideBar
              // selectedRating={selectedRating}
              // selectRating={handleSelectRating}
              cuisines={fabricTypeItems}
              changeChecked={handleChangeChecked}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filtered={filtered}
              setFiltered={setFiltered}
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
