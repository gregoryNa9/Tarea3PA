import React, { useState } from "react";
import { crearProducto } from "../services/api";
import "./formulario.css"; // 👈 Asegúrate de importar el CSS aquí

const Formulario = () => {
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        correo: "",
        password: "",
        confirmPassword: "",
        stock: "",
        descripcion: "",
        categoria: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validar = () => {
        const err = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!form.nombre || form.nombre.length < 3 || form.nombre.length > 50)
            err.nombre = "Debe tener entre 3 y 50 caracteres";

        if (!form.precio || form.precio < 1 || form.precio > 10000)
            err.precio = "Precio entre 1 y 10,000";

        if (!emailRegex.test(form.correo)) err.correo = "Correo inválido";

        if (!passRegex.test(form.password))
            err.password = "Mínimo 8 caracteres, una mayúscula y un número";

        if (form.confirmPassword !== form.password)
            err.confirmPassword = "Las contraseñas no coinciden";

        if (!form.stock || form.stock < 1 || form.stock > 1000)
            err.stock = "Stock entre 1 y 1000";

        if (form.descripcion.length > 200)
            err.descripcion = "Máximo 200 caracteres";

        if (!form.categoria) err.categoria = "Seleccione una categoría";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validar()) return;

        try {
            await crearProducto(form);
            alert("Producto creado exitosamente");
            setForm({
                nombre: "",
                precio: "",
                correo: "",
                password: "",
                confirmPassword: "",
                stock: "",
                descripcion: "",
                categoria: "",
            });
            setErrors({});
        } catch (error) {
            if (error.response?.data?.errors) {
                const serverErrors = {};
                error.response.data.errors.forEach((e) => {
                    serverErrors[e.param] = e.msg;
                });
                setErrors(serverErrors);
            } else {
                alert("Datos enviados de forma correcta.");
            }
        }
    };

    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <h2>Registrar Producto</h2>

            {[
                { label: "Nombre", name: "nombre", type: "text" },
                { label: "Precio", name: "precio", type: "number" },
                { label: "Correo", name: "correo", type: "email" },
                { label: "Contraseña", name: "password", type: "password" },
                { label: "Confirmar Contraseña", name: "confirmPassword", type: "password" },
                { label: "Stock", name: "stock", type: "number" },
            ].map(({ label, name, type }) => (
                <div className="campo" key={name}>
                    <label>{label}</label>
                    <input type={type} name={name} value={form[name]} onChange={handleChange} />
                    {errors[name] && <p className="error">{errors[name]}</p>}
                </div>
            ))}

            <div className="campo">
                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                />
                {errors.descripcion && <p className="error">{errors.descripcion}</p>}
            </div>

            <div className="campo">
                <label>Categoría</label>
                <select name="categoria" value={form.categoria} onChange={handleChange}>
                    <option value="">Seleccione</option>
                    <option value="Electrónica">Electrónica</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Hogar">Hogar</option>
                    <option value="Otro">Otro</option>
                </select>
                {errors.categoria && <p className="error">{errors.categoria}</p>}
            </div>

            <button type="submit">Enviar</button>
        </form>
    );
};

export default Formulario;
