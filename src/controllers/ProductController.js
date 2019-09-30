import { Component } from 'react';
import ProductRepo from '../repositories/ProductRepo';


class ProductController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {

            },

        }
    }



    async getProducts() {
        try {
            let products  = await ProductRepo.getProducts();
            //console.log('largo de array: ' , products.l)
            if (products.length > 0) {
                return products;
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("No se pudo obtener los productos", error);
        }

    }



    async addProduct(product) {

        let newProduct = product
        try {
            const indicador = ProductRepo.addProduct(newProduct);
            if (indicador) {
                console.log("Se agrego un nuevo producto", product);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
        }
    }

}
export default new ProductController();
