const express = require("express");
const productRouter = express.Router();
console.log("Router Productos cargados");


const options = {
  client: 'sqlite3',
  connection: {
    filename: './ecommerce/products.sqlite'
  }
}

let Contenedor = require("./contenedor.js");
let productos = new Contenedor();

productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: true }));

function getAllProd(){
  return productos.getAll();
}

function saveProd(obj){
  productos.save(obj);
}




//devuelve todos los productos
productRouter.get("/", (req, res) => {
  try {
    res.send(productos.getAll());
  } catch (error) {
    throw new Error("Hubo un error al listar todos los productos");
  }
});

//devuelve solo el producto que necesito con el id pasado por get
productRouter.get("/:id", (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let obj = productos.getById(id);

    res.send(obj);
  } catch (error) {
    throw new Error("Hubo un error al listar el producto seleccionado");
  }
});

//recibe y agrega el producto pasado por post
productRouter.post("/", (req, res) => {
  try {
    let obj = {};

    obj.title = req.body.title;
    obj.price = req.body.price;
    obj.thumbnail = req.body.thumbnail;
    let id = productos.save(obj);

    res.send({ id });

    console.log(`Nuevo producto id: ${id} `);
  } catch (error) {
    throw new Error("Hubo un error al agregar el producto");
  }
});

//recibe y actualiza el producto segun si id existe
productRouter.put("/:id", (req, res) => {
  try {
    let obj = {};
    obj.id = parseInt(req.params.id);
    obj.title = req.body.title;
    obj.price = req.body.price;
    obj.thumbnail = req.body.thumbnail;

    let id = productos.updateById(obj);

    res.send(id);
    console.log(`Modificado producto id: ${id} `);
  } catch (error) {
    throw new Error("Hubo un error al actualizar el producto");
  }
});

//borra el producto con el id seleccionado
productRouter.delete("/:id", (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let obj = productos.deleteById(id);

    res.send(obj);
  } catch (error) {
    throw new Error(`Hubo un error al borrar el producto`);
  }
});

module.exports = {productRouter,getAllProd,saveProd};
