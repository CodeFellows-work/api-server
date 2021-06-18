'use strict';

const foodModel = (sequelize, DataTypes) => {
  return sequelize.define('Food', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
}

module.exports = foodModel;
