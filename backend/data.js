// Sensors data
let sensors = [
  { id: 1, name: "Sensor 1", in: 23, out: 1, timestamp: "2023-05-14" },
  { id: 2, name: "Sensor 2", in: 4, out: 3, timestamp: "2023-05-16" },
  { id: 3, name: "Sensor 3", in: 6, out: 1, timestamp: "2023-05-14" },
];

// Calculate field occupancy for each sensor
sensors.forEach((sensor) => {
  sensor.occupancy = sensor.in - sensor.out;
});

module.exports = sensors;
