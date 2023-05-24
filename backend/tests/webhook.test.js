const request = require("supertest");
const app = require("../index");
const sensors = require("../data");

describe("POST /api/webhook - Create a new sensor", () => {
  test("Should create a new sensor and retrn it with a 201 status code", async () => {
    const newSensor = {
      name: "New sensor",
      inValue: 10,
      outValue: 5,
    };
    //Execute
    const response = await request(app).post("/api/webhook").send(newSensor);
    // Assert
    expect(response.status).toBe(201);
    expect(response.body.name).toEqual(newSensor.name);
    expect(response.body.in).toEqual(newSensor.inValue);
    expect(response.body.out).toEqual(newSensor.outValue);
    expect(response.body.occupancy).toBe(newSensor.inValue - newSensor.outValue);
    expect(response.body.timestamp).toBeDefined();
  });
});
