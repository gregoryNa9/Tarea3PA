require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 

const productRoutes = require("./routes/products.routes");

const app = express();

app.use(cors()); 

app.use(express.json());
app.use("/products", require("./routes/products.routes"));


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`Servidor iniciado en puerto ${process.env.PORT}`)
    );
  })
  .catch((error) => console.error("Error de conexión a MongoDB:", error));

  