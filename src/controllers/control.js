/*exports.createProduct = async (req, res) => {
    try {
        const { confirmPassword, ...data } = req.body;
        data.password = await bcrypt.hash(data.password, 10); 
        const product = await Product.create(data);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/