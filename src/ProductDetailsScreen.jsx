import React, { useCallback, useState,useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

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

  const handleCheckout = async () => {
  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: product.id }),
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const session = await response.json();

    const stripe = await loadStripe(
      "pk_test_51PAM9fSEX84BngO5X4SAgP2LRWAHOybTxNMEmASmTVNXKVJHv8TzrW5B219cuaJk9HAa0KvHGFCb97yUV0Oz4i9J00Up9mt0JE"
    );

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  } catch (error) {
    alert("Failed to initiate checkout. Please try again later api error");
  }
  };
  
  useEffect(() => {
  const storedProducts = localStorage.getItem("addedProducts");
  if (storedProducts) {
    setAddedProducts(JSON.parse(storedProducts));
  }
}, []);



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
          <button style={addToCartButtonStyle} onClick={handleCheckout}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsScreen;











