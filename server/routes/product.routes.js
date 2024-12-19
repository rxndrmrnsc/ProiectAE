const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../database/models/User");
const Product = require("../database/models/Product");

const router = express.Router();

router.post('/', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }

    if (user.role != "admin") {
        return res.status(401).json({success: false, message: 'User not allowed to perform transaction', data: {}});
    }

    const product = req.body
    await Product.create(product)

    res.status(201).json({ success: true, message: "Product created", data: product });
})

router.get('/', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }

    if (user.role != "admin") {
        return res.status(401).json({success: false, message: 'User not allowed to perform transaction', data: {}});
    }

    const products = await Product.findAll();

    res.status(200).json(products);
})

router.put('/:pid', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }

    if (user.role != "admin") {
        return res.status(401).json({success: false, message: 'User not allowed to perform transaction', data: {}});
    }

    const product = await Product.findOne({where: { id: req.params.pid }})

    if (!product){
        return res.status(404).json({success: false, message: 'Product not found', data: {}});
    }

    await product.update(req.body)

    res.status(200).json({ success: true, message: "Product updated", data: product});
})

router.delete('/:pid', async (req, res) => {
    const user = await User.findByPk(req.body.userId)

    if(!user) {
        return res.status(404).json({success: false, message: 'User not found', data: {}});
    }
    if (user.role != "admin") {
        return res.status(401).json({success: false, message: 'User not allowed to perform transaction', data: {}});
    }

    const product = await Product.findOne({where: { id: req.params.pid }})

    if (!product){
        return res.status(404).json({success: false, message: 'Product not found', data: {}});
    }

    await product.destroy()    

    res.status(200).json({ success: true, message: "Product deleted"});
})

module.exports = router;