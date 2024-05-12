const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');
const auth = require('../middleware/auth');

// Add a product
router.post('/addproduct', auth, async (req, res) => {
  try {
    const product = new Product(req.body);  
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Update a product
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete a product
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Fetch products with price less than a certain value
router.get('/price-less-than/:value', auth, async (req, res) => {
  try {
    const { value } = req.params;
    const products = await Product.find({ price: { $lt: parseFloat(value) } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Fetch products with rating higher than a certain value
router.get('/rating-higher-than/:value', auth, async (req, res) => {
  try {
    const { value } = req.params;
    const products = await Product.find({ rating: { $gt: parseFloat(value) } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

module.exports = router;
