const request = require('supertest');
const express = require('express');
const { signup, signin } = require('../controllers/authController');
const User = require('../models/User');
const { setupTestDB } = require('./setup');

const app = express();
app.use(express.json());
app.post('/signup', signup);
app.post('/signin', signin);

setupTestDB();

describe('Auth API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  it('should signup a user successfully', async () => {
    const userData = { email: 'abiodun@gmail.com', password: 'password123' };

    const response = await request(app)
      .post('/signup')
      .send(userData)
      .expect(201);

    expect(response.body.message).toBe('signup successfully');
    expect(response.body.user.email).toBe(userData.email);
  });

  it('should signin a user successfully', async () => {
    const userData = { email: 'Abiodun@gmail.com.com', password: 'password123' };

    // Create user first
    await User.create(userData);

    const response = await request(app)
      .post('/signin')
      .send(userData)
      .expect(200);

    expect(response.body.message).toBe('Signin Successfully');
    expect(response.body.user.email).toBe(userData.email);
    expect(response.body.token).toBeDefined();
  });

  it('should not signin with invalid credentials', async () => {
    const userData = { email: 'abiodun@example.com', password: 'wrongpassword' };

    const response = await request(app)
      .post('/signin')
      .send(userData)
      .expect(401);

    expect(response.body.message).toBe('Invalid credentials');
  });
});
