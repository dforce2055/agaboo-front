import { Component } from 'react';
import firebase from '../config/firebase';
import ProductController from '../controllers/Product';

const collection = '/orders';

const db = firebase.db.collection(collection)

class OrderRepo extends Component {

  //Se utiliza en voews/ModulOrders/Create/createOrderFinal.js 
  //En:'handleNexAndSaveOrder'
  async addOrder(order){    
    if (!order) throw new Error(`Error: No llego un pedido completo`);
    try {
      let newOrder = Object.assign({},order);
      db.doc()
      .set(newOrder)
      .then(()=>{
        return true;
      })  
    } catch (error) {
      console.log("Error al agregar PEDIDO a DATABASE: ", error);
    }
  }

  //Se utiliza en views/ModulOrders/Ready/ButtonOption.js
  deleteOrder(id_pedido){
    try {
      db.doc(id_pedido)
      .update({eliminado:true})
      .then(()=>{ return true })
    } catch (error) {
      console.log("Error en la base de datos.",error);
    }
  }

  //Devuelvo todos los pedidos
  async getOrders(){
    try {
      let list = {};
      await db.where("eliminado","==",false).get()
      .then(result =>{
        list = result.docs.map(doc => doc.data())
   })
      return list;
    } catch (error) {
      console.error("Error en base de datos: ",error);
    }
  }


  //Devuelvo todos los pedidos
  async getOrdersNow() {
    try {
      let fechaHoy = new Date();
      let fechaFormat = fechaHoy.getFullYear() +'-'
                        +(fechaHoy.getMonth()+1) +'-' //La función devuelve mes actual menos uno
                        +(fechaHoy.getDate());
      
      let list = {};
      await db
        .where("eliminado", "==", false)
        .where("fecha_entrega", "==", fechaFormat)
        .get()
        .then(result => {
          list = result.docs.map(doc => doc.data())
        })
      return list;
    } catch (error) {
      console.error("Error en base de datos: ", error);
    }
  }


  //Metodo que verifica si tiene la cantidad disponible entre esas fechas
  async authAlqProduct(fec_ini,fec_fin){
    try {
      let ini = fec_ini;
      let fin = fec_fin;
      let id = ''; //Poner el id del pedido.
      if (ini <= fin) {
        db.get(id)
          .then()
      }      
    } catch (error) {
      console.log("Error en base de datos: ",error);
    }
  }

  //Metodo para agregar los id's de los productos.
  //Se utiliza en ModulsOrders/addIdOrder/ProduictListOrder
  async saveIdsOrder(id_order,lista_productos_con_ids){
    if (!id_order) throw new Error(`Error: No llego el id del pedido correctamente.`);
    try {
      let list_products_ids = { lista_productos_con_ids };
       
      db.doc(id_order)
        .update(list_products_ids);
    } catch (error) {
      console.log("Error en base de datos: ",error);
    }
  }

  //Verifica que los productos agregados al pedido existan
  async verifyProductExistence(id_producto){
    try { 
      return ProductController.getExistsProduct(id_producto.toString())

    } catch (error) {
      console.error("Error en la database: ",error);
    }

  }

}
export default new OrderRepo();