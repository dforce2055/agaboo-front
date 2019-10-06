/**
 * @Repository
 * Customer Repository Class
 */
import { Component } from 'react';
import firebase from '../config/firebase';
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
            // Lo busco por id de documento en la colección, el cual deberia ser el cuil/cuit
            let cliente = await firebase.db.collection(collection).doc(id).get();
            
            return cliente.data();            
        } catch (error) {
            throw new Error();
        }        
    }

    getCustomerByCUIL = async (cuil) => {
        if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
        let customer = {};
         await firebase.db.collection(collection)
            .where('cuil', '==', cuil)
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

    getCustomers = async (res) => {
        try {
            let coleccion = await firebase.db.collection(collection).get();
            let clientes = coleccion.docs.map(doc => doc.data());
            return clientes;
        } catch (error) {
            throw new Error();
        }
    };

    addCustomer = async (newCustomer) => {
        if (!newCustomer) throw new Error(`Error: no se envio un cliente para registrar`);
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
                
            });
            return true;
        })
        .catch(function (error) {
            console.error("Error al guardar el documento: ", error);
            return false;
        });
        return result;
    }
    
    deleteCustomer = async (cuil) => {
       if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
       let result = this.getCustomerByCUIL(cuil)
        .then(() => {
            firebase.db.collection(collection).doc(cuil).delete();
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