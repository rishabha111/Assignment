import React, { useState, useEffect } from "react";

function CategoriesScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function filterProducts(categoryName) {
    let filtered = products.filter((product) => product.category.name === categoryName);

    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(minPrice) && product.price <= parseFloat(maxPrice)
      );
    }

    setFilteredProducts(filtered);
  }

  function sortProductsByPrice(order) {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (order === "maxToMin") {
        return b.price - a.price;
      } else if (order === "minToMax") {
        return a.price - b.price;
      }
      return 0;
    });

    setFilteredProducts(sorted);
  }

  function extractImageUrl(imageString) {
    if (imageString && Array.isArray(imageString)) {
      return imageString[0];
    }
    return "https://placeimg.com/640/480/any";
  }

  return (
    <div >
      {products.length > 0 && (
        <>
          {/* <button onClick={() => filterProducts("Clothes")}>Show Clothes</button>
          <button onClick={() => filterProducts("Electronic")}>Show Electronics</button> */}

          <>
  
            
            <div style={{display:'flex', justifyContent: 'space-between'}}>

              <div style={{ textAlign: 'center' }}> <img style={{ width: "100%", height: "355px", margin: '20px', borderRadius: "5%" }} onClick={() => filterProducts("Clothes")}
                src="https://t3.ftcdn.net/jpg/01/38/94/62/360_F_138946263_EtW7xPuHRJSfyl4rU2WeWmApJFYM0B84.jpg" alt="Description of the image" />
<p >Cloths</p>
            </div>

            <div style={{ textAlign: 'center' }}>
             
                <img style={{ width: "100%", height: "355px", margin: '20px', borderRadius: "5%" }} onClick={() => filterProducts("Electronic")}
                src="https://t4.ftcdn.net/jpg/05/91/84/29/360_F_591842937_ptXTrDjkCdG21JhOmaEzyZ7ZJyAhVuQP.jpg" alt="Description of the image" />

<p>Electronics</p>
              </div>     

              
                        </div>
  
</>

        </>
      )}

      {/* <div style={{ marginTop: "20px" }}>
        <label>
          Min Price:
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Max Price:
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </label>
      </div> */}

      <div style={{ marginTop: "20px" }}>
        <button  style={{ margin: "20px" }} onClick={() => sortProductsByPrice("maxToMin")}>Sort by Max Price</button>
        <button style={{ margin: "20px" }} onClick={() => sortProductsByPrice("minToMax")}>Sort by Min Price</button>
      </div>

      <div id="products-container" style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={{ width: "20%", marginBottom: "20px", padding: "10px", boxSizing: "border-box" }}>
            <img
              src={extractImageUrl(product.images)}
              alt={`${product.title} - Image`}
              style={{
                width: "100%", height: "auto", borderRadius: "5%" }}
            />
            {/* <p>{product.description}</p> */}
            <p>Price: ${product.price}</p>
            <h2>{product.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesScreen;
