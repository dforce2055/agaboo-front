/**
 * Customer Controller
 */
import { Component } from 'react';
import CustomerRepo from '.././repositories/Customer';

class CustomerController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {

            },

        }
    }

    async getCustomer() {
        try {
            await CustomerRepo.getCustomer();
            
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

    async addCustomer(data) {

        //Recibo y guardo los datos recibidos
        let newCustomer = data

            console.log('entro a guardar cliente')
            CustomerRepo.addCustomer(newCustomer)
    }

}
export default new CustomerController();