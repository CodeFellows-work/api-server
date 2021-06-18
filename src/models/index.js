'use strict';

require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';
const NODE_ENV = process.env.NODE_ENV;
const { Sequelize, DataTypes } = require('sequelize');

const Collection = require('./collection.js');
const foodSchema = require('./food.js');
const clothesSchema = require('./clothes.js');



let sequelize = new Sequelize(DATABASE_URL, NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {});

const foodModel = foodSchema(sequelize, DataTypes);
const clothesModel = clothesSchema(sequelize, DataTypes); 

const foodCollection = new Collection('Food', foodModel); 
const clothesCollection = new Collection('Clothes', clothesModel); 

foodCollection.createAssociation('hasMany', clothesCollection.model, {foreignKey: 'foodId', sourceKey: 'id'});
clothesCollection.createAssociation('belongsTo', foodCollection.model, {foreignKey: 'clothesId', targetKey: 'id'});

module.exports = {
  db: sequelize, 
  Foods: foodCollection,
  Clothes: clothesCollection,

}