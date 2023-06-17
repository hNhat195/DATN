import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(
    "https://cdn.shopify.com/s/files/1/0504/0986/5414/products/ZQ_Merino_Chestnut_Swatch_1000x1000.jpg?v=1680565550"
  );
  const additionalImages = [
    "https://cdn.shopify.com/s/files/1/0504/0986/5414/products/ZQ_Merino_Chestnut_Swatch_1000x1000.jpg?v=1680565550",
    "https://cdn.shopify.com/s/files/1/0504/0986/5414/products/ZQ_Merino_Poppy_Hang_1000x1000.jpg?v=1686527461",
    "https://cdn.shopify.com/s/files/1/0504/0986/5414/products/ZQ_Merino_Poppy_Roll_1000x1000.jpg?v=1686527461",
  ];

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="thumbnail-images" style={{ height: 700, width: 700 }}>
      <Carousel
        showStatus={false}
        selectedItem={additionalImages.indexOf(selectedImage)}
        onChange={(index) => handleThumbnailClick(additionalImages[index])}
      >
        {additionalImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Thumbnail Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailPage;
