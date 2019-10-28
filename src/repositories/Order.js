import { Component } from 'react';
import firebase from '../config/firebase';

const collection = '/orders';

const db = firebase.db.collection(collection)

class OrderRepo extends Component {

  //Se utiliza en voews/ModulOrders/Create/createOrderFinal.js 
  //En:'handleNexAndSaveOrder'
  async addOrder(order){
    try {
      let newOrder = Object.assign({},order);
      db.doc()
      .set(newOrder)
      .then(()=>{
        console.log("Pedido registrado en la base de datos.");
        return true;
      })
      .catch(error => {
        console.error("Error al guardar: ",error);
      });      
    } catch (error) {
      console.log("Error al agregar PEDIDO a DATABASE: ", error);
    }
  }

}
export default new OrderRepo();