// 'use strict';

// const { db, Foods, Clothes } = require('../src/models/index.js');

// beforeAll(async () => {
//   await db.sync();
// });
// afterAll(async () => {
//   await db.drop();
// });

// describe('Foods and Clothes Collections', () => {

//   let testFood = {
//     name: 'test Food',
//   }
//   let testClothe = {
//     name: 'test Clothe',
//   }
//   let Foods = null;
//   let Food = null;
//   let Clothes = null;
//   let Clothe = null;

//   it('should be able to create a Food and an Clothe', async () => {
//     Food = await Foods.create(testFood);
//     testClothe['FoodId'] = Food.id;
//     Clothe = await Clothes.create(testClothe);

//     expect(Food.name).toEqual(testFood.name);
//     expect(Clothe.name).toEqual(testClothe.name);
//     expect(Clothe.FoodId).toEqual(Food.id);
//   });

//   it ('shoud be able to fetch Foods and include Clothes', async () => {
//     Foods = await Foods.read(null, { include: 'Clothes' });

//     expect(Foods).toBeTruthy();
//     expect(Foods[0].name).toEqual(testFood.name);
//     expect(Foods[0].Clothes).toBeTruthy();
//   });

//   it('should be able to fetch Clothes with an associated Food', async () => {
//     Clothes = await Clothes.read(null, { include: 'Foods'});

//     expect(Clothes).toBeTruthy();
//     expect(Clothes[0].name).toEqual(testClothe.name);
//     expect(Clothes[0].Food).toBeTruthy();
//   });

//   it('should be able to update a Food', async () => {
//     Food = await Foods.update(Food.id, {name: 'test Food 2'});

//     expect(Food).toBeTruthy();
//     expect(Food.name).toEqual('test Food 2');
//   });

//   it ('should be able to update an Clothe', async () => {
//     Clothe = await Clothes.update(Clothe.id, {name: 'test Clothe 2'});

//     expect(Clothe).toBeTruthy();
//     expect(Clothe.name).toEqual('test Clothe 2');
//   });

//   it('should be able to delete a Clothe', async () => {
//     let ClotheId = await Clothes.delete(Clothe.id);

//     expect(ClotheId).toEqual(Clothe.id);

//     Clothes = await Clothes.read();

//     expect(Clothes.length).not.toBeTruthy();
//   });

//   it('shuold be able to delete a Food', async () => {
//     let FoodId = await Foods.delete(Food.id);

//     expect(FoodId).toEqual(Food.id);

//     Foods = await Foods.read();
    
//     expect(Foods.length).not.toBeTruthy();
//   })
// });
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
    expect(Array.isArray(response.body)).toEqual(true);
  });

  test('testing a 200 for POST `/food`', async () => {
    const response = await request.post('/food').send({
      name: 'test',
      calories: 100
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('test');
    expect(response.body.calories).toEqual(100)
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

  test.skip('testing a 204 for DELETE `/food/:foodId`', async () => {
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
    expect(response.body.type).toEqual('test'); 
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

  test.skip('testing a 204 for DELETE `/clothes/:clothesId`', async () => {
    const response = await request.delete('/clothes/1');
    expect(response.status).toEqual(204);
  });

}); 