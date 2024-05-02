// import React, { useState, useEffect } from "react";
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
// import { PaymentElement } from '@stripe/react-stripe-js';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// const PaymentForm = ({ handlePayment }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   return (
//     <form onSubmit={(e) => {
//       e.preventDefault();
//       handlePayment(stripe, elements);
//     }}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// const CartScreen = () => {
//   const [cartProducts, setCartProducts] = useState([]);
//   const [clientSecret, setClientSecret] = useState('');
//   const dummyImageURL = 'https://dummyimage.com/600x400/000/fff';

//   useEffect(() => {
//     const storedProducts = localStorage.getItem("addedProducts");
//     if (storedProducts) {
//       const parsedProducts = JSON.parse(storedProducts);
//       setCartProducts(parsedProducts);
//     }
//   }, []);

//   const handleCheckout = async () => {
//     try {
//       const flattenedProducts = cartProducts.map((product) => ({
//         ...product,
//         image: dummyImageURL,
//       }));

//       const response = await axios.post(
//         'http://localhost:7000/api/create-checkout-session',
//         flattenedProducts
//       );

//       console.log("TESTESTTEST", response);
//       const { clientSecret } = await response.data;
//       console.log("Received clientSecret from backend:", clientSecret);
//       setClientSecret(clientSecret);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const stripePromise = loadStripe('pk_test_51MgjZHSHcIoJgtyCRg1Rt5UWm6MgsbHHZUS2wbZ1rcPjUnYjYmLlAif1BkQkzJ4sjwUHbbdeBLRAsEN2XCWO8A6K00AXfBoNkh');

//   const handlePayment = async (stripe, elements) => {
//     if (!stripe || !elements) {
//       return;
//     }

//     if (clientSecret) {
//       const { error } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: 'https://your-website.com/success',
//         },
//       });

//       if (error) {
//         console.error('Error:', error);
//       } else {
//         // Handle successful payment or update UI accordingly
//       }
//     }
//   };



//   return (
//     <div style={{ backgroundColor: "#E9E6DF" }}>
//       <h1>My Cart</h1>
//       <button onClick={handleCheckout}>Checkout</button>
//       {clientSecret && (
//        <Elements stripe={stripePromise} options={{ clientSecret }}>
//   <PaymentForm handlePayment={handlePayment} />
// </Elements>

//       )}
//       <div>
//         <h2>Cart Items</h2>
//         {cartProducts.map((product, index) => (
//           <div key={index} style={{ marginBottom: '20px' }}>
//             <img
//               src={product.image || dummyImageURL}
//               alt={product.title}
//               height="200"
//               width="auto"
//               style={{ maxWidth: '20%', height: 'auto', borderRadius: '10px' }}
//             />
//             <div>
//               <p>{product.title}</p>
//               <p>Product Type: {product.category.name}</p>
//               <p>{product.description}</p>
//               <p style={{ fontWeight: "500" }}>Price: ${product.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CartScreen;










// import React, { useState, useEffect } from "react";
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
// import { PaymentElement } from '@stripe/react-stripe-js';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// const PaymentForm = ({ handlePayment }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   return (
//     <form onSubmit={(e) => {
//       e.preventDefault();
//       handlePayment(stripe, elements);
//     }}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// const CartScreen = () => {
//   const [cartProducts, setCartProducts] = useState([]);
//   const [clientSecret, setClientSecret] = useState('');
//   const dummyImageURL = 'https://dummyimage.com/600x400/000/fff';

//   useEffect(() => {
//     const storedProducts = localStorage.getItem("addedProducts");
//     if (storedProducts) {
//       const parsedProducts = JSON.parse(storedProducts);
//       setCartProducts(parsedProducts);
//     }
//   }, []);

//   const handleCheckout = async () => {
//     try {
//       const flattenedProducts = cartProducts.map((product) => ({
//         ...product,
//         image: dummyImageURL,
//       }));

//       const response = await axios.post(
//         'http://localhost:7000/api/create-checkout-session',
//         flattenedProducts
//       );

//       console.log("TESTESTTEST", response);
//       const { clientSecret } = await response.data;
//       console.log("Received clientSecret from backend:", clientSecret);
//       setClientSecret(clientSecret);
//     } catch (error) {
//     }
//   };

//   const stripePromise = loadStripe('pk_test_51MgjZHSHcIoJgtyCRg1Rt5UWm6MgsbHHZUS2wbZ1rcPjUnYjYmLlAif1BkQkzJ4sjwUHbbdeBLRAsEN2XCWO8A6K00AXfBoNkh');

//   const handlePayment = async (stripe, elements) => {
//     if (!stripe || !elements) {
//       return;
//     }

//     if (clientSecret) {
//       const { error } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: 'https://your-website.com/success',
//         },
//       });

//       if (error) {
//         console.error('Error:', error);
//       } else {
//         // Handle successful payment or update UI accordingly
//       }
//     }
//   };



//   return (
//     <div style={{ backgroundColor: "#E9E6DF" }}>
//       <h1>My Cart</h1>
//       <button onClick={handleCheckout}>Checkout</button>
//       {clientSecret && (
//        <Elements stripe={stripePromise} options={{ "clientSecret":  clientSecret}}>
//   <PaymentForm handlePayment={handlePayment} />
// </Elements>

