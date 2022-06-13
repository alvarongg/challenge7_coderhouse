const Knex = require('knex').default;



module.exports = class Contenedor {
  constructor() {
    this.container = [];
  }

  /**
   * Guarda agrega un objeto array
   * @param {string} obj
   * @returns Id del objeto guardado
   */
  save(obj) {
    try {
      let longitud = this.container.length;
      let index = 0;
      //Valido que el array tenga objetos
      if (longitud == 0) {
        index = 1;
      } else {
        //sumar uno al id del ultimo elemento y agregarlo al id del objeto
        index = this.container[longitud - 1].id + 1;
      }

      obj.id = index;
      this.container.push(obj);

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
      let array = this.container.filter((x) => {
        return x.id == id;
      });

      if (array[0] == undefined) {
        return { error: "producto no encontrado" };
      } else {
        return array;
      }
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
      let objIndex = this.container.findIndex(
        (product) => product.id == obj.id
      );

      if (objIndex == -1) {
        return { error: "producto no encontrado" };
      } else {
        this.container[objIndex].title = obj.title;
        this.container[objIndex].price = obj.price;
        this.container[objIndex].thumbnail = obj.thumbnail;

        return { estado: "Producto actualizado" };
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @returns Devuelve todos los objetos del array
   */
  getAll() {
    try {
      
      return this.container;
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
      let obj = this.getById(id);
      console.log(obj.error != "");

      if (obj.error == "") {
        return obj;
      } else {
        this.container = this.container.filter((x) => {
          return x.id != id;
        });
        return { idDeleted: id };
      }
    } catch (error) {
      throw error;
    }
  }
};



