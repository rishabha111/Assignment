
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const stripe = require('stripe')('sk_test_51MgjZHSHcIoJgtyCAdHyDwgeYc9lYwRVL52VsEKGPNimz4ck7GQ5FhdOBNKQe4Gblfau9cirWD6fVRrlzcDH4Z6O00HSMHFLrg');

const app = express();
const port = 7000;

app.use(cors());
app.use(express.json());

const crypto = require('crypto');
const randomSecret = crypto.randomBytes(64).toString('hex');
app.use(session({
    secret: randomSecret,
    resave: false,
    saveUninitialized: true
}));



app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const hardcodedClientSecret = 'pka3468ngfdfdsgsfg54wfd4trfrg';

    console.log('Hardcoded Client Secret:', hardcodedClientSecret);

    res.json({ clientSecret: hardcodedClientSecret });

    console.log('Response Sent:', { clientSecret: hardcodedClientSecret });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session' });
  }
});




// app.post('/api/create-checkout-session', async (req, res) => {
//   try {
//     // Generate a URL-safe base64 encoded session ID
//     const id = Buffer.from(req.session.id).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

//     const sessionData = {
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: req.body.map(product => {
//         return {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: product.title,
//               images: [product.image],
//             },
//             unit_amount: product.price * 100, // Stripe expects the amount in cents
//           },
//           quantity: 1,
//         };
//       }),
//       success_url: 'https://your-website.com/success',
//       cancel_url: 'https://your-website.com/cancel',
//       client_reference_id: id // Use session ID as client reference ID
//     };

//     console.log('Session Data:', sessionData); // Log session data

//     const stripeSession = await stripe.checkout.sessions.create(sessionData);

//     console.log('Stripe Session:', stripeSession); // Log the stripeSession object
//     console.log('Client Secret:', stripeSession.client_secret); // Log the client secret

//     res.json({ clientSecret: stripeSession.client_secret });
    
//     console.log('Response Sent:', { clientSecret: stripeSession.client_secret }); // Log the response sent to client
    
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An error occurred while creating the checkout session' });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
