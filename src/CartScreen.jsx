import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CartScreen = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentResult, setPaymentResult] = useState(null);
  const dummyImageURL = 'https://dummyimage.com/600x400/000/fff';
  const stripePromise = loadStripe('pk_test_123456789'); 
useEffect(() => {
  const storedProducts = localStorage.getItem("addedProducts");
  const storedCartItems = localStorage.getItem("cartItems");

  console.log("Stored products:", storedProducts);
  console.log("Stored cart items:", storedCartItems);

  let mergedProducts = [];

  if (storedProducts) {
    const parsedProducts = JSON.parse(storedProducts);
    mergedProducts = parsedProducts;
  }

  if (storedCartItems) {
    const parsedCartItems = JSON.parse(storedCartItems);
    mergedProducts = [...mergedProducts, ...parsedCartItems];
  }

  console.log("Merged products:", mergedProducts);

  setCartProducts(mergedProducts);
}, []);




  const handleAddToCart = (productId) => {
    const updatedCartProducts = cartProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: (product.quantity || 0) + 1 };
      }
      return product;
    });

    setCartProducts(updatedCartProducts);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCartProducts = cartProducts.map((product) => {
      if (product.id === productId && product.quantity > 0) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });

    setCartProducts(updatedCartProducts);
  };

  const handleRemoveProduct = (productId) => {
    const updatedCartProducts = cartProducts.filter(product => product.id !== productId);
    setCartProducts(updatedCartProducts);
  };

  const getTotalPrice = () => {
    return cartProducts.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);
  };

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

      console.log("Response from backend:", response); 

      const { clientSecret } = await response.data;
      console.log("Received clientSecret from backend:", clientSecret);

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
        return;
      }

      try {
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
        <CardElement />
        <button type="submit" disabled={!stripe}>Pay</button>
      </form>
    );
  };

  return (
    <div style={{ backgroundColor: "#E9E6DF" }}>
      <h1>My Cart</h1>
      <button onClick={handleCheckout}>Checkout</button>
      {clientSecret && (
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      )}
      {paymentResult && (
        <div style={{ marginTop: '20px', color: paymentResult.success ? 'green' : 'red' }}>
          {paymentResult.message}
        </div>
      )}
      <div>
        <h2>Cart Items</h2>
        {cartProducts.map((product, index) => (
          <div key={index} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <img
              src={product.image || dummyImageURL}
              alt={product.title}
              height="200"
              width="auto"
              style={{ maxWidth: '20%', height: 'auto', borderRadius: '10px' }}
            />
            <div style={{ marginLeft: '20px' }}>
              <p>{product.title}</p>
              <p>{product.description}</p>
              <p style={{ fontWeight: "500" }}>Price: ${product.price * (product.quantity || 1)}</p>
              <div>
                <button onClick={() => handleAddToCart(product.id)}>+</button>
                <span style={{margin:'10px' ,color:"red",border:"10%"}}>{product.quantity || 0}</span>
                <button style={{margin:'10px' ,border:"10%"}} onClick={() => handleRemoveFromCart(product.id)}>-</button>
                <button style={{margin:'10px',border:"10%"}} onClick={() => handleRemoveProduct(product.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>Total Price :${getTotalPrice()}</h2>
        {/* <p>${getTotalPrice()}</p> */}
      </div>
    </div>
  );
};

export default CartScreen;




