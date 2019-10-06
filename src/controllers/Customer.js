/**
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

    async setCustomer(e) {
        try {
            let data = e;
            await CustomerRepo.setCustomer(data);            
        } catch (error) {
            console.log("No se pudo obtener el cliente");
        }
    }

    async getCustomer(e) {
        try {
            await CustomerRepo.getCustomer(e);
            
        } catch (error) {
            console.log("No se pudo obtener el cliente");
        }
    }

    async searchCustomer(e) {
        let valor = e;
        try {
            let cliente = await CustomerRepo.searchCustomer(valor);
            return cliente;
        } catch (error) {
            console.log("No se pudo buscar el cliente.");
        }
    }

    async getCustomerById(e) {
        try {
            console.log("Entro a buscar");
            
            await CustomerRepo.getCustomerById(e);
            
        } catch (error) {
            console.log("No se pudo obtener el cliente");
        }

    }

    async getCustomers() {
        try {
            let clientes = await CustomerRepo.getCustomers();
            if (clientes.length > 0) {
                return clientes;
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

   async deleteCustomer(customer){
        let deleteCustomer = customer;        
        try {
            console.log("Cambiando estado al cliente: ",deleteCustomer.dni);
            let valor = CustomerRepo.deleteCustomer(deleteCustomer);               
            return valor;
        } catch (error) {
            console.error("Error en controller.",error)
        }        
    }


}

export default new CustomerController();