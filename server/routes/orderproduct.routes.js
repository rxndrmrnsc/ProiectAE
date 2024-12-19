const express = require('express');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const User = require("../database/models/User");
const Product = require("../database/models/Product");
const Order = require("../database/models/Order");
const OrderProduct = require("../database/models/OrderProduct");


Product.belongsToMany(Order, { through: "OrderProduct" });
Order.belongsToMany(Product, { through: "OrderProduct" });

const router = express.Router();

router.post('/:oid/products/:pid', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }

    const orders = await user.getOrders({where: { id: req.params.oid }})
    const order = orders[0]

    if (!order){
        return res.status(404).json({success: false, message: 'Order not found', data: {}});
    }

    const product = await Product.findOne({where: { id: req.params.pid }})

    if (!product){
        return res.status(404).json({success: false, message: 'Product not found', data: {}});
    }

    await order.addProduct(product);

    res.status(201).json({ success: true, message: "Product created", data: product });
})

router.get('/:oid/products/', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }

    const orders = await user.getOrders({where: { id: req.params.oid }})
    const order = orders[0]

    if (!order){
        return res.status(404).json({success: false, message: 'Order not found', data: {}});
    }

    const products = await order.getProducts()

    res.status(200).json(products);
})

router.delete('/:oid/products/:pid', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }

    const orders = await user.getOrders({where: { id: req.params.oid }})
    const order = orders[0]

    if (!order){
        return res.status(404).json({success: false, message: 'Order not found', data: {}});
    }

    const product = await Product.findOne({where: { id: req.params.pid }})

    if (!product){
        return res.status(404).json({success: false, message: 'Product not found', data: {}});
    }

    await order.removeProduct(product);
    res.status(200).json({ success: true, message: "Product removed from order"});
})

module.exports = router;