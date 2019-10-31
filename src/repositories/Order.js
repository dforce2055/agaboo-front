import { Component } from 'react';
import firebase from '../config/firebase';

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
        console.log("Pedido registrado en la base de datos.");
        return true;
      })  
    } catch (error) {
      console.log("Error al agregar PEDIDO a DATABASE: ", error);
    }
  }

  async getOrders(){
    try {
      let list = {};
      await db.get()
      .then(result =>{
        list = result.docs.map(doc => doc.data())
   })
      return list;
    } catch (error) {
      console.error("Error en base de datos: ",error);
      
    }
  }

  async authAlqProduct(fec_ini,fec_fin){
    try {
      let ini = fec_ini;
      let fin = fec_fin;
      let id = ''; //Poner el id del pedido.
      if (ini <= fin) { //Menor o igual, porque puede ser en el mismo dia
        db.get(id)
          .then()
      }      
    } catch (error) {
      console.log("Error en base de datos: ",error);
    }
  }

  async saveIdsOrder(obj){
    if (!obj) throw new Error(`Error: No llego el listado correctamente.`);
    try {
      db.doc()
    } catch (error) {
      console.log("Error en base de datos: ",error);
      
    }
  }

}
export default new OrderRepo();