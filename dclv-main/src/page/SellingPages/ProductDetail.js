import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../../components/SellingPages/Announcement";
import Footer from "../../components/SellingPages/Footer";
import Navbar from "../../components/SellingPages/Navbar";
import Navbar2 from "../../components/SellingPages/DropdownBar/Navbar.js";

import Newsletter from "../../components/SellingPages/Newsletter";
import { mobile } from "../../responsive";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import productApi from "../../api/productApi";
import cartUtil from "../../utils/cart";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const { productSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [fabric, setFabric] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [number, setNumber] = useState(1);
  const [cartNumber, setCartNumber] = useState(cartUtil.getCartNumber());

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fabric = await productApi.getProductBySlug(productSlug);
        if (fabric) {
          setFabric(fabric);
          setSelectedImage(fabric.image[0]);
        } else {
          throw new Error("Failed to fetch product");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) {
      fetchProduct();
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!fabric) {
    return <p>Failed to fetch product.</p>;
  }

  return (
    <Container>
      <Announcement />
      <Navbar cartNumber={cartNumber} />
      <Navbar2 />
      <Wrapper>
        <ImgContainer>
          <div className="thumbnail-images">
            <Carousel
              showStatus={false}
              selectedItem={fabric?.image?.indexOf(selectedImage)}
              onChange={
                (index) => console.log("kkkkkkkkk")
                // handleThumbnailClick(additionalImages[index])
              }
            >
              {fabric?.image?.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
        </ImgContainer>
        <InfoContainer>
          <Title>{fabric?.name}</Title>
          <Desc>{fabric?.descriptions}</Desc>
          <Price>$ {fabric?.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" />
              <FilterColor color="darkblue" />
              <FilterColor color="gray" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() => {
                  if (number > 0) {
                    setNumber(number - 1);
                  } else {
                    setNumber(0);
                  }
                }}
              />
              <Amount>{number}</Amount>
              <Add
                onClick={() => {
                  setNumber(number + 1);
                }}
              />
            </AmountContainer>
            <Button
              onClick={() => {
                cartUtil.addProductToCart(fabric, number);
                setCartNumber(cartUtil.getCartNumber());
              }}
            >
              ADD TO CART
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
