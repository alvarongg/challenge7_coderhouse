const Knex = require('knex').default;



module.exports = class Contenedor {
  constructor(options,tabla) {
    this.knex = Knex({
      client: 'mysql2',
      connection: options
    });
    this.tabla = tabla;
    
  }
  /**
   * Guarda agrega un objeto array
   * @param {string} obj
   * @returns Id del objeto guardado
   */
 async save(obj) {
    try {
        await this.knex(this.tabla).insert([
            {title: obj.title, price: obj.price, thumbnail: obj.thumbnail}]);
      obj.id = await this.knex(this.tabla).max("id");
      
      return obj.id;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Selecciona un objeto del archivo y lo devuleve
   * @param {int} id
   * @returns Devuelve el objeto si lo encuentra
   */
  getById(id) {
    try {
      // let array = this.container.filter((x) => {
      //   return x.id == id;
      // });

      // if (array[0] == undefined) {
      //   return { error: "producto no encontrado" };
      // } else {
      //   return array;
      // }

      return {error: 'Funcionalidad getById deprecada'};
    } catch (error) {
      throw error;
    }
  }

  /**
   * Selecciona un objeto del archivo y lo devuleve
   * @param {int} id
   * @returns Devuelve el objeto si lo encuentra
   */
  updateById(obj) {
    try {
      // let objIndex = this.container.findIndex(
      //   (product) => product.id == obj.id
      // );

      // if (objIndex == -1) {
      //   return { error: "producto no encontrado" };
      // } else {
      //   this.container[objIndex].title = obj.title;
      //   this.container[objIndex].price = obj.price;
      //   this.container[objIndex].thumbnail = obj.thumbnail;

      //   return { estado: "Producto actualizado" };
      // }
      return {error: 'Funcionalidad updateById deprecada'};
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @returns Devuelve todos los objetos del array
   */
   async getAll() {
    try {
      const array = await this.knex.from(this.tabla).select("*");
      return array;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Borra el objeto con le id seleccionado en el array
   * @param {int} id
   */
  deleteById(id) {
    try {
      // let obj = this.getById(id);
      // console.log(obj.error != "");

      // if (obj.error == "") {
      //   return obj;
      // } else {
      //   this.container = this.container.filter((x) => {
      //     return x.id != id;
      //   });
      //   return { idDeleted: id };
      // }
      return {error: 'Funcionalidad deleteById deprecada'};
    } catch (error) {
      throw error;
    }
  }
};



