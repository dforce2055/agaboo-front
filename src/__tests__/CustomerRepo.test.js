/**
 * @Test Class
 * Customer Repo Test
 */
import CustomerRepo from '../repositories/Customer';
import { Customer } from '../models/Customer';

const CustomerTest = new Customer(
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
    true //"estado_test",
);

const customerMock = {
    nombre:expect.any(String),
    apellido: expect.any(String),
    nombre: expect.any(String),
    cuil: expect.any(String),
    cuit: expect.any(String),    
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

test('Metodo getCustomer', async () => {
    //Debería devolver un objeto Json del tipo Customer
    let customer = await CustomerRepo.getCustomer('20-32465169-2');

    expect(typeof customer).toBe('object');
    
    //Comparo el objeto con un objeto del tipo Customer
    expect(customer).toMatchObject(customerMock);
});

test('Metodo getCustomerByCUIL', async () => {
    //Debería devolver un objeto Json del tipo Customer
    let customer = await CustomerRepo.getCustomerByCUIL('20-32465169-2');

    expect(typeof customer).toBe('object');
    
    //Comparo el objeto con un objeto del tipo Customer
    expect(customer).toMatchObject(customerMock);
});

test('Metodo getCustomerByCUIL sin parametro', async () => {
    //Debería devolver un mensaje de error
    //let customer = await CustomerRepo.getCustomerByCUIL();
    //expect(customer).toBe(`Error: el CUIL es obligatorio`);

    let message = false
    try {
        await CustomerRepo.getCustomerByCUIL();
    } catch (e) {
        message = e.message
    }
    //console.log(message);
    expect(message).toBeTruthy()
});

test('Metodo getCustomers', async () => {
    //Debería devolver un array de objetos Json del tipo Customer
    let customers = await CustomerRepo.getCustomers();
    expect(typeof customers).toBe('object');

        // Verifico que me llegue un array de objetos del tipo User
    expect(customers).toEqual(
        expect.arrayContaining([
            customerMock
        ])
    )
});

test('Metodo addCustomer', async () => {
    //Intento agregar un cliente debería devolver true
    let result = await CustomerRepo.addCustomer(CustomerTest);
    expect(result).toBe(true);

    //No le envío ningun parametro
    //Debería devolver un mensaje de error
    let message = false
    try {
        await CustomerRepo.addCustomer();
    } catch (e) {
        message = e.message
    }
    //console.log(message);
    expect(message).toBeTruthy()
});


test('Metodo editCustomer', async () => {
    //Debería devolver true si encuentra el cuil
    //y logra modificar al cliente
    
    let customer = await CustomerRepo.editCustomer('cuil_test', CustomerTest);
    expect(customer).toBe(true);
});

test('Metodo editCustomer sin parametros', async () => {
    //Debería devolver un mensaje de error
    let message = false
    try {
        await CustomerRepo.editCustomer();
    } catch (e) {
        message = e.message
    }
    //console.log(message);
    expect(message).toBeTruthy()
});


test('Metodo deleteCustomer', async () => {
    //Debería devolver true si encuentra el cuil
    //y logra eliminar al cliente
    
    //Creo un customer
    await CustomerRepo.addCustomer(CustomerTest);

    //Lo elimino y evaluo el resultado
    let customer = await CustomerRepo.deleteCustomer('cuil_test');
    expect(customer).toBe(true);
});