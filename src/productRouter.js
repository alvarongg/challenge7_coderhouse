const express = require("express");
const path = require('path');
const productRouter = express.Router();
console.log("Router Productos cargados");

let options_path = path.join(__dirname,'..', 'DB','options.js');
const { optionsMySQL } = require(options_path);

// const optionsMySQL = {
//   host: "localhost",
//   user: "root",
//   port: "3307",
//   password: "root",
//   database: "test_db"
// };

let Contenedor = require("./contenedor.js");
let productos = new Contenedor(optionsMySQL,'productos');

productRouter.use(express.json());
productRouter.use(express.urlencoded({ extended: true }));

async function getAllProd(){
  const resultado = await productos.getAll();
  return resultado;
}

async function saveProd(obj){
  await productos.save(obj);
}

//devuelve todos los productos
productRouter.get("/", async (req, res) => {
  try {
    res.send(await productos.getAll());
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
productRouter.post("/", async (req, res) => {
  try {
    let obj = {};

    obj.title = req.body.title;
    obj.price = req.body.price;
    obj.thumbnail = req.body.thumbnail;
    let id = await productos.save(obj);

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
