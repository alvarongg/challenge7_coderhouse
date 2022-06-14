# challenge7_coderhouse

Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará. Luego, modificar el desafío entregable de la clase 11”Chat con Websocket”, y:
* cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
* cambiar la persistencia de los productos de memoria a base de datos MariaDB.

Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en sqlite3 y tabla productos en mariaDb).

* Notas: Definir una carpeta DB para almacenar la base datos SQLite3 llamada ecommerce

## Nota 1: 

Utilice docker para ejecutar la base de datos MySQL con el objetivo de hacer lo mas portable posible el proyecto.

Para instalar docker seguir estos manuales:

* [Instalar en Ubuntu](https://acloudguru.com/hands-on-labs/installing-and-configuring-the-docker-engine?utm_campaign=11244863417&utm_source=google&utm_medium=cpc&utm_content=469352928666&utm_term=_&adgroupid=115625160932&gclid=CjwKCAjw46CVBhB1EiwAgy6M4ikP_hcA42mlznnGgVem1iP6uS0lUM9py3NXVlILLA5IW9GyOHT7GBoCQM8QAvD_BwE)
* [Instalar en Windows](https://docs.docker.com/desktop/windows/install/)


Para limpiar las imagenes de docker se [debe seguir este manual](https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes-es)

## Nota 2:
Si no se va a utilizar Docker para ejecutar la base de datos MySQL debemos ingresar al archivo ./DB/options.js y modificarlo.
A continuacion se muestra la configuracion de conexion actual a la base de datos MySQL.

```javascript

const optionsMySQL = {
  host: "localhost",
  user: "root",
  port: "3307",
  password: "root",
  database: "test_db"
};

```
## Despliegue 📦

* Instalacion de depedencias
```bash
npm i 
```
* Inicializacion de base MySQL (se expone el puerto 3307) con docker :whale:
```bash
npm run up-dkr-mysql 
```

* Inicializacion de todas las bases SQLite3 y MySQL
```bash
npm run init-dbs
```

* Ejecucion del proyecto handlebars (se ejecuta en puerto 8080) :godmode:
```bash
npm run start
```

* Destruccion del contenedor docker_mysql :goberserk:
```bash
npm run kill-dkr-mysql
```

## Web Endpoits 

* [Web Principal](http://localhost8080/)
## Construido con 🛠️

* [Express🛰️](https://expressjs.com/es/4x/api.html)
* [Handlebars :writing_hand:](https://handlebarsjs.com/)
* [Socket.io :electric_plug:](https://socket.io/)
* [Bootstrap :star_struck:](https://getbootstrap.com/)
* [Moment.js :stopwatch:](https://momentjs.com)
* [Knex.js :floppy_disk:](http://knexjs.org/#Builder)
* [Docker :whale: ](https://www.docker.com/)


