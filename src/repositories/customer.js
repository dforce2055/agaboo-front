/**
 * Repo de Cliente
 */
import { Component } from 'react';
import { db } from '../config/firebase';
const collection = 'customers';

class CustomerRepo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {

            },

        }
    }

    getCustomer = async () => {
        try {
            let cliente = await db.collection("customers").doc('diego').get();
            return cliente.data();
        } catch (error) {
            throw new Error();
        }

    }

    getCustomers = async (res) => {
        try {
            let clientes = await db.collection("customers").get();
            let data = clientes.docs.map(doc => doc.data());
            return data;
        } catch (error) {
            throw new Error();
        }
    };

    addCustomer = async (newCustomer) => {
        try {
            //db.collection("customers").doc("LC").add(newCustomer);
            let customer = db.collection(collection).doc(newCustomer.nic).set({
                nic: newCustomer.nic,
                apellido: newCustomer.apellido,
                nombre: newCustomer.nombre,
                dni: newCustomer.dni
            });

            if (!customer) {
                throw new Error("El documento no se agrego");
            } else {
                return true;
            }

        } catch (error) {
            throw new Error(error);
        }
    }
}
export default new CustomerRepo();