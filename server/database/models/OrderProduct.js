const { sequelize } = require("../server");
const { DataTypes } = require('sequelize');

const OrderProduct = sequelize.define('OrderProduct', {
})

module.exports = OrderProduct;