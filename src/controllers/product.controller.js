const Product = require("../models/product");
const bcrypt = require("bcryptjs");

exports.createProduct = async (req, res) => {
    try {
        const { confirmPassword, ...data } = req.body;
        data.password = await bcrypt.hash(data.password, 10); 
        const product = await Product.create(data);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { confirmPassword, password, ...data } = req.body;
        if (password) {
            data.password = await bcrypt.hash(password, 10);
        }
        const updated = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
