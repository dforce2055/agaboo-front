import { Component } from 'react';
import firebase from '../config/firebase';
import OrderController from '../controllers/Order.js'
const collection = '/services';

const db = firebase.db.collection(collection)

class OrderRepo extends Component {
  //Devuelvo la coleccion de pedidos
  async getServices(){
    try {
      let list = [];
      await db.where("eliminado","==",false)
        .get()
        .then(result=>result.forEach(res =>{
             list.push(res.data())
        }))

      return list;
    } catch (error) {
      console.error("Error en repositorio de servicios.");
      
    }
  }

  async newService(id_pedido){
    if (!id_pedido) throw new Error('Error:No llego el id solicitado.')
    try {
      let order = {};
      await OrderController.getOrderBy(id_pedido)
        .then(result=> result.forEach(doc => order = doc))
    } catch (error) {
      console.error("Error en repositorio al crear un nuevo servicio.");
      
    }
  }

  async getServiceById(id_services){
    if (!id_services) throw new Error('Error:No llego el id del servicio.')

    try {      
      let service = {}
      await db.doc(id_services)
        .get()
        .then(result=>service=result.data())
        console.log(service);
        
      return service
    } catch (error) {
      console.error("Error en la base de datos al buscar servicio por id. id="+id_services);
    }
  }
}


export default new OrderRepo();


