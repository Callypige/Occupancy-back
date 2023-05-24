const express = require('express');
const router = express.Router();
const sensors = require('../data');

/* GET /api/sensors 
- Retrieve the list of sensors
   Returns an array of sensor objects containing information about each sensor, 
   including their ID, name, and occupancy data (in and out values).
   The endpoint returns the list of sensors as a JSON response.
*/
router.get("/", (req, res) => {
    res.json(sensors);
  });

  module.exports = router;