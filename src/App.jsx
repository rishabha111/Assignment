import React, { useState } from "react";
import ProductScreen from "./ProductScreen";
import CategoriesScreen from "./CategoriesScreen";
import ProductDetailsScreen from "./ProductDetailsScreen";
import CartScreen from "./CartScreen"; // Import the CartScreen component

function App() {
  const [cart, setCart] = useState([]);
  const [currentScreen, setCurrentScreen] = useState("PRODUCTS");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const showProductDetails = (product) => {
    setSelectedProduct(product);
    setCurrentScreen("PRODUCT_DETAILS");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "PRODUCTS":
        return (
          <ProductScreen
            addToCart={addToCart}
            showProductDetails={showProductDetails}
          />
        );
      case "CATEGORIES":
        return <CategoriesScreen />;
      case "PRODUCT_DETAILS":
        return (
          <ProductDetailsScreen
            product={selectedProduct}
            addToCart={addToCart}
          />
        );
      case "CART":
        return <CartScreen cart={cart} />;
      default:
        return (
          <ProductScreen
            addToCart={addToCart}
            showProductDetails={showProductDetails}
          />
        );
    }
  };

  return (
    <div>
      <header style={{ padding: '20px', margintop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',borderadius:'20px',border:'1 px solid black' }}>
        <div>
          <button
            style={{ margin: '10px', color: currentScreen === 'PRODUCTS' ? 'blue' : 'inherit', border: 'none', backgroundColor: 'transparent' }}
            onClick={() => setCurrentScreen("PRODUCTS")}
          >
            Products
          </button>
          <button
            style={{ margin: '10px', color: currentScreen === 'CATEGORIES' ? 'blue' : 'inherit', border: 'none', backgroundColor: 'transparent' }}
            onClick={() => setCurrentScreen("CATEGORIES")}
          >
            Categories
          </button>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button
            style={{ margin: '10px', color: currentScreen === 'CART' ? 'blue' : 'inherit', border: 'none', backgroundColor: 'transparent' }}
            onClick={() => setCurrentScreen("CART")}
          >
            Cart ({cart.length})
          </button>
        </div>
      </header>
      {renderScreen()}
    </div>
  );
}

export default App;
