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
    getExistsProduct = async (code) =>{
        let product = null ;
        
        await firebase.db.collection(collection)
            .where('code', '==', code)
            .limit(1)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    product = doc.data();
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                product = null;
            });

        if (product == null) {
            return false;
        }
        return true;
    }
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
            .then(querySnapshot=>{
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
        let product = null ;
        await firebase.db.collection(collection)
            .where('code', '==', code)
            .limit(1)
            .get()
            .then(querySnapshot=>{
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
        //console.log(product);
        return product;
    }

    getProductsByState = async (state) => {
        if (!state) throw new Error(`Error: el estado de producto es obligatorio`);
        let products = [];
        await firebase.db.collection(collection)
            .where('state', '==', state)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    products.push(doc.data());
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
                products = null;
            });
        //console.log(products);
        return products;
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

    getCantProductsByType = async (type) => {
        if (!type) throw new Error(`Error: no se envió el tipo de producto para buscar en Productos`);
        let products = [];
        await firebase.db.collection(collection)
            .where('state', '==', 'DISPONIBLE')
            .where('type', '==', type)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    products.push(doc.data());
                });
            })
            .catch(function (error) {
                console.error("Error getting documents: ", error);
                products = null;
            });
        //console.log(products);

        return products.length;
    };

    //-----------CESAR------
    async cantidad_sin_Alquilar(){
        try {
            let sin_alquilar = []; //Se guardara la cantidad disp. con su tipo de prod

            await firebase.db.collection(collection)
                .where('state', '==', 'DISPONIBLE')
                .get()
                .then(result=>{   
                     sin_alquilar = result.docs.map(doc=>doc.data())
                })       

                const array= [];
                sin_alquilar.reduce(function(res,value) {
                        if (!res[value.type]) { //FILTRO
                            res[value.type] = {type:value.type ,cantidad:0} //Creo el tipo de coleccion de objetos
                            array.push(res[value.type]) //agrego sin alquilar
                        }
                        res[value.type].cantidad++;
                        return res;
                    },{})  
                    
            return array;
        } catch (error) {
            console.error("Error al devolver la cantidad de productos disponibles desde repo.",error);
            
        }
    }


    addProduct = async (newProduct_parameter) => {
        if (!newProduct_parameter) throw new Error(`Error: no se envió un Producto para registrar`);
        //newProduct.localization = new firebase.admin.firestore.GeoPoint(newProduct.localization._lat, newProduct.localization._long);
        //newProduct.creationDate = new firebase.admin.firestore.Timestamp(newProduct.creationDate.seconds, newProduct.creationDate.nanoseconds);
        let newProduct = Object.assign({}, newProduct_parameter);
        //newProduct = JSON.parse(JSON.stringify(newProduct));

        

        let result = await firebase.db.collection(collection)
            .doc(newProduct.code)
            .set(newProduct) //Utilizo Object.assign para mapear el objeto
            .then(() => {
                return true;
            })
            .catch(function (error) {
                console.error("Error al guardar el Producto: ", error);
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
                    .update(Object.assign({}, product));//Utilizo Object.assign para mapear el objeto
                
                    return true;
            })
            .catch(function (error) {
                console.error("Error al editar el producto: ", error);
                return false;
            });
            console.log('Entro por defecto')
        return result;
    }

    deleteProduct = async (code) => {
        if (!code) throw new Error(`Error: el Código de Producto es obligatorio`);
        let result = firebase.db.collection(collection)
            .doc(code)
            .update({ state: 'ELIMINADO' }) //Eliminado Lógico
            .then(() => { return true })
            .catch(function (error) {
                console.error("Error al eliminar el producto: ", error);
                return false;
            });
        return result;
    }
    
    deleteProductREAL = async (code) => {
        if (!code) throw new Error(`Error: el Código de Producto es obligatorio`);
        let result = firebase.db.collection(collection)
            .doc(code)
            .delete() //BORRA REALMENTE DE LA BBDD
            .then(() => { return true })
            .catch(function (error) {
                console.error("Error al eliminar el producto: ", error);
                return false;
            });
        return result;
    }

    editProductoCESAR = async (e) => {
        firebase.db.collection(collection)
        .doc(e.code)
        .get()
        .then(()=>{
            firebase.db.collection(collection)
            .doc(e.code)
            .update({
                state : e.state,
                description : e.description
            })
            .then(console.log("UPDATEE")
            )
        })
    }

    //Se usan en repositories/Order.js
}
export default new ProductRepo();