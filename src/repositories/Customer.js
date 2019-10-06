/**
 * @Repository
 * Customer Repository Class
 */
import { Component } from 'react';
<<<<<<< HEAD
import firebase from '../config/firebase';
const collection = 'customers';
=======
import { db } from '../config/firebase';
const collection = '/customers';
>>>>>>> Clientes

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
            // Lo busco por id de documento en la colección, el cual deberia ser el cuil/cuit
            let cliente = await firebase.db.collection(collection).doc(id).get();
            
            return cliente.data();            
        } catch (error) {
            throw new Error();
        }        
    }

    searchCustomer = async (e) => {
        try {
            console.log("LLEGUE A REPO");
            
            // Lo busco por ide de documento en la colección, el cual deberia ser el cuil/cuit
            let encontrados = await db.collection(collection)
            .where('dni','==',e)
            .get()

            let cliente = encontrados.docs.map(doc=>doc.data());            
            return cliente;            
        } catch (error) {
            throw new Error();
        }        
    }

    getCustomerById = async (cuil) => {
        if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
        let customer = {};
<<<<<<< HEAD
         await firebase.db.collection(collection)
            .where('cuil', '==', cuil)
=======
         await db.collection(collection)
            .where('dni', '==', cuil)
>>>>>>> Clientes
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
<<<<<<< HEAD
            let coleccion = await firebase.db.collection(collection).get();
=======
            let coleccion = await db.collection(collection).where('eliminado','==', false).get();
>>>>>>> Clientes
            let clientes = coleccion.docs.map(doc => doc.data());
            return clientes;
        } catch (error) {
            throw new Error();
        }
    };

    addCustomer = async (newCustomer) => {
        if (!newCustomer) throw new Error(`Error: no se envio un cliente para registrar`);
<<<<<<< HEAD
        let result = await firebase.db.collection(collection)
            .doc(newCustomer.cuil)
            .set({
                nombre: newCustomer.nombre,
                apellido: newCustomer.apellido,                
                cuil: newCustomer.cuil,
                cuit: newCustomer.cuit,
                tipoDocumento: newCustomer.tipoDocumento,
                numeroDocumento: newCustomer.numeroDocumento,
                fechNac: newCustomer.fechNac,
                direccion: newCustomer.direccion,
                calle:newCustomer.calle,
                altura: newCustomer.altura,
                localidad:newCustomer.localidad,
                celular:newCustomer.celular,
                telefono:newCustomer.telefono,
                email:newCustomer.email,
                estado:newCustomer.estado,
        })
        .then(() => {
            console.log("Documento guardado exitosamente!");
            return true;
        })
        .catch(function (error) {
            console.error("Error al guardar el documento: ", error);
            return false;
        });
        
        return result;
    }

    editCustomer = async (cuil, customer) => {
       if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
       let result = this.getCustomerByCUIL(cuil)
        .then(() => {
            firebase.db.collection(collection).doc(cuil).update({        
                nombre: customer.nombre,
=======
        let result = await db.collection(collection)
            .doc(newCustomer.dni)
            .set({
                nombre: newCustomer.nombre,
                apellido: newCustomer.apellido,
                dni: newCustomer.dni,
                localidad:newCustomer.localidad,
                celular:newCustomer.celular,                              
                
                fechNac:newCustomer.fechNac,
                calle: newCustomer.calle,
                altura: newCustomer.altura,
                email: newCustomer.email,

                //DELETE
                eliminado:false,
                /*
                estado: newCustomer.estado,
                role: newCustomer.role,
                cuit: newCustomer.cuit,
                cuil: newCustomer.cuil,
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
       let result = db.collection(collection)
        .doc(setCustomer.dni)
        .get()
        .then(() => {            
            db.collection(collection)
            .doc(setCustomer.dni)
            .set({    
                nombre: setCustomer.nombre,
                apellido: setCustomer.apellido,
                dni: setCustomer.dni,
                localidad:setCustomer.localidad,
                celular:setCustomer.celular,                              
                
                fechNac:setCustomer.fechNac,
                calle: setCustomer.calle,
                altura: setCustomer.altura,
                email: setCustomer.email,
                
                //DELETE
                eliminado:false,
               /* nombre: customer.nombre,
>>>>>>> Clientes
                apellido: customer.apellido,
                cuit: customer.cuit,
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
<<<<<<< HEAD
                
=======
                role: customer.role,*/
            })
            .catch(error=>{console.error("Error al modificar cliente: ",error);
            return false;
>>>>>>> Clientes
            });
            return true;
        })
        .catch(function (error) {
            console.error("Error al buscar el cliente: ", error);
            return false;
        });
        return result;
    }
    
    deleteCustomer = async (deleteCustomer) => {
       if (!deleteCustomer.dni) throw new Error(`Error: el DNI es obligatorio`);
       let result = db.collection(collection)
        .doc(deleteCustomer.dni)
        .get()
        .then(() => {
<<<<<<< HEAD
            firebase.db.collection(collection).doc(cuil).delete();
=======
            db.collection(collection).doc(deleteCustomer.dni)
            .update({
                //DELETE
                eliminado:true,
            })
>>>>>>> Clientes
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