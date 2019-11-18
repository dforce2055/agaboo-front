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
      let pedidosSeleccionados = await OrderRepo.validateDate(fecha_ini,fecha_fin); //Selecciono los pedidos que estan en el rango de fechas
      let _alquilados = this.contarProductos(pedidosSeleccionados) //Cantidad total de productos que estan alquilados

      let sobrante = []; //Resultado de los productos alquilados menos los productos que estan sin alquilar. Es decir la cantidad total de productos que podes alquilar en el rango de fechas dadas

      let concatenados;
      //Cantidad de productos disponibles
      ProductController.cantidad_sin_Alquilar() 
        .then(result=>{

          console.log("disponibles=",result);
          console.log("alquilados=",_alquilados);
          for (let i = 0; i < result.length; i++) { 
            for (let n = 0; n < _alquilados.length; n++) {
              if (result[i].type == _alquilados[n].type) { //Si el producto es igual al producto alquilado en esas
                let resta = result[i].cantidad - _alquilados[n].cantidad
                if (resta < 0) {
                  sobrante.push({type:result[i].type,cantidad:0})
                }else{
                  sobrante.push({type:result[i].type,cantidad:resta})
                }
              }
            }      
          }
      });       
      console.log("CANTIDADES DIOSPONIBLES PARA ALQUILARSE=",sobrante); // ===>>> NO SE COMO MOSTRAR LOS PRODUCTOS QUE NO ESTAN EN ALQUILADOS,ejemplo => Boleteria

      //NO LO RECORRE!!! POR QUE NO LO HACE???
      for (let i = 0; i < sobrante.length; i++) {
        const element = sobrante[i];
        console.log(element);
        
      }
      //return sobrante;
    } catch (error) {
      console.error("Error al verificar por fechas. " +error);
    }
  }

  /*contarProductosAlquilados(pedidosSeleccionados) {
  async chequearDisponibilidad(productos) {
    let productosDisponibles = {};
    let tiposDeProductos = await ProductController.getTypesOfProducts();

    tiposDeProductos.forEach(tipoDeProducto => {
      if (tipoDeProducto in productos == false) productos[tipoDeProducto] = 0;
    })

    for (var [key, value] of Object.entries(productos)) {
      await ProductController.getCantProductsByType(key)
            .then( (disponibles) => {
              if (disponibles > value) productosDisponibles[key] = disponibles - value;
              else productosDisponibles[key] = false;
            });
                        
    }

    return productosDisponibles;
  }*/

  contarProductos(pedidosSeleccionados) {

    let lsProductos = pedidosSeleccionados.flatMap(pedido => pedido.lista);
    
    //Resultado de cantidad por producto
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


    
    /*//GROUP BY EN JAVASCRIPT
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