/**
 * Customer Controller
 */
import { Component } from 'react';
import CustomerRepo from '../repositories/Customer';
import { Customer } from '../models/Customer';

class CustomerController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {

            },

        }
    }

    getCustomers = async () => {
        try {
            let customers = await CustomerRepo.getCustomers();
            if (customers) {
                return customers;
            } else {
                console.log("No se pudieron obtener los clientes");
            }
        } catch (error) {
            throw new Error();
        }
    }

    async getCustomerById(id) {
        if (!id) throw new Error(`Error: el ID es obligatorio`);
        try {
            let result = await CustomerRepo.getCustomer(id);
            let customer = new Customer();
            //Mapeo los resultados en el Customer:customer
            customer = Object.assign({}, result);
            if ( customer ) {
                return customer;
            } else {
                console.log(`No se encontro al cliente id: ${ id }`);
            }

        } catch (error) {
            throw new Error();
        }

    }

    async getCustomerByEmail(email) {
        if (!email) throw new Error(`Error: el Email es obligatorio`);
        try {
            let result = await CustomerRepo.getCustomerByEmail(email);
            let customer = new Customer();
            //Mapeo los resultados en el Customer:customer
            customer = Object.assign({}, result);
            if (customer) {
                return customer;
            } else {
                console.log(`No se encontro al cliente con email: ${email}`);
            }

        } catch (error) {
            throw new Error();
        }
    }

    async getCustomerByName(name) {
        /* Busco por nombre, obtengo un array de objetos Customer */
        if (!name) throw new Error(`Error: el Nombre es obligatorio`);
        try {
            let result = await CustomerRepo.getCustomerByName(name);
            let customers = new Customer([]);
            //Mapeo los resultados en el Array de Objetos Customer:customer
            customers = Object.assign([{}], result);
            console.log(customers);
            if (customers) {
                return customers;
            } else {
                console.log(`No se encontro al cliente con nombre: ${name}`);
            }

        } catch (error) {
            throw new Error();
        }
    }

    //Se utiliza en ModulsUserAdmin\Delete-update-list\Search\buttonSearch.js
    async searchCustomer(e) {
        let valor = e;
        try {
            let cliente = await CustomerRepo.searchCustomer(valor);
            return cliente;
        } catch (error) {
            console.log("No se pudo buscar el cliente.");
        }
    }

    //MODIFICADO Y USANDO
    async editCustomer(e) {
        try {
            let data = e;
            await CustomerRepo.editCustomer(data);            
        } catch (error) {
            console.log("No se pudo obtener el cliente");
        }
    }

    //NO VA ACA!!
    addCustomerOK = async (data) => {
        if (!data) throw new Error(`Error: no se envió un Cliente para registrar`);

        try {
            let newCustomer = new Customer();
            newCustomer = Object.assign({}, data); //Utilizo Object.assign para mapear el objeto
            const result = await CustomerRepo.addCustomerOK(newCustomer);
            if (result) {
                console.log(`Se agrego un nuevo Cliente ${newCustomer} `);
                return true;
            } else {
                console.log(`No se pudo agregar el Cliente ${newCustomer}`);
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    async addCustomer(data) {
        let newCustomer = data;
            console.log('entro a guardar cliente')
            CustomerRepo.addCustomer(newCustomer)
    }

   async deleteCustomer(id){
        let deleteCustomer = id;        
        try {
            console.log("Cambiando estado al cliente: ",deleteCustomer);
            let valor = CustomerRepo.deleteCustomer(deleteCustomer);               
            return valor;
        } catch (error) {
            console.error("Error en controller.",error)
        }        
    }

    async getCustomerCant10(e){
        try {
            let valor = CustomerRepo.getCustomerCant10(e);
            console.log("Muestro valor en controllers:",valor);
            
            //return valor;            
        } catch (error) {
            console.error("Error en controller: ",error);
            
        }
    }
}

export default new CustomerController();