import { Component } from 'react';
import firebase from '../config/firebase';
import ProductController from '../controllers/Product';
import { array } from 'prop-types';

const collection = '/orders';

const db = firebase.db.collection(collection)

class OrderRepo extends Component {

  //Se utiliza en voews/ModulOrders/Create/createOrderFinal.js 
  //En:'handleNexAndSaveOrder'
  async addOrder(order){    
    if (!order) throw new Error(`Error: No llego un pedido completo`);
    try {
      let newOrder = Object.assign({},order);
      db.doc()
      .set(newOrder)
      .then(()=>{
        return true;
      })  
    } catch (error) {
      console.log("Error al agregar PEDIDO a DATABASE: ", error);
    }
  }

  //Se utiliza en views/ModulOrders/Ready/ButtonOption.js
  deleteOrder(id_pedido){
    try {
      db.doc(id_pedido)
      .update({eliminado:true})
      .then(()=>{ return true })
    } catch (error) {
      console.log("Error en la base de datos.",error);
    }
  }

  //Devuelvo todos los pedidos
  async getOrders(){
    try {
      let list = {};
      await db.where("eliminado","==",false).get()
      .then(result =>{
        list = result.docs.map(doc => doc.data())
   })
      return list;
    } catch (error) {
      console.error("Error en base de datos: ",error);
    }
  }


  //Devuelvo todos los pedidos
  async getOrdersNow() {
    try {
      let fechaHoy = new Date();
      let fechaFormat = fechaHoy.getFullYear() +'-'
                        +(fechaHoy.getMonth()+1) +'-' //La función devuelve mes actual menos uno
                        +(fechaHoy.getDate());
      
      let list = {};
      await db
        .where("eliminado", "==", false)
        .where("fecha_entrega", "==", fechaFormat)
        .get()
        .then(result => {
          list = result.docs.map(doc => doc.data())
        })
      return list;
    } catch (error) {
      console.error("Error en base de datos: ", error);
    }
  }


  //Metodo que verifica si tiene la cantidad disponible entre esas fechas
  async authAlqProduct(fec_ini,fec_fin){
    try {
      let ini = fec_ini;
      let fin = fec_fin;
      let id = ''; //Poner el id del pedido.
      if (ini <= fin) {
        db.get(id)
          .then()
      }      
    } catch (error) {
      console.log("Error en base de datos: ",error);
    }
  }

  //Metodo para agregar los id's de los productos.
  //Se utiliza en ModulsOrders/addIdOrder/ProduictListOrder
  async saveIdsOrder(id_order,lista_productos_con_ids){
    if (!id_order) throw new Error(`Error: No llego el id del pedido correctamente.`);
    try {
      let list_products_ids = { lista_productos_con_ids };
       
      db.doc(id_order)
        .update(list_products_ids);
    } catch (error) {
      console.log("Error en base de datos: ",error);
    }
  };
  
  contarProductos(pedidosSeleccionados){
    
    let lsProductos = pedidosSeleccionados.map(function(x) {
      return x.lista;
    });
    lsProductos = lsProductos.flat();

    //Cuento la cantidad por los distintos productos.
    var result = [];
    lsProductos.reduce(function(res,value) {
      if (!res[value.producto]) {
        res[value.producto] = {producto:value.producto,cantidad:0};
        result.push(res[value.producto])
      }
      res[value.producto].cantidad += parseInt(value.cantidad);
      return res;
    },{})
    console.log(result); //Muestro el resultado de la cuenta.


    //GROUP BY EN JAVASCRIPT
    const groupBy = (array,key) => {
      return array.reduce((result,currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          parseInt(currentValue.cantidad)
          )
        return result;
      },{})
    }
    //Guardo resultado de groupBy y muestro por consola. Se agrupa por el parametro que indiques como segundo parametro.
    const listGroupedByProducto = groupBy(lsProductos, 'producto');
    console.log(listGroupedByProducto);
  }
    

  //Verifica que los productos agregados al pedido existan
  async verifyProductExistence(id_producto){
    try { 
      return ProductController.getExistsProduct(id_producto.toString())

    } catch (error) {
      console.error("Error en la database: ",error);
    }

  };
  

  //Se utiliza en validateDate
  async validateDate(fecha_ini,fecha_fin){
    if(!fecha_fin) throw new Error('Error: No llego la fecha de fin.')
    if(!fecha_ini) throw new Error('Error: No llego la fecha de inicio.')

    try {
      console.log("fecha_ini",fecha_ini);
      console.log("fecha_fin",fecha_fin);

      let query = {};
      await db
      .where("detalle_pedido.fecha_finalizacion",">=",fecha_ini)
      
        .get()
        .then(result=>{
          query = result.docs.map(doc => doc.data())
        })
      //console.log("MUESTRO QUERY INI ",query);
      let pedidosSelecionados = [];
      
      query.forEach(pedido => {  
        if(pedido.detalle_pedido.fecha_entrega <= fecha_fin ){
         // console.log("Pedido que entro", pedido.detalle_pedido.fecha_entrega, "Fecha fin" , pedido.detalle_pedido.fecha_finalizacion );
          pedidosSelecionados.push({"id" : pedido.id_pedido, "lista" : pedido.listado_producto})
        }
      });

      console.log("Pedidos seleccionados ",pedidosSelecionados);
      console.log(this.contarProductos(pedidosSelecionados)) ;
      
      return pedidosSelecionados;

    } catch (error) {
      console.error("Error en la base de datos, al validar las fechas.");
      
    }
  }

  async AllDeposits(){
    try {
      let fechaActual = new Date();
      let fechaInicioMes = fechaActual.getFullYear() +'-'
                        +(fechaActual.getMonth()+1) +'-' //La función devuelve mes actual menos uno
                        +'01';
     
      let fechaFinMes = fechaActual.getFullYear() +'-'
                        +(fechaActual.getMonth()+1) +'-' //La función devuelve mes actual menos uno
                        +'31';
     
      let list = [];
      await db.where("eliminado","==",false) //Verifico que no este eliminado
        .where("estado","==","INICIAL") //Verifico que el estado sea inicial
        .where("fecha_entrega",">=",fechaInicioMes)
        .where("fecha_entrega","<=",fechaFinMes)
        .get()
        .then(result => {
          list = result.docs.map(doc => doc.data().monto_calculado)
        });
      return list; //Devuelvo el listado de pedidos con estado INICIAL
    } catch (error) {
      console.error("Error en la base de datos al devolver depositos.");
    }
  }
}


export default new OrderRepo();


