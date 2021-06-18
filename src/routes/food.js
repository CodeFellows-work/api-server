'use strict';

const express = require('express');

const data = require('../models/index.js');
const router = express.Router();
const {Foods} = require('../models/index.js');

router.get('/food', async (req, res) => {
    let foodRows = await Foods.read()
    res.status(200).send(foodRows)
});
router.get('/food/:foodId', async (req, res) => {
    let foodRows = await Foods.read(req.params.foodId)
    res.status(200).send(foodRows)
});
router.post('/food', async (req, res) => {
    let foodRows = await Foods.create(req.body)
    res.status(200).send(foodRows)
});
router.put('/food/:foodId', async (req, res) => {
    let foodRows = await Foods.update(req.params.foodId, req.body)
    res.status(200).send(foodRows)
});
router.delete('/food/:foodId', async (req, res) => {
    let foodRows = await Foods.delete(req.params.foodId)
    res.status(204).send(foodRows)
});

// async function getAll(req, res) {
// const foodItems = await data.food.findAll();
// res.status(200).send(foodItems);
// }

// async function getOne(req, res) {
// const foodId = req.params.foodId;
// const foodItem = await data.food.findOne({ where: { id: foodId } });
// res.status(200).send(foodItem);
// }

// async function create(req, res) {
// const foodObject = req.body;
// const foodData = await data.food.create(foodObject);
// res.status(200).send(foodData);
// }

// async function update(req, res) {
// const foodId = req.params.foodId;
// const foodObject = req.body;
// const foodData = await data.food.findOne({ where: { id: foodId } });
// await foodData.update(foodObject);
// res.status(200).send(foodData);
// }

// async function remove(req, res) {
// const foodId = req.params.foodId;
// await data.food.destroy({ where: { id: foodId } });
// res.status(204).send('Success');
// }

module.exports = router;