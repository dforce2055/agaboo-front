import { Component } from 'react';
import ProductRepo from '../repositories/Product';


class ProductController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {

            },

        }
    }



    async getProduct() {
        try {
            let product  = await ProductRepo.getCustomer();
            if (product) {
                //console.log(cliente);
                return product;
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("No se pudo obtener el cliente");
        }

    }

    async getCustomers() {
        try {
            let clientes = await CustomerRepo.getCustomers();
            if (clientes.length > 0) {
                console.log(clientes);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("No se pudo obtener los clientes");
        }
    }

    async addProduct() {

        let Product = {
            code: "1234",
            typeProdcut: "typeProduct",
            nombre: "Nombre",
            dni: "123123123"
        }

        try {
            CustomerRepo.addCustomer(newCustomer);
            if (true) {
                console.log("Se agrego un nuevo cliente");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("No se pudo agregar el cliente");
        }
    }

}
export default new ProductController();
