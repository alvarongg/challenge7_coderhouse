const Knex = require('knex').default;

module.exports = class MensajesSqlite {
    constructor(options,tabla) {
      this.knex = Knex(options);
      this.tabla = tabla;
      
    }
  
    /**
     * Guarda agrega un nuevo mensaje a la tabla mensajes
     * @param {Objet} obj
     */
    async save(obj) {
      try {

        console.log(`insertando mensaje: ${obj}`);
        await this.knex(this.tabla).insert([
            {author: obj.author, text: obj.text, date: obj.date}]);
        } catch (error) {
        throw error;
      }
    }
  
    /**
     *
     * @returns Devuelve todos los objetos de la tabla mensajes
     */
   async getAll() {
      try {
      
        const array = await this.knex.from(this.tabla).select("*");
        return array;
      } catch (error) {
        throw error;
      }
    }
  
  };
  
  
  