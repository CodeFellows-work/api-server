'use strict';

const express = require('express');

const data = require('../models/index.js');
const router = express.Router();

router.get('/food', getAll);
router.get('/food/:foodId', getOne);
router.post('/food', create);
router.put('/food/:foodId', update);
router.delete('/food/:foodId', remove);

async function getAll(req, res) {
const foodItems = await data.food.findAll();
res.status(200).send(foodItems);
}

async function getOne(req, res) {
const foodId = req.params.foodId;
const foodItem = await data.food.findOne({ where: { id: foodId } });
res.status(200).send(foodItem);
}

async function create(req, res) {
const foodObject = req.body;
const foodData = await data.food.create(foodObject);
res.status(200).send(foodData);
}

async function update(req, res) {
const foodId = req.params.foodId;
const foodObject = req.body;
const foodData = await data.food.findOne({ where: { id: foodId } });
await foodData.update(foodObject);
res.status(200).send(foodData);
}

async function remove(req, res) {
const foodId = req.params.foodId;
await data.food.destroy({ where: { id: foodId } });
res.status(204).send('Success');
}

module.exports = router;