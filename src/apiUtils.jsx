import axios from "axios";
  const defaultImage = "https://i.imgur.com/cHddUCu.jpeg";
export const getProducts = async (currentPage, productsPerPage) => {
  try {
    const offset = (currentPage - 1) * productsPerPage;
    const limit = productsPerPage;
    const response = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
    const productsWithImages = response.data.map((product) => {
      let productImage = "https://i.imgur.com/cHddUCu.jpeg";
      if (Array.isArray(product.images) && product.images.length > 0) {
        if (
          product.images.length === 1 &&
          product.images[0].startsWith('["') &&
          product.images[0].endsWith('"]')
        ) {
        } else {
          productImage = defaultImage 
        }
      }
      return {
        ...product,
        image: productImage,
      };
    });
    return productsWithImages;
  } catch (error) {
    throw new Error("Error fetching products from the API.");
  }
};
