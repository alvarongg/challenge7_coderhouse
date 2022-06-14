const Knex = require('knex').default;
const path = require('path');
let options_path = path.join(__dirname, '..' ,'options.js');
console.log(options_path);
const { optionsMySQL } = require('../options.js');
console.log(optionsMySQL);
const knex = Knex({
  client: 'mysql2',
  connection: optionsMySQL
});

const ejecutar = async () => {
  await knex.schema.dropTableIfExists("productos");
  await knex.schema.createTable("productos", (table) => {
    table.increments("id").primary().notNullable();
    table.string("title", 80).notNullable();
    table.float("price").notNullable();
    table.string("thumbnail", 250).notNullable();
   

  });
  await knex("productos").insert([
    {title: "Producto precargado 1", price: 9.99, thumbnail: `http://example1.com`},
    {title: "Producto precargado 2", price: 8.88, thumbnail: `http://example2.com`},
    {title: "Producto precargado 3", price: 7.77, thumbnail: `http://example3.com`}
  ]);

  console.log(await knex.from("productos").select("*"));

  await knex.destroy()
}

ejecutar();