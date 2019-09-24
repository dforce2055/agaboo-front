/**
 * @Controller Class
 * Customer Controller
 */
import { Component } from 'react';
import CustomerRepo from '../repositories/Customer';

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
            let cliente = await CustomerRepo.getCustomer();
            if (cliente) {
                //console.log(cliente);
                return cliente;
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

    async addCustomer() {

        let newCustomer = {
            nic: "NicName",
            apellido: "Apellido",
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
export default new CustomerController();