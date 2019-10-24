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
        if (!code) return 1 ;//throw new Error(`Error: el Código de producto es obligatorio`);
        try {
            let product = await ProductRepo.getProductByCode(code);
            if ( product ) {
                console.log('Entro en producto != null');
                return product
            } else {
                console.log(`El code: ${ code } de Producto no se encuentra`);
                return 1;
            }
        } catch(error) {
            throw new Error();
        }

    }

    getProducts = async () => {
        try {
            let products  = await ProductRepo.getProducts();
            if ( products ) {
                console.log('products : ', products)
                return products;
            } else {
                console.log("No se pudo obtener los productos");
            }
        } catch (error) {
            throw new Error();
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
            product = Object.assign({}, product); //Utilizo Object.assign para mapear el objeto
            let productFound = await ProductRepo.getProductByCode(product.code);
            let result = ProductRepo.editProduct(product.code, product);
            if (result) {
                console.log(`Se editó correctamente el producto`, product);
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
