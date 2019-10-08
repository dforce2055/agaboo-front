/**
 * @Test Class
 * Customer **Repo** Test
 */
import CustomerController from '../controllers/Customer';
import {Customer} from '../models/Customer';

const Customers = expect.any(Array);
const customerTest = new Customer(
    "nombre_test",
    "apellido_test",
    "cuit_test",
    "cuil_test",
    "tipoDocumento_test",
    "numeroDocumento_test",
    "fechNac_test",
    "direccion_test",
    "calle_test",
    "altura_test",
    "localidad_test",
    "celular_test",
    "telefono_test",
    "email_test",
    true,//estado

);

const customerMock = {
    nombre: expect.any(String),
    apellido: expect.any(String),
    cuit: expect.any(String),
    cuil: expect.any(String),
    tipoDocumento: expect.any(String),
    numeroDocumento: expect.any(String),
    fechNac: expect.any(Object),
    direccion: expect.any(String),
    calle: expect.any(String),
    altura: expect.any(String),
    localidad: expect.any(String),
    celular: expect.any(String),
    telefono: expect.any(String),
    email: expect.any(String),
    estado: expect.any(Boolean),
};

describe('Metodo getCustomers', () => {
    // Pruebas del metodo getCustomers
    test('getCustomers', async () => {
        //Debería devolver un objeto Json del tipo Customer
        let customer = await CustomerController.getCustomers();

        expect(typeof customer).toBe('object');

        //Comparo el objeto con un objeto del tipo Customer
        expect(customer).toMatchObject(Customers);
    });
});

describe('Metodo getCustomerById', () => {
    // Pruebas del metodo getCustomerById
    test('getCustomerById', async () => {
        //Debería devolver un objeto Json del tipo Customer
        let customer = await CustomerController.getCustomerById('4129628781');

        expect(typeof customer).toBe('object');

        //Comparo el objeto con un objeto del tipo Customer
        expect(customer).toMatchObject(customerMock);
    });

    test('Metodo getCustomerById sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await CustomerController.getCustomerById();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});
describe('Metodo getCustomerByEmail', () => {
    // Pruebas del metodo getCustomerByEmail
    test('getCustomerByEmail', async () => {
        //Debería devolver un objeto Json del tipo Customer
        let customer = await CustomerController.getCustomerByEmail('cesarsito@hotmail.com.ar');

        expect(typeof customer).toBe('object');

        //Comparo el objeto con un objeto del tipo Customer
        expect(customer).toMatchObject(customerMock);
    });

    test('Metodo getCustomerByEmail sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await CustomerController.getCustomerByEmail();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});

describe('Metodo getCustomerByName', () => {
    // Pruebas del metodo getCustomerByName
    test('getCustomerByName', async () => {
        //Debería devolver un objeto Json del tipo Customer
        let customer = await CustomerController.getCustomerByName('GUILLERMO');

        expect(typeof customer).toBe('object');

        //Comparo el objeto con un objeto del tipo Customer
        expect(customer).toMatchObject(Customers);
    });

    test('Metodo getCustomerByName sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await CustomerController.getCustomerByName();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});