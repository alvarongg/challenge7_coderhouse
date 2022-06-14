const Knex = require('knex').default;
const moment = require('moment'); 

const options = {
  filename: '../ecommerce.sqlite'
};

const knex = Knex({
  client: 'sqlite3',
  connection: options
});

const ejecutar = async () => {


  await knex.schema.dropTableIfExists("mensajes");

  await knex.schema.createTable("mensajes", (table) => {
    table.increments("id").primary().notNullable();
    table.string("author", 15).notNullable();
    table.string("text", 250).notNullable();
    table.dateTime("date").notNullable();

  });

  const fechaActual = moment();
  const fechaformateada = fechaActual.format("DD/MM/YYYY HH:MM:SS");

  await knex("mensajes").insert([
    {author: "autor1", text: "mensaje1", date: fechaformateada},
    {author: "autor2", text: "mensaje2", date: fechaformateada},
    {author: "autor3", text: "mensaje3", date: fechaformateada}
  ]);

  console.log(await knex.from("mensajes").select("*"));

  await knex.destroy()
}

ejecutar();