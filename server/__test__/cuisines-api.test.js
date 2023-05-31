const request = require('supertest');
const app = require('../app');
const { hashPassword } = require('../helpers/bcrypt');
const { encodeToken } = require('../helpers/token');
const { sequelize, Customer } = require('../models');

let access_token;

const wrong_token = 'nevergonnagiveyouupnevergonnaletyoudown';

const newCustomer = {
  email: 'customer1@mail.com',
  password: hashPassword('customer1'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeAll(async () => {
  try {
    let users = require('../data/users.json');
    users.forEach((el) => {
      el.password = hashPassword(el.password);
      el.createdAt = el.updatedAt = new Date();
    });

    let categories = require('../data/categories.json');
    categories.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    let cuisines = require('../data/cuisines.json');
    cuisines.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    let customers = {
      email: 'customer1@mail.com',
      password: hashPassword('customer1'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let bookmark = {
      CuisineId: 1,
      CustomerId: 1,
    };

    const userLogin = await Customer.create(newCustomer);

    access_token = encodeToken({ id: userLogin.id });

    await sequelize.queryInterface.bulkInsert('Users', users, {});
    await sequelize.queryInterface.bulkInsert('Categories', categories, {});
    await sequelize.queryInterface.bulkInsert('Cuisines', cuisines, {});
    await sequelize.queryInterface.bulkInsert('Customers', customers, {});
    await sequelize.queryInterface.bulkInsert('Bookmarks', bookmark, {});
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await sequelize.queryInterface.bulkDelete('Users');
    await sequelize.queryInterface.bulkDelete('Customers');
    await sequelize.queryInterface.bulkDelete('Categories');
    await sequelize.queryInterface.bulkDelete('Cuisines');
    await sequelize.queryInterface.bulkDelete('Bookmarks');
  } catch (error) {
    console.log(error);
  }
});

describe('GET /cuisines', () => {
  it('should return list of cuisines', async () => {
    const response = await request(app).get('/pub/cuisines');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('currentPage');
    expect(response.body).toHaveProperty('cuisines');
    expect(response.body).toHaveProperty('totalPage');

    const cuisines = response.body.cuisines;
    expect(cuisines).toBeInstanceOf(Array);
    expect(cuisines.length).toBeGreaterThan(0);

    const firstCuisine = cuisines[0];
    expect(firstCuisine).toHaveProperty('name');
    expect(firstCuisine).toHaveProperty('description');
    expect(firstCuisine).toHaveProperty('price');
    expect(firstCuisine).toHaveProperty('imgUrl');
    expect(firstCuisine).toHaveProperty('authorId');
    expect(firstCuisine).toHaveProperty('categoryId');
  });

  it('should return filtered list of cuisines', async () => {
    const response = await request(app).get('/pub/cuisines').query({ filter: 'Kebab' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('currentPage');
    expect(response.body).toHaveProperty('cuisines');
    expect(response.body).toHaveProperty('totalPage');

    const cuisines = response.body.cuisines;
    expect(cuisines).toBeInstanceOf(Array);
    expect(cuisines.length).toBeGreaterThan(0);

    cuisines.forEach((cuisine) => {
      expect(cuisine.name.toLowerCase()).toContain('kebab');
    });
  });

  it('should return paged list of cuisines', async () => {
    const response = await request(app).get('/pub/cuisines').query({ page: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('currentPage');
    expect(response.body).toHaveProperty('cuisines');
    expect(response.body).toHaveProperty('totalPage');

    const cuisines = response.body.cuisines;
    expect(cuisines).toBeInstanceOf(Array);
    expect(response.body).toEqual(expect.any(Object));
    expect(cuisines.length).toBeGreaterThan(0);
    expect(cuisines.length).toBeLessThanOrEqual(9);
  });

  it('should return sorted list of cuisines', async () => {
    const response = await request(app).get('/pub/cuisines').query({ price: 'min' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('currentPage');
    expect(response.body).toHaveProperty('cuisines');
    expect(response.body).toHaveProperty('totalPage');

    const cuisines = response.body.cuisines;
    expect(cuisines).toBeInstanceOf(Array);
    expect(response.body).toEqual(expect.any(Object));
    expect(cuisines.length).toBeGreaterThan(0);
  });

  it('should return cuisines list of a category', async () => {
    const response = await request(app).get('/pub/cuisines').query({ category: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('currentPage');
    expect(response.body).toHaveProperty('cuisines');
    expect(response.body).toHaveProperty('totalPage');

    const cuisines = response.body.cuisines;
    expect(cuisines).toBeInstanceOf(Array);
    expect(response.body).toEqual(expect.any(Object));
    expect(cuisines.length).toBeGreaterThan(0);
  });
});

describe('GET /pub/cuisines/:id', () => {
  it('should return a cuisine by id', async () => {
    const response = await request(app).get('/pub/cuisines/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('imgUrl');
    expect(response.body).toHaveProperty('authorId');
    expect(response.body).toHaveProperty('categoryId');
  });

  it('should return a 404 error if the cuisine is not found', async () => {
    const response = await request(app).get('/pub/cuisines/999999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Cuisine not found');
  });
});

describe('BOOKMARK /pub/bookmark', () => {
  it('should return a customer bookmark list by access token', async () => {
    const response = await request(app).get('/pub/bookmark').set('access_token', access_token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('should success add bookmark by id', async () => {
    const response = await request(app).post('/pub/bookmark/1').set('access_token', access_token);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
  });

  it('should return a 401 error of invalid token', async () => {
    const response = await request(app).get('/pub/bookmark').set('access_token', wrong_token);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid Token');
  });

  it('should return a 401 error of invalid token if customer is not logged in', async () => {
    const response = await request(app).get('/pub/bookmark');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid Token');
  });

  it('should return a 404 error of cuisine not found', async () => {
    const response = await request(app).post('/pub/bookmark/99999').set('access_token', access_token);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Cuisine not found');
  });
});
