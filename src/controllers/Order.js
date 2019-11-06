import { Component } from 'react';
import OrderRepo from '../repositories/Order.js';

class OrderController extends Component {
  
  //Metodo para agregar un nuevo pedido a base de datos.
  addOrder(e){
    try {
      OrderRepo.addOrder(e);
    } catch (error) {
      console.error("ERROR NO PASO EL CONTROL.",error);
    }
  }

  getOrders = async () => {
    try {
      let list = await OrderRepo.getOrders();
      return list;
    } catch (error) {
      console.error("Error al traer todos los pedidos.");
    }
  }

  //Se utiliza en views/ModulOrders/Ready/ButtonOption.js
  deleteOrder(id_pedido){
    try {
      OrderRepo.deleteOrder(id_pedido);
    } catch (error) {
      console.error("Error al eliminar un pedido.",error);
    }
  }

  saveOrderProductIds(id,list){
    try {
      //Paso el id y listado a repositories.
      OrderRepo.saveIdsOrder(id,list);
    } catch (error) {
      console.error("Error al traer el id con su listado.");
      
    }
  }

  verifyProductExistence = async (id_producto) =>{
    try {
      var value = false;
      OrderRepo.verifyProductExistence(id_producto)
        .then(r=>{
          console.log("Lo que recibi de repositorie es:",r);
          value = r;
          console.log("Cambie el valor local a: ",value);
          
        })
        console.log("Retorno la variable pisada:",value);
        
        return value;
    } catch (error) {
      console.error("Error con el id del producto.");
      
    }
  }
}

export default new OrderController();