

import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const CartScreen = () => {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem("addedProducts");
        if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            setCartProducts(parsedProducts);
        }
    }, []);

    return (
     <div style={{backgroundColor:"#E9E6DF"}}>
  <h1> My Cart</h1>
  <div>
    {cartProducts.map((product) => (
      <div key={product.id} style={{ marginBottom: '20px' }}>
        <img
          src={product.image}
          alt={product.name}
          height="200"
          width="auto"
          style={{ maxWidth: '20%', height: 'auto', borderRadius: '10px' }}
        />
        <div>
          <p>{product.title}</p>
          <p>Product Type : {product.category.name}</p>
          <p>{product.description}</p>
          <p style={{ fontWeight: "500" }}>Price: ${product.price}</p>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}
export default CartScreen;
