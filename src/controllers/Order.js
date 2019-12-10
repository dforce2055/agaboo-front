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

  getOrderById(id_pedido){
    try {      
      return OrderController.getOrderById(id_pedido);
    } catch (error) {
      console.error("Error al solicitar el pedido "+id_pedido+" de la base de datos.");
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
      return OrderRepo.saveOrderProductIds(id,list);
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

      //retorno la cantidad de productos alquilable. 
      return ProductController.cantidad_sin_Alquilar() 
        .then(result=>{

          console.log("disponibles=",result);
          console.log("alquilados=",_alquilados);

          //Filtro para saber la cantidad de productos que tengo para alquilar

          let _concat = result.concat(_alquilados) //Concateno los valores asi los puedo reducir 
          var concat_reducido = []; //Se guardara el resultado luego de utilizar reduce con _concat
          
          _concat.reduce(function (res, value) { //Se utiliza para descontar los repetidos y en caso de que exista los agrega.
            if (!res[value.type]) { //Si el valor no existe lo agrego
              res[value.type] = { type: value.type, cantidad: value.cantidad };
              concat_reducido.push(res[value.type])
            }else if (res[value.type]) { //Si el valor ya existe descuento su valor
              res[value.type].cantidad -= value.cantidad;
            }
            return res;
          }, {})
          console.log("disponibles para alquilar en esa fecha",concat_reducido);

          return concat_reducido;
      });       

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

  //Devuelve el total acumulado de los pedidos impagos y pagos.
  paid_UnpaidOrders(){
    try {
      return OrderRepo.paid_UnpaidOrders();
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

  filterByState (state){
    try {
      if (!state) throw new Error('Error: No llego el estado necesario para su filtrado.')
      return OrderRepo.filterByState(state);
    } catch (error) {
      console.log("Error en el controlador de pedidos",error);
      
    }
  }

  changeStateOrder(id_pedido,estado){
    if (!id_pedido) throw new Error('Error: No llego el id del pedido.')
    if (!estado) throw new Error('Error: No llego el estado del pedido.')
    
    try {
      
      return OrderRepo.changeStateOrder(id_pedido,estado)
    } catch (error) {
      console.log("Error en el controlador de pedidos.",error);
      
    }
  }

  Typeahead (intput){
    try {
        return OrderRepo.Typeahead(intput);
    } catch (error) {
        console.error("Error en el controlador al utilizar Typeahead.",error);
        
    }
  } 

  getOrderPagination(last_id){
      if (!last_id) throw new Error(`Error: el ultimo id es obligatorio para poder paginar los clientes.`);
      //Si NO llega cant, devuelvo los 10 siguientes
      try {
          let order = OrderRepo.getOrderPagination(last_id);            
          console.log(`########### PAGINACIÓN -${last_id}- #################`);
          if (order) {
              return order;
          } else {
              console.log("No se pudo obtener e llistado de usuarios paginados");
              return false;
          }
      } catch (error) {
          console.log("Error:", error);
      }
  }

}

export default new OrderController();