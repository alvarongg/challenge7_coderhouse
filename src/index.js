const express = require("express");
const path = require('path');
const moment = require('moment'); 
const {productRouter,getAllProd,saveProd }= require("./productRouter.js");
const { engine } = require("express-handlebars");
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const MensajesSqlite = require("./mensajes.js");
let options_path = path.join(__dirname,'..', 'DB','options.js');
const { optionsSqlite } = require(options_path);
const app = express();

const tabla_chat = 'mensajes';

let chat = new MensajesSqlite(optionsSqlite,tabla_chat);


let views_path = path.join(__dirname, '..', 'views');
app.use(express.static('public'));

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
  })
);

app.set('views', views_path);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", productRouter);

app.get('/', (req, res) => {
    res.render('main');
  });

// app.listen(8080, () => {
//   console.log("Estoy escuchando 8080 --engine handlebars");
// });

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

socketServer.on('connection', async (socket) => {

  //emite los mensajes y productos actuales
  socket.emit('messages', await chat.getAll());
  socket.emit('products', await getAllProd());

  socket.on('new_product', async  (producto) => {
    //inserta el producto que le llego 
    console.log(`saved prod: ${producto}`);
     saveProd(producto);
    socketServer.sockets.emit('products', await getAllProd());
  
  });

  socket.on('new_message',async (mensaje) => {
    const fechaActual = moment();
    mensaje.date = fechaActual.format("DD/MM/YYYY HH:MM:SS");
    await  chat.save(mensaje);
    socketServer.sockets.emit('messages', await chat.getAll());
 
  });
  
});

httpServer.listen(8080, () => {
  console.log('Estoy escuchando en el puerto 8080');
});