/**
 * @Controller
 * Product **Controller** Class
 */

import { Component } from 'react';
import ProductRepo from '../repositories/Product';
import { Product } from '../models/Product';

class ProductController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {

            },

        }
    }

    getExistsProduct (code){
        try {
            return ProductRepo.getExistsProduct(code);
        } catch (error) {
            console.log("Error el producto ingresado no es reconocido.");
            
        }
    }

    getProductById = async (id) => {
        if (!id) throw new Error(`Error: el id es obligatorio`);
        try {
            let product = await ProductRepo.getProduct(id);
            if ( product ) {
                return product
            } else {
                console.log(`El producto id: ${ id } no se encuentra`);
            }
        } catch(error) {
            throw new Error();
        }

    }
    getProductByCodeBar = async (codebar) => {
        if (!codebar) throw new Error(`Error: el Código de Barras es obligatorio`);
        try {
            let product = await ProductRepo.getProductByCodebar(codebar);
            if ( product ) {
                return product
            } else {
                console.log(`El Producto con el Código de Barras: ${ codebar } no se encuentra`);
            }
        } catch(error) {
            throw new Error();
        }

    }
    getProductByCode = async (code) => {
        if (!code || code === -1 ) { // No se porque la función se llama dos veces, pero así funciona
            console.log("Entro en el if de getProduct : " , code);
            return -1 }
        else{
            try {
                let product = await ProductRepo.getProductByCode(code);
                if ( product ) {
                    return product
                } else {
                    console.log(`El code: ${ code } de Producto no se encuentra`);
                    return 1;
                }
            } catch(error) {
                throw new Error();
            }
        }
        

    }

    getProducts = async () => {
        try {
            let products  = await ProductRepo.getProducts();
            if ( products ) {
                return products;
            } else {
                console.log("No se pudo obtener los productos");
            }
        } catch (error) {
            throw new Error();
        }

    }

    cantidad_sin_Alquilar = () =>{
        try {            
            return ProductRepo.cantidad_sin_Alquilar();
        } catch (error) {
            console.error("Error en el controlador de productos al devolver la cantidad de productos.");
            
        }
    }

    getCantProductsByType = async (type) => {
        if (!type) throw new Error(`Error: no se envió el tipo de producto para buscar en Productos`);

        try {
            let cantProducts = await ProductRepo.getCantProductsByType(type);
            if ( cantProducts ) {
                //console.log('Cantidad de Productos del tipo ', type +" : " +cantProducts);
                return cantProducts;
            } else {
                console.error('No se pudo obtener la cantidad productos del tipo ', type );
            }
        } catch (error) {
           console.error(error);
        }

    }

    getProductsByState = async (state) => {       
        if (!state) throw new Error(`Error: no se envió el estado para buscar Productos`);
        
        let STATES = ['ALQUILADO', 'DISPONIBLE', 'EN MANTENIMIENTO', 'EN TRANSITO', 'ELIMINADO'];
        let validState = STATES.includes(state.toUpperCase());
        
        if (!validState) throw new Error(`Error: El estado enviado ${ state } no es valido. Estados Válidos ${ STATES }`);

        try {
            let products = await ProductRepo.getProductsByState(state);
            if ( products ) {
                return products;
            } else {
                console.log("No se pudo obtener los productos");
            }
        } catch (error) {
            throw new Error();
        }

    }

    getTypesOfProducts = async () => {
        try {
            let typesOfProducts = await ProductRepo.getTypesOfProducts();
            if (typesOfProducts) {
                return [...new Set(typesOfProducts )];
            } else {
                console.log("No se pudo obtener los productos");
            }
        } catch (error) {
            console.error(error);
        }
    }

    addProduct = async (data) => {
        if (!data) throw new Error(`Error: no se envió un Producto para registrar`);
        
        try {
            let newProduct = new Product();
            newProduct = Object.assign({}, data); //Utilizo Object.assign para mapear el objeto
            const result = await ProductRepo.addProduct(newProduct);
            if (result) {
                console.log(`Se agrego un nuevo producto ${ newProduct } `);
                return true;
            } else {
                console.log(`No se pudo agregar el producto ${ newProduct }`);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    editProduct = async (product) => {
        if (!product) throw new Error(`Error: no se envió un Producto para editar`);

        try {
            let productObj = Object.assign({}, product); //Utilizo Object.assign para mapear el objeto
            await ProductRepo.getProductByCode(productObj.code);
            let result = ProductRepo.editProduct(productObj.code, product);
            if (result) {
                console.log(`Se editó correctamente el producto`, productObj);
                return true;
            } else {
                console.log(`No se pudó editar el producto ${ product } `);
                return false;
            }

        } catch (error) {
            console.log(error);
        }
        
    }

    deleteProduct = async (code) => {
        if (!code) throw new Error(`Error: el código es obligatorio`);

        try {
            let result = ProductRepo.deleteProduct(code);
            
            if ( result ) {
                console.log(`Se borró correctamente el producto con código: ${ code } `);
                return true;
            } else {
                console.log(`No se pudó eliminar el producto código: ${ code }`)
                return false;
            }

        } catch (error) {
            console.log(error);
        }
    }

}
export default new ProductController();
