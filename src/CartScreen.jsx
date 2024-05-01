

// import React, { useState, useEffect } from "react";
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));
// const CartScreen = () => {
//     const [cartProducts, setCartProducts] = useState([]);

//     useEffect(() => {
//         const storedProducts = localStorage.getItem("addedProducts");
//         if (storedProducts) {
//             const parsedProducts = JSON.parse(storedProducts);
//             setCartProducts(parsedProducts);
//         }
//     }, []);

//     return (
//      <div style={{backgroundColor:"#E9E6DF"}}>
//   <h1> My Cart</h1>
//   <div>
//     {cartProducts.map((product) => (
//       <div key={product.id} style={{ marginBottom: '20px' }}>
//         <img
//           src={product.image}
//           alt={product.name}
//           height="200"
//           width="auto"
//           style={{ maxWidth: '20%', height: 'auto', borderRadius: '10px' }}
//         />
//         <div>
//           <p>{product.title}</p>
//           <p>Product Type : {product.category.name}</p>
//           <p>{product.description}</p>
//           <p style={{ fontWeight: "500" }}>Price: ${product.price}</p>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
//   );
// }
// export default CartScreen;



import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios'; // Import Axios for making HTTP requests

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CartScreen = () => {
    const [cartProducts, setCartProducts] = useState([]);
const dummyImageURL = 'https://dummyimage.com/600x400/000/fff';

    useEffect(() => {
        const storedProducts = localStorage.getItem("addedProducts");
        if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts);
            setCartProducts(parsedProducts);
        }
    }, []);


//     const handleCheckout = async () => {
//   try {
//     const flattenedProducts = cartProducts.map((product) => ({
//       ...product,
//       image: dummyImageURL, // Use dummy image URL
//     }));
//     const response = await axios.post(
//       'http://localhost:3000/api/create-checkout-session',
//       flattenedProducts
//     );
//     console.log("@@@@@@@", response.data); // Assuming your server returns some data
//     // Handle success or update UI accordingly
//   } catch (error) {
//     console.error('Error:', error);
//     // Handle error or update UI accordingly
//   }
  // };
  
  const handleCheckout = async () => {
  try {
    const flattenedProducts = cartProducts.map((product) => ({
      ...product,
      image: dummyImageURL, // Use dummy image URL
    }));
    
    const response = await fetch('http://localhost:7000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(flattenedProducts)
    });

    const responseData = await response.json();
    console.log("111111111", responseData); // Assuming your server returns some data
    // Handle success or update UI accordingly
  } catch (error) {
    console.error('Error:', error);
    // Handle error or update UI accordingly
  }
};

    return (
     <div style={{backgroundColor:"#E9E6DF"}}>
        <h1>My Cart</h1>
        <button onClick={handleCheckout}>Checkout</button>
        <div>
            {cartProducts.map((product) => (
            <div key={product.id} style={{ marginBottom: '20px' }}>
                <img
                src={product.image}
                alt={product.title}
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
};

export default CartScreen;

