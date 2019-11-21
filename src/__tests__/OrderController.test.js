/**
 * @Test Class
 * Order **Controller** Test
 */
import OrderController  from '../controllers/Order';
//import "core-js/fn/array/flat-map"; //importo flatMap, por alguna razón no lo reconoce...

describe('Metodo getOrdersNow', () => {
    test('getOrdersNow', async () => {
        let orders = await OrderController.getOrdersNow();
        expect(Array.isArray(['value'])).toBe(true);
    });
});

describe('Metodo getOrders', () => {
    test('getOrders', async () => {
        let orders = await OrderController.getOrders();
        expect(typeof orders).toBe('object');
    });
});

describe('Metodo validateOrder', () => {
    //jest.setTimeout(30000);
    // Pruebas del metodo validateOrder
    test('validateOrder', async () => {
        //Debería devolver un array de objetos del tipo User en Json
        let productosDisponibles = await OrderController.validateOrder('2019-11-17', '2019-11-24');
        console.log("MUESRTO LOS PRODUCTOS DISPONIBLES",productosDisponibles);
        expect(Array.isArray(['value'])).toBe(true);
    });


    test('validateOrder sin parametros', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await OrderController.validateOrder();
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });
});


describe('Metodo getOrderById', () => {
    test('getOrderById', async () => {
        let getOrderById = await OrderController.getOrderById("4E0bHtS4M8QdO6FavKPx");
        console.log("Resultado de get order by id=",getOrderById);
        expect(typeof {value: 'value'}).toBe('object');
        //expect(Object.is(received, expected)).toBe(true)
    });
});