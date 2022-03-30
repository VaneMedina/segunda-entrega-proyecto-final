const express = require('express')
const path = require('path');
require('dotenv').config()


// Destructuracion del objeto

const adminMiddleware = require('./middlewares/admin')
const productsRouter = require("./routes/products")
const cartRouter = require('./routes/cart');

const app = express();
const PORT = process.env.PORT | 8080

/*******middlewares del body**********/
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use("/static", express.static(path.join(__dirname, 'public')))

app.use("/api/productos", adminMiddleware, productsRouter);
app.use("/api/carrito", adminMiddleware, cartRouter);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))