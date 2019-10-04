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

    async getCustomer(e) {
        try {
            await CustomerRepo.getCustomer(e);
            
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

   async deleteCustomer(DNI){
        let dni = DNI;        
        try {
            console.log("Estoy pasando el dni ' "+dni+" ' a repositorio.");
            CustomerRepo.deleteCustomer(dni);            
        } catch (error) {
            console.error("Error en controller.",error)
        }        
    }


}

export default new CustomerController();