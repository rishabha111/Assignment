
import React, { useCallback, useEffect, useState } from "react";
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
};

const productDetailsStyle = {
  width: "60%",
  borderRadius: "5px",
  padding: "20px",
  backgroundColor: "#fff",
  display: "flex",
};

const productImageStyle = {
  flex: "0 0 40%",
  marginRight: "20px",
};

const productInfoStyle = {
  flex: "1",
};

const productNameStyle = {
  fontSize: "24px",
  marginBottom: "10px",
};

const productPriceStyle = {
  fontSize: "18px",
  marginBottom: "20px",
};

const addToCartButtonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "10px",
};

const ProductDetailsScreen = ({ product, addToCart }) => {
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("addedProducts");
    if (storedProducts) {
      setAddedProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleAddToCart = useCallback(() => {
    const isProductAlreadyAdded = addedProducts.some(
      (addedProduct) => addedProduct.id === product.id
    );

    if (!isProductAlreadyAdded) {
      addToCart(product.id);
      const updatedProducts = [...addedProducts, product];
      setAddedProducts(updatedProducts);
      localStorage.setItem("addedProducts", JSON.stringify(updatedProducts));
    } else {
      alert("Product is already added");
    }
  }, [addToCart, product, addedProducts]);

  return (
    <div style={containerStyle}>
      <div style={productDetailsStyle}>
        <div style={productImageStyle}>
          <img
            src={product.image}
            alt={product.name}
            height="600"
            width="auto"
            loading="lazy"
          />
        </div>
        <div style={productInfoStyle}>
          <h1 style={productNameStyle}>{product.title}</h1>
          <p style={productPriceStyle}>Price: ${product.price}</p>
          <button style={addToCartButtonStyle} onClick={handleAddToCart}>
            {addedProducts.some(
              (addedProduct) => addedProduct.id === product.id
            )
              ? "Already added"
              : "Add to Cart"}
          </button>
          <button style={addToCartButtonStyle}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsScreen;
