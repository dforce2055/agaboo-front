import { Component } from 'react';
import OrderRepo from '../repositories/Order.js';
import ProductController from '../controllers/Product';
//import "core-js/fn/array/flat-map"; //importo flatMap, por alguna razón no lo reconoce...
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
  
  async validateOrder(fecha_ini, fecha_fin){
    if (!fecha_fin) throw new Error('Error: No llego la fecha de fin.')
    if (!fecha_ini) throw new Error('Error: No llego la fecha de inicio.')

    try {
      //return OrderRepo.validateDate(fecha_ini,fecha_fin);
      let pedidosSeleccionados = await OrderRepo.validateDate(fecha_ini,fecha_fin); //Selecciono los pedidos con su id y detalle_facutra
      let _alquilados = this.contarProductosAlquilados(pedidosSeleccionados) //Filtro y selecciono el modelo con su cantidad.
      let _disponibles = this.contarProductosDisponibles();
      console.log("DISPONIBLES=",_disponibles);
      console.log("ALQUILADOS=",_alquilados);    

     /*
     //DE DIEGO
     productosDisponibles = await this.chequearDisponibilidad(cantidadProductos);
      
      console.log("Cantidad de Productos en los pedidos desde " +fecha_ini +" hasta " +fecha_fin);
      console.log(cantidadProductos);  

      console.log("Disponibilidad de Productos: ");
      console.log(productosDisponibles);
      
      return productosDisponibles;*/
    } catch (error) {
      console.error("Error al verificar por fechas. " +error);
      
    }
  }

  //Metodo que devuelve la cantidad disponible y su modelo de producto
  contarProductosDisponibles(){
    try {
      let array = [];
      ProductController.cantidad_sin_Alquilar()
        .then(result=>{
          result.forEach(res => array.push(res))
        }); //Conjunto de productos y su cantidad
      return array;
    } catch (error) {
      console.error("ERROR al calcular la cantidad de productos disponibles.");
    }
  }

  async chequearDisponibilidad(productos) {
    let productosDisponibles = {};
    
    for (var [key, value] of Object.entries(productos)) {
      await ProductController.getCantProductsByType(key)
            .then( (disponibles) => {
              if (disponibles > value) productosDisponibles[key] = disponibles - value;
              else productosDisponibles[key] = false;
            });  
    }

         ProductController.cantidad_sin_Alquilar().then(res=>console.log("Lo que traje de repositorio product==",res))

    return productosDisponibles;
  }

  contarProductosAlquilados(pedidosSeleccionados) {

    let lsProductos = pedidosSeleccionados.flatMap(pedido => pedido.lista);
    
    //Cuento la cantidad por los distintos productos.
    var result = [];
    lsProductos.reduce(function (res, value) {
      if (!res[value.producto]) {
        res[value.producto] = { type: value.producto, cantidad: 0 };
        result.push(res[value.producto])
      }
      res[value.producto].cantidad += parseInt(value.cantidad);
      return res;
    }, {})
    //console.log(result); //Muestro el resultado de la cuenta.

/* //NO LO NECESITO
    //GROUP BY EN JAVASCRIPT
    const groupBy = (array, key) => {
      return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          parseInt(currentValue.cantidad)
        )
        return result;
      }, {})
    }
    //Guardo resultado de groupBy y muestro por consola. Se agrupa por el parametro que indiques como segundo parametro.
    const listGroupedByProducto = groupBy(lsProductos, 'producto');
    //console.log(listGroupedByProducto);

    let productos = {};

    Object.entries(listGroupedByProducto).forEach(([key, value]) => {
      let cant = 0;
      let producto = "";

      value.forEach(cantidad =>  cant += parseInt(cantidad))

      //if (key.toLowerCase() === "Baño Químico") producto = "baño"
      producto = key;

      productos[producto] = cant;

    });*/

    return result;
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
      return OrderRepo.allDepositsPerYear(); //Retorno el monto mensual
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