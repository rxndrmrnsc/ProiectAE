const { sequelize } = require("../server");
const { DataTypes } = require('sequelize');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.FLOAT,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['in stock', 'out of stock'],
        defaultValue: 'in stock'
    },
})

module.exports = Product;