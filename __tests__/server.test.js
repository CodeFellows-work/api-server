'use strict';

const server = require('../src/server.js');
const data = require('../src/models/index.js');
const supertest = require('supertest');

const request = supertest(server.app);

beforeAll(async () => {
  await data.db.sync();
});
afterAll(async () => {
  await data.db.drop();
});

describe('testing the server', () => {

  test('testing a 200 for GET `/food`', async () => {
    const response = await request.get('/food');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test('testing a 200 for POST `/food`', async () => {
    const response = await request.post('/food').send({
      name: 'test',
      calories: 100
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });

  test('testing a 200 for GET `/food/:foodId`', async () => {
    const response = await request.get(`/food/1`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });

  test('testing a 200 for PUT `/food/:foodId`', async () => {
    const response = await request.put('/food/1').send({
      name: 'new test',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('new test');
  });

  test('testing a 200 for DELETE `/food/:foodId`', async () => {
    const response = await request.delete('/food/1');
    expect(response.status).toEqual(204);
  });

  //////// Testing Clothes ////////

  test('testing a 200 for GET `/clothes`', async () => {
    const response = await request.get('/clothes');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test('testing a 200 for POST `/clothes`', async () => {
    const response = await request.post('/clothes').send({
      name: 'test',
      type: 'test'
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });

  test('testing a 200 for GET `/clothes/:clothesId`', async () => {
    const response = await request.get(`/clothes/1`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
  });

  test('testing a 200 for PUT `/clothes/:clothesId`', async () => {
    const response = await request.put('/clothes/1').send({
      name: 'new test',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('new test');
  });

  test('testing a 200 for DELETE `/car/:clothesId`', async () => {
    const response = await request.delete('/clothes/1');
    expect(response.status).toEqual(204);
  });

}); 