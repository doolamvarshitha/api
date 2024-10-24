const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// API Endpoint to calculate total value of products
app.post('/api/calculate-total', (req, res) => {
  const products = req.body.products;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Invalid input: products should be a non-empty array.' });
  }

  const totalValue = products.reduce((total, product) => {
    if (typeof product.price !== 'number' || product.price < 0) {
      return total; // Ignore invalid prices
    }
    return total + product.price;
  }, 0);

  return res.json({ totalValue });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
