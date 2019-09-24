/**
 * @Repository
 * Customer Repository Class
 */
import { Component } from 'react';
import { db } from '../config/firebase';
const collection = 'customers';

export default new class CustomerRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            },

        }
    }

    getCustomer = async (id) => {
        try {
            let cliente = await db.collection(collection).doc(id).get();
            //console.log(cliente.data());
            return cliente.data();
            //let cliente = await db.collection(collection)
                                    //.where('cuil', '==', '20-32465169-2')
                                    //.select()
                                    //.limit(1)
                                    //.get();
            //console.log(cliente.val());
            //return cliente.val();
            //return cliente.snapshot.doc.data();
            
        } catch (error) {
            throw new Error();
        }        
    }

    getCustomerByCUIL = async (cuil) => {
        if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
        let customer = {};
        let query = await db.collection(collection)
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
            let coleccion = await db.collection(collection).get();
            let clientes = coleccion.docs.map(doc => doc.data());
            return clientes;
        } catch (error) {
            throw new Error();
        }
    };

    addCustomer = async (newCustomer) => {
        let customer = await db.collection(collection)
            .doc(newCustomer.cuil)
            .set({
                apellido: newCustomer.apellido,
                nombre: newCustomer.nombre,
                cuit: newCustomer.cuit,
                cuil: newCustomer.cuil,
                tipoDocumento: newCustomer.tipoDocumento,
                dni: newCustomer.numeroDocumento,
                direccion: newCustomer.direccion,
                telefono: newCustomer.telefono,
                email: newCustomer.email,
                estado: newCustomer.estado,
                estado: newCustomer.estado,
                role: newCustomer.role,
        })
        .then(() => {
            console.log("Documento guardado exitosamente!");
            return true;
        })
        .catch(function (error) {
            console.error("Error al guardar el documento: ", error);
            return false;
        });

        return customer;
        
    }

    editCustomer = async (cuil, customer) => {
       if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
       let result = this.getCustomerByCUIL(cuil)
        .then(() => {
            db.collection(collection).doc(cuil).update({ 
                apellido: customer.apellido,
                nombre: customer.nombre,
                cuit: customer.cuit,
                cuil: customer.cuil,
                tipoDocumento: customer.tipoDocumento,
                dni: customer.numeroDocumento,
                direccion: customer.direccion,
                telefono: customer.telefono,
                email: customer.email,
                estado: customer.estado,
                estado: customer.estado,
                role: customer.role,
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
            db.collection(collection).doc(cuil).delete();
            return true;
        })
        .catch(function (error) {
            console.error("Error al eliminar el documento: ", error);
            return false;
        });
        return result;
    }
}
