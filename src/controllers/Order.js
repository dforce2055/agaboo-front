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

}

export default new OrderController();