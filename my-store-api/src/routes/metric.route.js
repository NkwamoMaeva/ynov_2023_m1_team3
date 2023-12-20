const express = require('express');

const router = express.Router();
const metricController = require('../controllers/metric.controller');


router.get('/', metricController.getFilterMetrics);


module.exports = router;
