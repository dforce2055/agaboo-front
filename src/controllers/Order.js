import { Component } from 'react';
import OrderRepo from '../repositories/Order.js';
import ProductController from '../controllers/Product';

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

  //Verifica que los productos agregados al pedido existan
  verifyProductExistence(id_producto){
    try {
     return ProductController.getExistsProduct(id_producto.toString())
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

  //Devuelve todos la suma de todos los pedidos que estan pendiente de pago del mes actual.
  allDepositsInActualMonth(){    
    try {
      return OrderRepo.allDepositsInActualMonth()
    } catch (error) {
      console.error("Error en el controlador de pedidos al enviar depositos. ",error); 
    }
  }

  //Devuelve todos los pedidos que estan sin pagar.
  unpaidOrders(){
    try {
      return OrderRepo.unpaidOrders();
    } catch (error) {
      console.error("Error en el controlador de pedidos al enviar los pedidos sin pagar. ", error);
    }
  }

  //Devuelve el total acumulado de los pedidos impagos.
  totalUnpaidOrders(){
    try {
      return OrderRepo.totalUnpaidOrders();
    } catch (error) {
      console.error("Error en el controlador de pedidos al enviar el total acumulado. ", error);
    }
  }

  allDepositsPerYear(){
    try {
      return OrderRepo.allDepositsPerYear();
    } catch (error) {
      console.error("Error en el controlador de pedidos al enviar depositos.");      
    }
  }
  changeOrderPayment(id_pedido){
    try {
      OrderRepo.changeOrderPayment(id_pedido);
    } catch (error) {
      console.error("Error en el controlador de pedidos al poner pagado el pedido.",error);
    }
  }

}

export default new OrderController();