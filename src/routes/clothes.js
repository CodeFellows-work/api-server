'use strict';

const express = require('express');

const data = require('../models/index.js');
const router = express.Router();
const {Clothes} = require('../models/index.js'); 

router.get('/clothes', async (req, res) => {
    let clothesRows = await Clothes.read()
    res.status(200).send(clothesRows)
});
router.get('/clothes/:clothesId', async (req, res) => {
    let clothesRows = await Clothes.read(req.params.clothesId)
    res.status(200).send(clothesRows)
});
router.post('/clothes', async (req, res) => {
    let clothesRows = await Clothes.create(req.body)
    res.status(200).send(clothesRows)
});
router.put('/clothes/:clothesId', async (req, res) => {
    let clothesRows = await Clothes.update(req.params.clothesId, req.body)
    res.status(200).send(clothesRows)
});
router.delete('/clothes/:clothesId', async (req, res) => {
    let clothesRows = await Clothes.delete(req.params.clothesId)
    res.status(204).send(clothesRows)
});

// async function getAll(req, res) {
//   const clothesItems = await data.clothes.findAll();
//   res.status(200).send(clothesItems);
// }

// async function getOne(req, res) {
//   const clothesId = req.params.clothesId;
//   const clothesItem = await data.clothes.findOne({ where: { id: clothesId } });
//   res.status(200).send(clothesItem);
// }

// async function create(req, res) {
//   const clothesObject = req.body;
//   const clothesData = await data.clothes.create(clothesObject);
//   res.status(200).send(clothesData);
// }

// async function update(req, res) {
//   const clothesId = req.params.clothesId;
//   const clothesObject = req.body;
//   const clothesData = await data.clothes.findOne({ where: { id: clothesId } });
//   await clothesData.update(clothesObject);
//   res.status(200).send(clothesData);
// }

// async function remove(req, res) {
//   const clothesId = req.params.clothesId;
//   await data.clothes.destroy({ where: { id: clothesId } });
//   res.status(204).send('Success');
// }

module.exports = router;