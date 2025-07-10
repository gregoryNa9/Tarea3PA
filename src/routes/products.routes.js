const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const productController = require("../controllers/product.controller");

// Validaciones para POST y PUT
const validateProduct = [
    body("nombre").notEmpty().isLength({ min: 3, max: 50 }).withMessage("Nombre inválido"),
    body("precio").isFloat({ min: 1, max: 10000 }).withMessage("Precio fuera de rango"),
    body("correo").isEmail().withMessage("Correo inválido"),
    body("password").matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/).withMessage("Contraseña insegura"),
    body("confirmPassword").custom((value, { req }) => value === req.body.password).withMessage("Las contraseñas no coinciden"),
    body("stock").isInt({ min: 1, max: 1000 }).withMessage("Stock inválido"),
    body("descripcion").isLength({ max: 200 }).withMessage("Descripción muy larga"),
    body("categoria").notEmpty().withMessage("Categoría requerida")
];

// Middleware para manejar errores
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

// Rutas
router.post("/", validateProduct, handleValidation, productController.createProduct);
router.put("/:id", validateProduct, handleValidation, productController.updateProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
