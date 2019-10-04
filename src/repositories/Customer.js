/**
 * Customer Repository Class
 */
import { Component } from 'react';
import { db } from '../config/firebase';
const collection = '/customers';

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
            // Lo busco por ide de documento en la colección, el cual deberia ser el cuil/cuit
            let cliente = await db.collection(collection).doc(id).get();
            
            return cliente.data();            
        } catch (error) {
            throw new Error();
        }        
    }

    getCustomerById = async (cuil) => {
        if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
        let customer = {};
         await db.collection(collection)
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
        if (!newCustomer) throw new Error(`Error: no se envio un cliente para registrar`);
        let result = await db.collection(collection)
            .doc(newCustomer.dni)
            .set({
                nombre: newCustomer.nombre,
                apellido: newCustomer.apellido,
                dni: newCustomer.dni,
                localidad:newCustomer.localidad,
                celular:newCustomer.celular,
                /*                
                cuit: newCustomer.cuit,
                cuil: newCustomer.cuil,
                tipoDocumento: newCustomer.tipoDocumento,
                numeroDocumento: newCustomer.numeroDocumento,
                direccion: newCustomer.direccion,
                telefono: newCustomer.telefono,
                email: newCustomer.email,
                estado: newCustomer.estado,
                role: newCustomer.role,*/
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

    editCustomer = async (cuil, customer) => {
       if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
       let result = this.getCustomerByCUIL(cuil)
        .then(() => {
            db.collection(collection).doc(cuil).update({        
                nombre: customer.nombre,
                apellido: customer.apellido,
                cuit: customer.cuit,
                cuil: customer.cuil,
                tipoDocumento: customer.tipoDocumento,
                numeroDocumento: customer.numeroDocumento,
                direccion: customer.direccion,
                telefono: customer.telefono,
                email: customer.email,
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
    
    deleteCustomer = async (dni) => {
       if (!dni) throw new Error(`Error: el CUIL es obligatorio`);
       let result = this.getCustomerByCUIL(dni)
        .then(() => {
            db.collection(collection).doc(dni).set({EstadoEnDb:false});
            return true;
        })
        .catch(function (error) {
            console.error("Error al eliminar el documento: ", error);
            return false;
        });
        return result;

        if(dni != undefined || !dni){
            try {
                let customer = db.collection(collection)
                    .doc(dni)
                    .set({
                        EstadoEnDb:false,
                    })
                console.log("Estado cambiado en db.");
                console.log(customer);
                
                
            } catch (error) {
                console.error(error);            
            }

        }
    }
}
export default new CustomerRepo();