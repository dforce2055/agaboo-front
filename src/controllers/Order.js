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
  
  getOrdersNow = async () => {
    try {
      let list = await OrderRepo.getOrdersNow();
      return list;
    } catch (error) {
      console.error("Error al traer todos los pedidos del dia.");
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

  verifyProductExistence(id_producto){
    try {
     return OrderRepo.verifyProductExistence(id_producto)
    } catch (error) {
      console.error("Error con el id del producto.");
    }
  }

  validateDate(fecha_ini,fecha_fin){
    try {
      return OrderRepo.validateDate(fecha_ini,fecha_fin);
    } catch (error) {
      console.error("Error al verificar por fechas.");
      
    }
  }

  allDeposits(){    
    try {
      return OrderRepo.AllDeposits()
    } catch (error) {
      console.error("Error en el controlador de pedidos al enviar depositos.");      
    }
  }
}

export default new OrderController();