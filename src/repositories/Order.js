import { Component } from 'react';
import firebase from '../config/firebase';

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
       //La función devuelve mes actual menos uno
      let fechaFormat = fechaHoy.getFullYear() +'-'+(fechaHoy.getMonth()+1) +'-'+(fechaHoy.getDate());
      
      let list = {};
      await db
        .where("eliminado", "==", false)
        .where("fecha_entrega", "==", fechaFormat)
        .get()
        .then(result => list = result.docs.map(doc => doc.data()))
      return list;
    } catch (error) {
      console.error("Error en base de datos: ", error);
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
    
    let lsProductos = pedidosSeleccionados.flatMap(pedido => pedido.lista);

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

  async allDepositsInActualMonth(){
    try {
      //Guardo fecha del mes actual
      let fechaActual = new Date();
      let fecha_inicio_mes = fechaActual.getFullYear() +'-'+(fechaActual.getMonth()+1)+'-01';
      let fecha_fin_mes = fechaActual.getFullYear() +'-'+(fechaActual.getMonth()+1) +'-31';

      //Suma total que voy a retornar
      let sum = 0;

      await db.where("eliminado","==",false) //Verifico que no este eliminado
        .where("estado","==","INICIAL") //Verifico que el estado sea inicial
        .get()
        .then(result => {
          result.docs.map( doc =>{
            if (doc.data().fecha_entrega >= fecha_inicio_mes && doc.data().fecha_entrega <=fecha_fin_mes) 
              sum += doc.data().monto_calculado
          })
        });
        
      return sum;
    } catch (error) {
      console.error("Error en la base de datos al devolver depositos. ",error);
    }
  }

  //Devuelve todos los pedidos que no estan cobrados
  async unpaidOrders(){
    try {
      let list = [];
      await db.where("eliminado","==",false)
      .get()
      .then(result=>{
        if(result.estado !== "PAGADO")
          list = result.docs.map(doc => doc.data())
      });

      return list;
    } catch (error) {
      console.error("Error en la base de datos al devolver los pedidos. ",error)
    }
  }

  async totalUnpaidOrders(){
    try {
      let sum = 0;
      await db.where("eliminado","==",false)
      .get()
      .then(result=>{
        result.docs.map( doc =>{
          if (doc.data().estado !== "PAGADO")
            sum += doc.data().monto_calculado
        })
      })
      return sum;
    } catch (error) {
      console.error("Error en la base de datos al calcular el valor total de pedidos impagos.",error);
    }
  }

  async changeOrderPayment(id_pedido){
    try {
      db.doc(id_pedido)
        .update({eliminado:true,estado:'PAGADO'})

    } catch (error) {
      console.error("Error en la base de datos al cambiar estado del pedido"+id_pedido+".",error);
    }
  }
}


export default new OrderRepo();


