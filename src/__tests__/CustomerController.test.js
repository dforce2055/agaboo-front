/**
 * @Test Class
 */
import CustomerController from '../controllers/Customer';
import {Customer} from '../models/Customer';

const cliente = Customer;

test('un test', () => {
    expect(true).toBeTruthy();
});

/*test('Metodo getCustomer', async () => {
    //Debería devolver un objeto Json Customer
    let Customer = await CustomerController.getCustomer();
    expect(typeof Customer).toBe('object');    
});


test('Metodo getCustomer', async () => {
    //Debería devolver un objeto Json del estilo Customer
    let Customer = await CustomerController.getCustomer();
    expect(Customer).toMatchObject(cliente);
});

test('Metodo getCustomers', async () => {
    //Debería devolver un array de objetos Jsond el estilo Customer 
    let Customer = await CustomerController.getCustomers();
    expect(typeof Customer).toBe('Array');
});*/
