/**
 * @Test Class
 * Order **Controller** Test
 */
import OrderController  from '../controllers/Order';
import "core-js/fn/array/flat-map"; //importo flatMap, por alguna razón no lo reconoce...

describe('Metodo getOrdersNow', () => {
    // Pruebas del metodo getOrdersNow
    test('getOrdersNow', async () => {
        //Debería devolver un array de objetos del tipo User en Json
        let orders = await OrderController.getOrdersNow();
        
        console.log("Pedidos buscados")
        console.log(orders);
        expect(typeof orders).toBe('object');
        console.error('#######VARIABLES DE ENTORNO#########')
        console.error(process.env.NODE_ENV)
        console.error(process.env.FIREBASE_CONFIG)
        //Comparo el objeto con un objeto del tipo User
        //expect(orders).toMatchObject(orders);

        // Verifico que me llegue un array de objetos del tipo User
        // que al menos un Objeto contenga un campo role: 'ADMIN'
    /*
        expect(orders).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    eliminado: false
                })
            ])
        )
        */
    });
});

describe('Metodo validateOrder', () => {
    jest.setTimeout(30000);
    // Pruebas del metodo validateOrder
    test('validateOrder', async () => {
        //Debería devolver un array de objetos del tipo User en Json
        let productosDisponibles = await OrderController.validateOrder('2019-11-17', '2019-11-24');

        console.log("Productos Disponibles")
        console.log(productosDisponibles);
        expect(typeof productosDisponibles).toBe('object');
    }, 30000);


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
