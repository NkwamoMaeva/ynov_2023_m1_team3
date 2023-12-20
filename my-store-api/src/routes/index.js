const express = require('express');
const productRoute = require('./product.route');
const metricRoute = require('./metric.route');

const router = express.Router();

router.use('/products', productRoute);
router.use('/metrics' , metricRoute);

module.exports = router;
