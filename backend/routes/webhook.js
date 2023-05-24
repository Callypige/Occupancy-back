const express = require('express');
const router = express.Router();
const sensors = require('../data');

/* POST /api/webhook - Create a new sensor with provided data
   Accepts a JSON payload in the request body containing the name, inValue, and outValue of the sensor.
   Creates a new sensor object with the provided values, including a timestamp representing the creation time.
   Calculates the occupancy by subtracting the outValue from the inValue.
   Adds the new sensor to the sensors array.
   Returns a 201 status code with the newly created sensor object as a JSON response.
*/
router.post("/", (req, res) => {
    const { name, inValue, outValue } = req.body;
  
    // Get the last id of the sensor list
    const maxId = Math.max(...sensors.map((sensor) => sensor.id));
  
    // Create new sensor with the given values
    const newSensor = {
      id: maxId + 1,
      name: name,
      in: inValue,
      out: outValue,
      timestamp: Date.now(),
    };
  
    newSensor.occupancy = newSensor.in - newSensor.out;
  
    // Add the new sensor to the sensors array
    sensors.push(newSensor);
  
    res.status(201).json(newSensor);
  });

  module.exports = router;
