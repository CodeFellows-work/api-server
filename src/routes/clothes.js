'use strict';

const express = require('express');

const data = require('../models/index.js');
const router = express.Router();

router.get('/clothes', getAll);
router.get('/clothes/:clothesId', getOne);
router.post('/clothes', create);
router.put('/clothes/:clothesId', update);
router.delete('/clothes/:clothesId', remove);

async function getAll(req, res) {
  const clothesItems = await data.clothes.findAll();
  res.status(200).send(clothesItems);
}

async function getOne(req, res) {
  const clothesId = req.params.clothesId;
  const clothesItem = await data.clothes.findOne({ where: { id: clothesId } });
  res.status(200).send(clothesItem);
}

async function create(req, res) {
  const clothesObject = req.body;
  const clothesData = await data.clothes.create(clothesObject);
  res.status(200).send(clothesData);
}

async function update(req, res) {
  const clothesId = req.params.clothesId;
  const clothesObject = req.body;
  const clothesData = await data.clothes.findOne({ where: { id: clothesId } });
  await clothesData.update(clothesObject);
  res.status(200).send(clothesData);
}

async function remove(req, res) {
  const clothesId = req.params.clothesId;
  await data.clothes.destroy({ where: { id: clothesId } });
  res.status(204).send('Success');
}

module.exports = router;