//       )}
//       <div>
//         <h2>Cart Items</h2>
//         {cartProducts.map((product, index) => (
//           <div key={index} style={{ marginBottom: '20px' }}>
//             <img
//               src={product.image || dummyImageURL}
//               alt={product.title}
//               height="200"
//               width="auto"
//               style={{ maxWidth: '20%', height: 'auto', borderRadius: '10px' }}
//             />
//             <div>
//               <p>{product.title}</p>
//               <p>Product Type: {product.category.name}</p>
//               <p>{product.description}</p>
//               <p style={{ fontWeight: "500" }}>Price: ${product.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CartScreen;











// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import axios from "axios";

// const CartScreen = () => {
//   const [cartProducts, setCartProducts] = useState([]);
//   const [clientSecret, setClientSecret] = useState('');
//   const dummyImageURL = 'https://dummyimage.com/600x400/000/fff';

// useEffect(() => {
//   const storedProducts = localStorage.getItem("addedProducts");
//   if (storedProducts) {
//     const parsedProducts = JSON.parse(storedProducts);
//     setCartProducts(parsedProducts);
//   }
// }, []);
//   const handleCheckout = async () => {
//     try {
//       const flattenedProducts = cartProducts.map((product) => ({
//         ...product,
//         image: dummyImageURL,
//       }));

//       const response = await axios.post(
//         'http://localhost:7000/api/create-checkout-session',
//         flattenedProducts
//       );

//       console.log("Response from backend:", response); // Log the entire response

//       const { clientSecret } = await response.data;
//       console.log("Received clientSecret from backend:", clientSecret); // Log the clientSecret

//       // Extract id and secret from clientSecret received
//       const [id, secret] = clientSecret.split('_secret_');

//       // Construct the clientSecret in the required format
//       const formattedClientSecret = `${id}_secret_${secret}`;

//       setClientSecret(formattedClientSecret);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const stripePromise = loadStripe('pk_test_51MgjZHSHcIoJgtyCRg1Rt5UWm6MgsbHHZUS2wbZ1rcPjUnYjYmLlAif1BkQkzJ4sjwUHbbdeBLRAsEN2XCWO8A6K00AXfBoNkh');

//   return (
//     <div style={{ backgroundColor: "#E9E6DF" }}>
//       <h1>My Cart</h1>
//       <button onClick={handleCheckout}>Checkout</button>
//       {clientSecret && (
//         <Elements stripe={stripePromise}>
//           {/* Your payment form component */}
//         </Elements>
//       )}
//       <div>
//         <h2>Cart Items</h2>
//         {cartProducts.map((product ,index) => (
//           <div key={index} style={{ marginBottom: '20px' }}>
//             <img
//               src={product.image || dummyImageURL}
//               alt={product.title}
//               height="200"
//               width="auto"
//               style={{ maxWidth: '20%', height: 'auto', borderRadius: '10px' }}
//             />
//             <div>
//               <p>{product.title}</p>
//               <p>Product Type: {product.category.name}</p>
//               <p>{product.description}</p>
//               <p style={{ fontWeight: "500" }}>Price: ${product.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CartScreen;







import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CartScreen = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentResult, setPaymentResult] = useState(null);
  const dummyImageURL = 'https://dummyimage.com/600x400/000/fff';
  const stripePromise = loadStripe('pk_test_123456789'); // Replace with your actual publishable key

  useEffect(() => {
    const storedProducts = localStorage.getItem("addedProducts");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setCartProducts(parsedProducts);
    }
  }, []);

  const handleCheckout = async () => {
    try {
      const flattenedProducts = cartProducts.map((product) => ({
        ...product,
        image: dummyImageURL,
      }));

      const response = await axios.post(
        'http://localhost:7000/api/create-checkout-session',
        flattenedProducts
      );

      console.log("Response from backend:", response); // Log the entire response

      const { clientSecret } = await response.data;
      console.log("Received clientSecret from backend:", clientSecret); // Log the clientSecret

      setClientSecret(clientSecret);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      try {
        // Handle payment submission
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: "Jenny Rosen",
            },
          }
        });

        if (error) {
          console.error('Payment failed:', error.message);
          setPaymentResult({ success: false, message: error.message });
        } else {
          console.log('Payment successful:', paymentIntent);
          setPaymentResult({ success: true, message: 'Payment successful' });
        }
      } catch (error) {
        console.error('Error:', error);
        setPaymentResult({ success: false, message: 'An error occurred while processing the payment' });
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <CardElement style={{marginleft:'30px'}} />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  };

  return (
    <div style={{ backgroundColor: "#E9E6DF" }}>
      <h1>My Cart</h1>
      <button onClick={handleCheckout}>Checkout</button>
      {clientSecret && (
        <Elements stripe={stripePromise}>
          <PaymentForm  />
        </Elements>
      )}
      {paymentResult && (
        <div style={{ marginTop: '20px', color: paymentResult.success ? 'green' : 'red' }}>
          {paymentResult.message}
        </div>
      )}
      <div>
        <h2>Cart Items</h2>
        {cartProducts.map((product ,index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <img
              src={product.image || dummyImageURL}
              alt={product.title}
              height="200"
              width="auto"
              style={{ maxWidth: '20%', height: 'auto', borderRadius: '10px' }}
            />
            <div>
              <p>{product.title}</p>
              <p>Product Type: {product.category.name}</p>
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
