'use strict';

const clothesModel = (sequelize, DataTypes) => {
    return sequelize.define('Clothes', {
    name: {
        type: DataTypes.STRING,
        required: true,
    },
    type: {
        type: DataTypes.STRING,
        required: true
    }
    });
}

module.exports = clothesModel;