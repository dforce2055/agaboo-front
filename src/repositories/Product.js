/**
 * @Repository
 * Product **Repository** Class
 */

import { Component } from 'react';
import firebase from '../config/firebase';
import { Product } from '../models/Product';
const collection = 'products';

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
    //         let cliente = await firebase.db.collection(collection).doc(id).get();
    //         //console.log(cliente.data());
    //         return cliente.data();
    //         //let cliente = await firebase.db.collection(collection)
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

    getProduct = async (id) => {
        if (!id) throw new Error(`Error: el id es obligatorio`);
        try {
            let query = await firebase.db.collection(collection).doc(id).get();
            let result = query.data();
            let product = new Product();
            //Mapeo los resultados en el Product:product
            product = Object.assign({}, result);
            //console.log(product);
            return product;
        } catch (error) {
            throw new Error();
        }
    }

    getProductByCodebar = async (codebar) => {
        if (!codebar) throw new Error(`Error: el código de barras es obligatorio`);
        let product = {};
        await firebase.db.collection(collection)
            .where('codebar', '==', codebar)
            .limit(1)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    product = doc.data();
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                product = null;
            });

        return product;
    }

    getProductByCode = async (code) => {
        if (!code) throw new Error(`Error: el código de producto es obligatorio`);
        let product = {};
        await firebase.db.collection(collection)
            .where('code', '==', code)
            .limit(1)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    product = doc.data();
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                product = null;
            });

        return product;
    }

    getProducts = async (res) => {
        try {
            let coleccion = await firebase.db.collection(collection).get();
            let products = coleccion.docs.map(doc => doc.data());
            return products;
        } catch (error) {
            throw new Error();
        }
    };

    addProduct = async (newProduct) => {
        if (!newProduct) throw new Error(`Error: no se envió un Producto para registrar`);
        let result = await firebase.db.collection(collection)
            .doc(newProduct.code)
            .set(Object.assign({}, newProduct)) //Utilizo Object.assign para mapear el objeto
            .then(() => {
                console.log("Producto guardado exitosamente!");
                return true;
            })
            .catch(function (error) {
                console.error("Error al guardar el Prodcto: ", error);
                return false;
            });
        // Retorna True o False
        return result;
    }

    editProduct = async (code, product) => {
        if (!code) throw new Error(`Error: el Código de Producto es obligatorio`);
        if (!product) throw new Error(`Error: el Producto es obligatorio para poder editarlo`);
        let result = this.getProductByCode(code)
            .then(() => {
                firebase.db.collection(collection).doc(code)
                    .update(Object.assign({}, product));
                
                    return true;
            })
            .catch(function (error) {
                console.error("Error al editar el producto: ", error);
                return false;
            });
        return result;
    }

    deleteProduct = async (code) => {
        if (!code) throw new Error(`Error: el Código de Producto es obligatorio`);
        let result = this.getProductByCode(code)
            .then(() => {
                firebase.db.collection(collection).doc(code).delete();
                return true;
            })
            .catch(function (error) {
                console.error("Error al eliminar el producto: ", error);
                return false;
            });
        return result;
    }
}
export default new ProductRepo();