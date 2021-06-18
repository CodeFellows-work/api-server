'use strict';

const clothesModel = (sequelize, DataTypes) => {
    return sequelize.define('Clothes', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
    });
}

module.exports = clothesModel;