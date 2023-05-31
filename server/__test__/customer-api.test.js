const request = require('supertest');
const app = require('../app');
const { hashPassword } = require('../helpers/bcrypt');

const { sequelize } = require('../models');

beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
    const newCustomer = {
      email: 'customer1@mail.com',
      password: hashPassword('customer1'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newCustomer2 = {
      email: 'customer9@mail.com',
      password: hashPassword('customer9'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await sequelize.queryInterface.bulkInsert('Customers', [newCustomer, newCustomer2], {});
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await sequelize.queryInterface.bulkDelete('Customers', null, {
      restartIdentity: true,
      cascade: true,
      truncate: true,
    });
    await sequelize.close();
  } catch (error) {
    console.log(error);
  }
});

describe('Register Customer', () => {
  it('should successfully register a customer', async () => {
    const response = await request(app).post('/pub/register').send({
      email: 'anto@klewang.com',
      password: 'password',
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('email', 'anto@klewang.com');
  });

  it('should return error if email is not provided', async () => {
    const newUser = {
      password: 'customer1',
    };
    const response = await request(app).post('/pub/register').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: `Email is required`,
    });
  });

  it('should return error if email is an empty string', async () => {
    const newUser = {
      email: '',
      password: 'customer1',
    };
    const response = await request(app).post('/pub/register').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: `Email is required`,
    });
  });

  it('should return error if password is not provided', async () => {
    const newUser = {
      email: 'customer1@mail.com',
    };
    const response = await request(app).post('/pub/register').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: `Password is required`,
    });
  });

  it('should return error if password is an empty string', async () => {
    const newUser = {
      email: 'customer1@mail.com',
      password: '',
    };
    const response = await request(app).post('/pub/register').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: `Password is required`,
    });
  });

  it('should return error if email is already registered', async () => {
    const newUser = {
      email: 'customer1@mail.com',
      password: 'customer1',
    };
    const response = await request(app).post('/pub/register').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: `Email is already used`,
    });
  });

  
  it('should return error if email format is invalid', async () => {
    const newUser = {
      email: 'customer1',
      password: 'customer1',
    };
    const response = await request(app).post('/pub/register').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({
      message: `Invalid email format`,
    });
  });
});

describe('Customer Login', () => {
  it('should successfully login', async () => {
    const response = await request(app).post('/pub/login').send({ email: 'customer1@mail.com', password: 'customer1' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('email', 'customer1@mail.com');
    expect(response.body).toHaveProperty('role', 'customer');
  });

  it('should return error if password is invalid', async () => {
    const response = await request(app).post('/pub/login').send({ email: 'customer1@mail.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Email/password is wrong');
  });

  it('should return error if password is invalid', async () => {
    const response = await request(app).post('/pub/login').send({ email: 'notimpostor@mail.com', password: 'password' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Email/password is wrong');
  });
});
