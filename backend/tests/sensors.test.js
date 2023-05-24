const request = require('supertest');
const app = require('../index');
const sensors = require('../data');

describe('GET /api/sensors', () => {
  test('should return the list of sensors', async () => {
    // Execute
    const response = await request(app).get('/api/sensors');
    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(sensors);
  });
});