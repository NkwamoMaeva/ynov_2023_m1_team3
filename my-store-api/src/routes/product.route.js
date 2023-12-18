const express = require('express');

const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/:id', productController.getProduct);
router.get('/', productController.getProducts);
router.get('/filters', productController.getProducts);

module.exports = router;
