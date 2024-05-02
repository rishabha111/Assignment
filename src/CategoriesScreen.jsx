import React, { useState, useEffect } from "react";
import axios from "axios";

function CategoriesScreen() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inputText, setInputText] = useState("");
  const productsPerPage = 18;
  const defaultImage = "https://img.freepik.com/free-photo/photography-black-hoodie-green-background_1409-5173.jpg?t=st=1714591104~exp=1714594704~hmac=c75788521f616f30d1fa83c3d5bc8a784e72a71db867818413116f8d69149632&w=1060";

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, minPrice, maxPrice, currentPage]);

  const handleSort = (order) => {
    if (!Array.isArray(products) || products.length === 0) {
      return;
    }

    const sortedProducts = [...products];

    if (order === "minToMax") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "maxToMin") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(sortedProducts);
    setSortOrder(order);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const offset = (currentPage - 1) * productsPerPage;
      const limit = productsPerPage;
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?price_min=${minPrice}&price_max=${maxPrice}&offset=${offset}&limit=${limit}`
      );
      setProducts(response.data);
    } catch (error) {
      setError("Error fetching products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ marginLeft: "10px", marginRight: "10px", backgroundColor: "#E9E6DF" }}>
      <h1 style={{ textAlign: "center" }}>Categories</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button style={{ marginRight: "10px" }} onClick={() => handleSort("maxToMin")}>
          Max to Min Price
        </button>
        <button onClick={() => handleSort("minToMax")}>Min to Max Price</button>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label>
          Min Price:
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Max Price:
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </label>
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by product name"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Clothes for Men and Woman">Clothes for Men and Woman</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}></div>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {currentProducts
            .filter((product) => {
              if (selectedCategory && product.category.name !== selectedCategory) {
                return false;
              }
              return product.title.toLowerCase().includes(inputText.toLowerCase());
            })
            .map((product) => (
              <div
                key={product.id}
                style={{ border: "1px solid #ccc", padding: "10px", textAlign: "center", borderRadius: "10px" }}
              >
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : defaultImage}
                  alt={`Product ${product.id}`}
                  height="150"
                  width="auto"
                  loading="lazy"
                  style={{ borderRadius: "10px" }}
                />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </div>
            ))}
        </div>
      )}

      <ul
        style={{
          display: "flex",
          listStyle: "none",
          padding: "0px",
          justifyContent: "center",
          marginTop: "20px",
          margin: "20px",
        }}
      >
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
          <li key={index} className={currentPage === index + 1 ? "active" : ""}>
            <a onClick={() => paginate(index + 1)}>{index + 1}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}



export default CategoriesScreen;
