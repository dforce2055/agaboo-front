/**
 * @Repository
 * Customer **Repository** Class
 */
import { Component } from 'react';
import firebase from '../config/firebase';
const collection = 'customers';
const cant_customer = 5;
class CustomerRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            },

        }
        
    }

    ////Se utiliza en el TypeAhead. Al momento de utilizar el "getCustomer" no me filtra todos los datos
    getCustomerAll = async () =>{
        try {
            let coleccion = await firebase.db.collection(collection).where('eliminado','==', false).get();
            let clientes = coleccion.docs.map(doc => doc.data());
            return clientes;
        } catch (error) {
            throw new Error();
        }
    }

    //Se utiliza en ModulsUserAdmin\Delete-update-list\Table\ClientTable.js
    getCustomers = async () => {
        try {
            let coleccion = await firebase.db.collection(collection).where('eliminado','==', false)
            .limit(cant_customer)
            .get();
            let clientes = coleccion.docs.map(doc => doc.data());return clientes;
        } catch (error) {
            throw new Error();
        }
    };
    
    //Se usa en editCustomer pero se va a eliminar
    getCustomerByCUIL = async (cuil) => {
        try {
            let customer = {};
            await firebase.db.collection(collection)
                .where('cuil', '==', cuil)
                .limit(1)
                .get()
                .then(querySnapshot=> {
                    querySnapshot.forEach(function (doc) {
                        customer = doc.data();
                    });
                })

            return customer;
        } catch (error) {
            throw new Error(`No se encontro el usuario con CUIL: ${cuil}`);
        }
    }

    //Se utiliza en ModulsUserAdmin\Delete-update-list\Search\buttonSearch.js
    searchCustomer = async (e) => {
        try {
            let cliente = {};
            await firebase.db.collection(collection)
            .where('id','==', e)
            .get()
            .then(result =>{
                 cliente = result.docs.map(doc => doc.data())
            })
            return cliente;            
        } catch (error) {
            throw new Error();
        }        
    }

    //SE USA?
    getCustomerById = async (id) => {
        let customer = {};
         await firebase.db.collection(collection)
            .where('id', '==', id)
            .limit(1)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    customer = doc.data();
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                customer = null;
            });
        return customer;
    }

    //Se utiliza en ModulsUserAdmin\Create\AddresForm.js
    addCustomer = async (newCustomer_parameter) => {
        if (!newCustomer_parameter) throw new Error(`Error: no se envió un Cliente para registrar`);
        let newCustomer = Object.assign({}, newCustomer_parameter);
        let result = await firebase.db.collection(collection)
            .doc(newCustomer.id)
            .set(newCustomer)
            .then(() => {
                console.log("Cliente guardado exitosamente!!!");
                return true;
            })
            .catch(function (error) {
                console.error("Error al guardar el Cliente: ", error);
                return false;
            });
        return result;
    }
        
    //Se utiliza en ModulsUserAdmin\Delete-update-list\delete\DialogDelete.js
    deleteCustomer = async (id) => {
        let result = firebase.db.collection(collection)
            .doc(id)
            .update({
                //EL CAMPO ESTABA MAL ESCRITO Y ESTABA EN FALSO
                eliminado: true,
            })
            .then(() => { return true })
            .catch(function (error) {
                console.error("Error al eliminar el Cliente: ", error);
                return false;
            });
        return result;
    }

    //Se utiliza en ModulsUserAdmin\Delete-update-list\update\AddresForm.js
    editCustomer = async (customer) => {
        if (!customer) throw new Error(`Error: el cliente es obligatorio para poder editarlo`);
        let ID = customer.id;
        let result = this.getCustomerByCUIL(ID)
            .then(() => {
                firebase.db.collection(collection).doc(ID)
                    .update(Object.assign({}, customer));
                return true;
            })
            .catch(function (error) {
                console.error("Error al editar el cliente: ", error);
                return false;
            });
        return result;
    }

    getCustomerPagination = async (lastId) => {
        try {
            let customer = [];
            await firebase.db.collection(collection)
                .where("eliminado","==",false)
                .orderBy("id")
                .startAfter(lastId)
                .limit(cant_customer)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        customer.push(doc.data());
                    });
                })
                .catch(function (error) {
                    console.log("Error al paginar clientes: ", error);
                    customer = null;
                });
            return customer;
        } catch (error) {
            console.log("Error en la base de datos:", error);
        }
    }

    Typeahead = async (intput) =>{
        try {
            if (!intput) throw new Error(`Error: Es necesario ingresar una palabra.`);

            let newCustomers = [];
            let newCustomers2 = [];
            newCustomers2=this.getCustomerAll().then(result=>{
                console.log("entre a filter customer");
               return result.filter(function(item) {
                    const itemDataNombre = item.nombre.toUpperCase()+" "+item.apellido.toUpperCase()
                    const itemDataId = item.id.toUpperCase()
                    const itemDataDomicilio = item.domicilio.toUpperCase()
                    const itemDataRubro = item.rubro.toUpperCase()
                    const itemDataEmail = item.email.toUpperCase()

                    const _search = itemDataNombre+" "+itemDataId+" "+itemDataDomicilio+" "+itemDataRubro+" "+itemDataEmail

                    const text = intput.toUpperCase()
                    return _search.indexOf(text) > -1
                });
            })                        
            return newCustomers2
        } catch (error) {
            
        }
    }
}
export default new CustomerRepo();