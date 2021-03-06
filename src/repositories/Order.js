import { Component } from 'react';
import firebase from '../config/firebase';
import moment from 'moment';

const collection = '/orders';
const cant_order = 5;
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

  //Devuelvo pedidos por id
  async getOrderById(id_pedido){
    try {
      let order = {};
      await db.where("eliminado","==",false)
        .where("id_pedido","==",id_pedido)
        .get()
        .limit(1)
        .then(result=>{
          result.forEach(doc => {
            order = doc.data();
          });
        })
    } catch (error) {
      console.error("Error al solicitar el pedido "+id_pedido+" de la base de datos.");
    }
  }

  //Devuelvo todos los pedidos paginados
  async getOrders(){
    try {
      let list = {};
      await db.where("eliminado","==",false)
      .limit(cant_order)
      .get()
      .then(result =>{
        list = result.docs.map(doc => doc.data())
      })
      //Ordeno por MESES Y AÑO
      
      return list;
    } catch (error) {
      console.error("Error en base de datos: ",error);
    }
  }
  //Lo uitilizo para el typeahead.
    async getOrdersALL(){
    try {
      let list = {};
      await db.where("eliminado","==",false)
      .get()
      .then(result =>{
        list = result.docs.map(doc => doc.data())
      })
      //Ordeno por MESES Y AÑO
      
      return list;
    } catch (error) {
      console.error("Error en base de datos: ",error);
    }
  }

  //Devuelvo todos los pedidos
  async getOrdersNow() {
    try {
      let fechaHoy = new Date();
       //La función devuelve mes actual
      let fechaFormat = moment().format("YYYY-MM-DD")

      let list = [];
      await db.where("eliminado", "==", false)
        .get()
        .then(result =>{
          return result.docs.map(doc=>{
            if (doc.data().estado === "ENTREGADO" && doc.data().fecha_finalizacion === fechaFormat) {
              return list.push(doc.data())
            }else if (doc.data().fecha_entrega === fechaFormat) {
              return list.push(doc.data())
            }
          })
        })      
      return list;
    } catch (error) {
      console.error("Error en base de datos: ", error);
    }
  }

  //Metodo para agregar los id's de los productos.
  async saveOrderProductIds(id_order,lista_productos_con_ids){
    if (!id_order) throw new Error(`Error: No llego el id del pedido correctamente.`);
    try {       
      db.doc(id_order)
        .update({lista_productos_con_ids,estado:'EN CAMINO'});
        
      return 'EN CAMINO';
    } catch (error) {
      console.log("Error en base de datos: ",error);
    }
  }


  async validateDate(fecha_ini, fecha_fin){
    if(!fecha_fin) throw new Error('Error: No llego la fecha de fin.')
    if(!fecha_ini) throw new Error('Error: No llego la fecha de inicio.')

    try {
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

      await db.where("eliminado","==",false) //Verifico que este eliminado
        .where("estado","==","PAGADO") //Verifico que el estado sea pago
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
        //FILTRO
        result.docs.map( doc =>{
          if (doc.data().estado === "FINALIZADO" || doc.data().estado === "ADEUDA"){          
            list.push(doc.data())
          }
        })
      });

      return list;
    } catch (error) {
      console.error("Error en la base de datos al devolver los pedidos. ",error)
    }
  }

  async paid_UnpaidOrders(){
    try {
      let values = {
        sum_paid:0,
        sum_unpaid:0,
      };
      await db.where("eliminado","==",false)
      .get()
      .then(result=>{
        result.docs.map( doc =>{
          if (doc.data().estado == "PAGADO")
            values.sum_paid += doc.data().monto_calculado
        })
      })

      await db.where("eliminado","==",false)
      .get()
      .then(result=>{
        result.docs.map( doc =>{
          if (doc.data().estado !== "PAGADO")
            values.sum_unpaid += doc.data().monto_calculado
        })
      })
      return values;
    } catch (error) {
      console.error("Error en la base de datos al calcular el valor total de pedidos pagos e impagos.",error);
    }
  }

  async changeOrderPayment(id_pedido){
    try {
      db.doc(id_pedido)
        .update({eliminado:false,estado:'PAGADO'})

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
      await db.where("eliminado","==",false) 
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
      
      //Ordeno por meses 
        fmList.sort(function(minor,higher) {
          if (minor.time > higher.time) {
            return 1;
          }else{
            return -1
          }
        });

      return fmList;
    } catch(error){
      console.error("Error en la base de datos al devolver la suma de los chart.");
    }
  }

  async filterByState(state){
    try {
      if (!state) throw new Error('Error: No llego el estado a la base de datos que es necesario para su filtrado.');
      let order = [];
      await db.where("eliminado","==",false)
        .get()
        .then(result =>{
          result.docs.map(doc =>{
            if (doc.data().estado == state) {
              order.push(doc.data())
            }
          })          
        });        
      return order;
    } catch (error) {
      console.log("Error en el controlador de pedidos",error);
      
    }
  }

  async changeStateOrder(id_pedido,estado){
    if (!id_pedido) throw new Error('Error: No llego el id del pedido.')
    if (!estado) throw new Error('Error: No llego el estado del pedido.')
    try {
      await db.doc(id_pedido)
      .update({estado:estado})
      .then(()=>{ return true })
    } catch (error) {
      console.log("Error en la base de datos al cambiar el estado del pedido a "+estado+" .");
      
    }
  }

  Typeahead = async (intput) =>{
      try {
          if (!intput) throw new Error(`Error: Es necesario ingresar una palabra.`);

          let newOrder = [];
          newOrder = this.getOrdersALL().then(result=>{
            if (result) {
              console.log("entre a filter order");
              
              return result.filter(function(item) {
                  const itemDataNombre = item.nombre.toUpperCase()
                  const itemDataFech_finalizacion= item.fecha_finalizacion.toUpperCase()
                  const itemDataFech_entrega = item.fecha_entrega.toUpperCase()
                  const itemDataId_cliente = item.id_cliente.toUpperCase()
                  const itemDataUbicacionDeEntrega = item.detalle_pedido.ubicacionDeEntrega.toUpperCase()
                  
                  const _search = itemDataNombre+" "+itemDataFech_finalizacion+" "+itemDataFech_entrega+" "+itemDataId_cliente+" "+itemDataUbicacionDeEntrega

                  const text = intput.toUpperCase()
                  return _search.indexOf(text) > -1
              });
            }
          })                        
          return newOrder
      } catch (error) {
          
      }
  }

  getOrderPagination = async (lastId) => {
    try {
        let order = [];
        await db.where("eliminado","==",false)
            .orderBy("id_pedido")
            .startAfter(lastId)
            .limit(cant_order)
            .get()
            .then(function (querySnapshot) {
              console.log("llegue a repo",querySnapshot);
              
                querySnapshot.forEach(function(doc) {
                    order.push(doc.data());
                });
            })
            .catch(function (error) {
                console.log("Error al paginar pedidos: ", error);
                order = null;
            });
        return order;
    } catch (error) {
        console.log("Error en la base de datos:", error);
    }
  }

}


export default new OrderRepo();


