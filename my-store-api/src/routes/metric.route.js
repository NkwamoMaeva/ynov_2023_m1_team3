const express = require('express');

const router = express.Router();
const metricController = require('../controllers/metric.controller');


router.get('/', metricController.getFilterMetrics);
router.post('/postValues', metricController.postFilterValues);


module.exports = router;
