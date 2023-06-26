import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Announcement from "../../components/SellingPages/Announcement";
import Categories from "../../components/SellingPages/Categories";
import Footer from "../../components/SellingPages/Footer";
import Navbar from "../../components/SellingPages/Navbar";
import Newsletter from "../../components/SellingPages/Newsletter";
import Products from "../../components/SellingPages/Products";
import Slider from "../../components/SellingPages/Slider";
import Navbar2 from "../../components/SellingPages/DropdownBar/Navbar.js";
import productApi from "../../api/productApi";
import { FormatQuote } from "@material-ui/icons";

const ProductList = () => {
  const { collectionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [fabrics, setFabrics] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fabrics = await productApi.getProductsByCollectionId(
          collectionId
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

    if (collectionId) {
      fetchProducts();
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!fabrics) {
    return <p>Failed to fetch product.</p>;
  }

  return (
    <div>
      <div>
        <Announcement />
        <Navbar />
        <Navbar2 />
        <Products products={fabrics} />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default ProductList;
