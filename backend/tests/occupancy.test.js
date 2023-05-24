const request = require("supertest");
const app = require("../index");
const sensors = require("../data");

describe("GET /api/:id/occupancy", () => {
  test("should get the occupancy for a specific sensor", async () => {
    // Arrange
    const sensorId = 2;
    // Execute
    const response = await request(app).get(
      `/api/occupancy/${sensorId}/occupancy`
    );
    // Assert
    const expectedSensor = sensors.find((sensor) => sensor.id === sensorId);
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(expectedSensor.name);
  });

  test("should return a 404 error if the sensor is not found", async () => {
    // Arrange
    const sensorId = 999;
    // Execute
    const response = await request(app).get(
      `/api/occupancy/${sensorId}/occupancy`
    );
    //Assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Sensor not found" });
  });

  test("should get the occupancy for a specific sensor at a given instant", async () => {
    // Arrange
    const sensorId = 3;
    const atInstant = "2022-05-14";
    // Execute
    const response = await request(app).get(
      `/api/occupancy/${sensorId}/occupancy?atInstant=${atInstant}`
    );
    // Assert
    const expectedSensor = sensors.find((sensor) => sensor.id === sensorId);
    const instant = new Date(atInstant).getTime();
    const occupancyData =
      expectedSensor.timestamp === instant ? expectedSensor.occupancy : null;
    if (!occupancyData) {
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: "Occupancy data not found for the specified instant",
      });
    } else {
      expect(response.status).toBe(200);
      expect(response.body.name).toEqual(expectedSensor.name);
      expect(response.body.occupancy).toEqual(occupancyData);
    }
  });
});
