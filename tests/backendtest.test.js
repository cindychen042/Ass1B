const { server: app } = require('../backend/app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');
const connectDB = require('../config/db');

beforeAll(() => {
  return connectDB();
});

afterAll(() => {
  app.close();
  return mongoose.connection.close();
});


it('GET analyser / endpoint', async () => {
  const res = await request.get('/api/analyser/analyser/articles').send();
  expect(res.statusCode).toBe(200);
});

it('GET  / endpoint', async () => {
  const res = await request.get('/api').send();
  expect(res.statusCode).toBe(200);
});
