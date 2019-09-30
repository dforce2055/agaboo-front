/**
 * Customer ProductRepository Class
 */

import { Component } from 'react';
import { db } from '../config/firebase';
const collection = '/products';

class ProductRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            },

        }
        
    }

    // getCustomer = async (id) => {
    //     try {
    //         let cliente = await db.collection(collection).doc(id).get();
    //         //console.log(cliente.data());
    //         return cliente.data();
    //         //let cliente = await db.collection(collection)
    //                                 //.where('cuil', '==', '20-32465169-2')
    //                                 //.select()
    //                                 //.limit(1)
    //                                 //.get();
    //         //console.log(cliente.val());
    //         //return cliente.val();
    //         //return cliente.snapshot.doc.data();
            
    //     } catch (error) {
    //         throw new Error();
    //     }        
    // }

    // getCustomerByCUIL = async (cuil) => {
    //     if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
    //     let customer = {};
    //      await db.collection(collection)
    //         .where('cuil', '==', cuil)
    //         .limit(1)
    //         .get()
    //         .then(function (querySnapshot) {
    //             querySnapshot.forEach(function (doc) {
    //                 // doc.data() is never undefined for query doc snapshots
    //                 //console.log(doc.id, " => ", doc.data());
    //                 customer = doc.data();
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log("Error getting documents: ", error);
    //             customer = null;
    //         });

    //     return customer;
    // }

    getProducts = async (res) => {
        try {
            let coleccion = await db.collection(collection).get();
            let products = coleccion.docs.map(doc => doc.data());
            console.log("Products en Repo",products);
            return products;
        } catch (error) {
            throw new Error();
        }
    };

    addProduct = async (newProduct) => {
        console.log('guardo el nuevo producto', newProduct)
        
         await db.collection(collection)
            .doc(newProduct.code)
            .set({
                type : newProduct.typeProduct,
                code : newProduct.code,
                description : newProduct.description,
                state : newProduct.state,
        })
        .then(() => {
            console.log("Documento guardado exitosamente!");
            return true;
        })
        .catch(function (error) {
            console.error("Error al guardar el documento: ", error);
            return false;
        });
    }



    // editCustomer = async (cuil, customer) => {
    //    if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
    //    let result = this.getCustomerByCUIL(cuil)
    //     .then(() => {
    //         db.collection(collection).doc(cuil).update({        
    //             nombre: customer.nombre,
    //             apellido: customer.apellido,
    //             cuit: customer.cuit,
    //             cuil: customer.cuil,
    //             tipoDocumento: customer.tipoDocumento,
    //             dni: customer.numeroDocumento,
    //             direccion: customer.direccion,
    //             telefono: customer.telefono,
    //             email: customer.email,
    //             estado: customer.estado,
    //             role: customer.role,
    //         });
    //         return true;
    //     })
    //     .catch(function (error) {
    //         console.error("Error al guardar el documento: ", error);
    //         return false;
    //     });
    //     return result;
    // }
    
    // deleteCustomer = async (cuil) => {
    //    if (!cuil) throw new Error(`Error: el CUIL es obligatorio`);
    //    let result = this.getCustomerByCUIL(cuil)
    //     .then(() => {
    //         db.collection(collection).doc(cuil).delete();
    //         return true;
    //     })
    //     .catch(function (error) {
    //         console.error("Error al eliminar el documento: ", error);
    //         return false;
    //     });
    //     return result;
    // }
}
export default new ProductRepo();