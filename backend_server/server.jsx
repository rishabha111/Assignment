const express = require('express');
const stripe = require('stripe')('pk_test_51PAM9fSEX84BngO5X4SAgP2LRWAHOybTxNMEmASmTVNXKVJHv8TzrW5B219cuaJk9HAa0KvHGFCb97yUV0Oz4i9J00Up9mt0JE')
const app = express();
app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    
    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
});
