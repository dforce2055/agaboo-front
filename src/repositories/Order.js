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
  }
  
  

  //Se utiliza en validateDate
  async validateDate(fecha_ini, fecha_fin){
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
      let pedidosSelecionados = [];
      
      query.forEach(pedido => {  
        if(pedido.detalle_pedido.fecha_entrega <= fecha_fin ){
          pedidosSelecionados.push({"id" : pedido.id_pedido, "lista" : pedido.listado_producto})
        }
      });

      
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
        if(result.estado !== "PAGADO") //FILTRO
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

  //Sumatoria del monto mensual
  async allDepositsPerYear(){
    try {
      let fechaActual = new Date();
      let fechaInicioAño = fechaActual.getFullYear() +'-'+'01'+'-'+'01';
      let fechaFinAño = fechaActual.getFullYear() +'-'+'12'+'-'+'31';
      let list = [];

      //Cuando un pedido esta pagado, se elimina logicamente de la db. Por ende, busco los que esten eliminados y pagados.
      await db.where("eliminado","==",true) 
        .where("estado","==","PAGADO")
        .get()
        .then(result => {
          result.docs.map( doc =>{
            //Filtro todos los pedidos de este año y los agrego
            if(doc.data().fecha_entrega >= fechaInicioAño && doc.data().fecha_entrega<=fechaFinAño){
              list.push({amount:doc.data().monto_calculado,time:doc.data().detalle_pedido.fecha_finalizacion.substr(0,7)})
            }
          })
        });
      
      //Sumo el valor mensualente
      let fmList = []; //Donde se guardaran todos los meses con su respectivo monto pagado.
      list.reduce(function(res,value) { //Sumo por mes
        if (!res[value.time]) {
          res[value.time] = {time:value.time,amount:0};
          fmList.push(res[value.time])
        }
        res[value.time].amount += value.amount;
        return res;
      },{}) //Tiene que devolver una coleccion de objetos
      
      return fmList;
    } catch(error){
      console.error("Error en la base de datos al devolver la suma de los chart.");
    }
  }

}


export default new OrderRepo();


