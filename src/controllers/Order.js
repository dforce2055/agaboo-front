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

  saveOrderProductIds(id,list){
    try {
      //Paso el id y listado a repositories.
      OrderRepo.saveIdsOrder(id,list);
    } catch (error) {
      console.error("Error al traer el id con su listado.");
      
    }
  }

  //Se utiliza en la verificacion de id's e el file Chip.js
  verifyProductExistence(id_producto){
    try {
      var value = false;
      OrderRepo.verifyProductExistence(id_producto).then(v=> {
        console.log(v);
       value = v
       console.log(value);       
      })
      console.log(value);
      
      return value
    } catch (error) {
      console.error("Error con el id del producto.");
      
    }
  }
}

export default new OrderController();