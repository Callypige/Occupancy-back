const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Import routes endpoints API
const sensorRoutes = require("./routes/sensors");
const occupancyRoutes = require("./routes/occupancy");
const webhookRoutes = require("./routes/webhook");

// Use routes files as middleware
app.use("/api/sensors", sensorRoutes);
app.use("/api/occupancy", occupancyRoutes);
app.use("/api/webhook", webhookRoutes);

module.exports = app;