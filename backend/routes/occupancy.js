const express = require("express");
const router = express.Router();
const sensors = require("../data");

/* GET /api/:id/occupancy 
- Retrieve the occupancy data for a specific sensor
   Takes the sensor ID as a parameter and returns the occupancy data (in and out values) for the corresponding sensor.
   If the sensor is found, the endpoint returns the occupancy data as a JSON response.
   If the sensor is not found, it returns a 404 error with a JSON response indicating that the sensor was not found.
*/
router.get("/:id/occupancy", (req, res) => {
  const sensorId = req.params.id;
  const atInstant = req.query.atInstant;

  // Find the sensor with the specified ID
  const sensor = sensors.find((sensor) => sensor.id === parseInt(sensorId));
  if (!sensor) {
    // Return a 404 error if the sensor does not exist
    return res.status(404).json({ error: "Sensor not found" });
  }

  let occupancy = sensor.occupancy;

  if (atInstant) {
    const instant = new Date(atInstant);
    const sensorTimestamp = new Date(sensor.timestamp);

    // Compare dates without considering time
    if (
      sensorTimestamp.getFullYear() !== instant.getFullYear() ||
      sensorTimestamp.getMonth() !== instant.getMonth() ||
      sensorTimestamp.getDate() !== instant.getDate()
    ) {
      // Return a 404 error if occupancy data for the specified instant is not found
      return res
        .status(404)
        .json({ error: "Occupancy data not found for the specified instant" });
    }
  }

  res.json({ name: sensor.name, occupancy: occupancy });
});

module.exports = router;
