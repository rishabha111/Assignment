import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function ProductScreen({ addToCart, showProductDetails }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(18);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const defaultImage = "https://i.imgur.com/cHddUCu.jpeg";

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const offset = (currentPage - 1) * productsPerPage;
      const limit = productsPerPage;
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${24}`);
      const productsWithImages = response.data.map((product) => {
        let productImage = defaultImage;
        if (Array.isArray(product.images) && product.images.length > 0) {
          if (product.images.length === 1 && product.images[0].startsWith('["') && product.images[0].endsWith('"]')) {
          } else {
            productImage = product.images[0];
          }
        }
        return {
          ...product,
          image: productImage,
        };
      });
      setProducts(productsWithImages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleProductClick = useCallback((product) => {
    if (!selectedProduct) {
      showProductDetails(product);
      setSelectedProduct(product);
    }
  }, [selectedProduct, showProductDetails]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{marginleft:'10px',marginRight:'10px',backgroundColor:"#E9E6DF"}}>
      <h1 style={{ textAlign: "center" }}>Products</h1>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-item" onClick={() => handleProductClick(product)}>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="product-image"
                />
              ) : (
                <img
                  src={defaultImage}
                  alt="Image Not Found"
                  loading="lazy"
                  className="product-image"
                />
              )}
              <div className="product-details">
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
          <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
            <a onClick={() => paginate(index + 1)}>{index + 1}</a>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .product-item {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
          cursor: pointer;
          border-radius: 10px;
          transition: transform 0.3s ease-in-out;
        }

        .product-item:hover {
          transform: scale(1.05);
        }

        .product-details {
          margin-top: 10px;
        }

        .pagination {
          display: flex;
          list-style: none;
          padding: 0;
          justify-content: center;
          margin-top: 20px;
        }

        .pagination li {
          margin: 0 5px;
          cursor: pointer;
        }

        .pagination li.active {
          font-weight: bold;
        }

        .product-image {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

export default ProductScreen;
