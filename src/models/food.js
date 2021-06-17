'use strict';

const foodModel = (sequelize, DataTypes) => {
  return sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    calories: {
      type: DataTypes.INTEGER,
      required: false
    }
  });
}

module.exports = foodModel;
