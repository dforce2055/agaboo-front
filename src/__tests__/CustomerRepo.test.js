/**
 * @Test Class
 * Customer Repo Test
 */
import CustomerRepo from '../repositories/Customer';
import { Customer } from '../models/Customer';

const Customers = expect.any(Array);

const customerTest = new Customer(
    "nombre_test",
    "apellido_test",
    "cuit_test",
    "cuil_test",   
    "tipoDocumento_test",
    "numeroDocumento_test",
    { "seconds": 0, "nanoseconds": 1571454000 }, //fechaNac timestamp {nanoseconds: number, seconds: number }
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
    _search:expect.any(String),
    lastUpdate: expect.objectContaining({
        seconds: expect.any(Number),
        nanoseconds: expect.any(Number),
    }),
    apellido: expect.any(String),
    nombre: expect.any(String),
    cuil: expect.any(String),
    cuit: expect.any(String),    
    tipoDocumento: expect.any(String),
    numeroDocumento: expect.any(String),
    fechNac: expect.objectContaining({
        seconds: expect.any(Number),
        nanoseconds: expect.any(Number),
    }),
    direccion: expect.any(String),
    calle: expect.any(String),
    altura: expect.any(String),
    localidad: expect.any(String),
    celular: expect.any(String),
    telefono: expect.any(String),
    email: expect.any(String),
    estado: expect.any(Boolean),
};

test('Metodo getCustomers', async () => {
    //Debería devolver un array de objetos Json del tipo Customer
    let customers = await CustomerRepo.getCustomers();
    
    expect(typeof customers).toBe('object');
    //Comparo el objeto con un objeto del tipo Product
    expect(customers).toMatchObject(Customers);

    // Verifico que me llegue un array de objetos del tipo Customer
    
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



describe('Metodo deleteCustomer', () => {
    test('Metodo deleteCustomer', async () => {
        let result = await CustomerRepo.deleteCustomer('prueba');
        console.log("Eliminado " + result);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });
});
