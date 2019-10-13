/**
 * @Repository
 * Customer **Repository** Class
 */
import { Component } from 'react';
import firebase from '../config/firebase';
import { Customer } from '../models/Customer';
const collection = 'customers';

class CustomerRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            },

        }
        
    }

    getCustomer = async (id) => {
        try {
            let query = await firebase.db.collection(collection).doc(id).get();
            return query.data();
        } catch (error) {
            throw new Error();
        }
    }

    getCustomerByEmail = async (email) => {
        try {
            let customer = {};
            await firebase.db.collection(collection)
                .where('email', '==', email)
                .limit(1)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        customer = doc.data();
                    });
                })
            return customer;
        } catch (error) {
            throw new Error(`No se encontro el usuario con Email: ${ email }`);
        }
    }

    getCustomerByName = async (name) => {
        try {
            let customers = [];
            await firebase.db.collection(collection)
                .where('nombre', '>=', name)
                .orderBy('nombre')
                //.limit(1)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        customers.push(doc.data());
                    });
                })
            return customers;
        } catch (error) {
            throw new Error(`No se encontro el usuario con Nombre: ${ name }`);
        }
    }

    searchCustomer = async (e) => {
        try {
            console.log("LLEGUE A REPO");
            let cliente = {};
            let clienteFiltrado = {};
            // Lo busco por id de documento en la colección, el cual deberia ser el cuil/cuit
            await firebase.db.collection(collection)
            .where('dni','==', e)
            .get()
            .then(result =>{
                 cliente = result.docs.map(doc => doc.data())
            })
            

            return cliente;            
        } catch (error) {
            throw new Error();
        }        
    }

    getCustomerById = async (cuil) => {
        
        let customer = {};
         await firebase.db.collection(collection)
            .where('dni', '==', cuil)
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

    getCustomers = async () => {
        try {
            let coleccion = await firebase.db.collection(collection).where('eliminado','==', false).get();
            let clientes = coleccion.docs.map(doc => doc.data());
            return clientes;
        } catch (error) {
            throw new Error();
        }
    };

    addCustomer = async (newCustomer) => {
        if (!newCustomer) throw new Error(`Error: no se envio un cliente para registrar`);
        let result = await firebase.db.collection(collection)
            .doc(newCustomer.id)
            .set({
                nombre: newCustomer.nombre,
                apellido: newCustomer.apellido,
                cuit: newCustomer.cuit,
                empleo:newCustomer.empleo,
                id:newCustomer.id,
                localidad:newCustomer.localidad,
                celular:newCustomer.celular,        
                calle: newCustomer.calle,
                altura: newCustomer.altura,
                email: newCustomer.email,

                //DELETE
                eliminado:false,
                /*
                estado: newCustomer.estado,
                role: newCustomer.role,
                tipoDocumento: newCustomer.tipoDocumento,*/
            })
            .then(() => {
                console.log("Documento guardado exitosamente!");
                return true;
            })
            .catch(function (error) {
                console.error("Error al guardar el documento: ", error);
                return false;
            });
        // Retorna True o False
        return result;
    }

    setCustomer = async (setCustomer) => {
       let result = firebase.db.collection(collection)
        .doc(setCustomer.cuit)
        .get()
        .then(() => {            
            firebase.db.collection(collection)
            .doc(setCustomer.cuit)
            .update({    
                nombre: setCustomer.nombre,
                apellido: setCustomer.apellido,
                localidad:setCustomer.localidad,
                celular:setCustomer.celular,       
                calle: setCustomer.calle,
                altura: setCustomer.altura,
                email: setCustomer.email,
                cuit: setCustomer.cuit,
                empleo:setCustomer.empleo,
                
               /* nombre: customer.nombre,
                apellido: customer.apellido,
                
                cuil: customer.cuil,
                tipoDocumento: customer.tipoDocumento,
                numeroDocumento: customer.numeroDocumento,
                fechNac: customer.fechNac,
                direccion: customer.direccion,
                calle: customer.calle,
                altura: customer.altura,
                localidad: customer.localidad,
                celular: customer.celular,
                telefono: customer.telefono,
                email: customer.email,
                estado: customer.estado,
                role: customer.role,*/
            })
            .catch(error=>{console.error("Error al modificar cliente: ",error);
            });
        })
        .catch(function (error) {
            console.error("Error al buscar el cliente: ", error);
            return false;
        });
        return result;
    }
    
    deleteCustomer = async (deleteCustomer) => {
       if (!deleteCustomer.cuit) throw new Error(`Error: el DNI es obligatorio`);
       let result = firebase.db.collection(collection)
        .doc(deleteCustomer.cuit)
        .get()
        .then(() => {
            firebase.db.collection(collection).doc(deleteCustomer.cuit)
            .update({
                //DELETE
                eliminado:true,
            })
            return true;
        })
        .catch(function (error) {
            console.error("Error al eliminar el documento: ", error);
            return false;
        });
        return result;
    }
}
export default new CustomerRepo();