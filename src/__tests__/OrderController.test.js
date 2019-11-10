/**
 * @Test Class
 * Order **Controller** Test
 */
import OrderController  from '../controllers/Order';


describe('Metodo getOrdersNow', () => {
    // Pruebas del metodo getOrdersNow
    test('getOrdersNow', async () => {
        //Debería devolver un array de objetos del tipo User en Json
        let orders = await OrderController.getOrdersNow();
        
        console.log("Pedidos buscados")
        console.log(orders);
        //expect(typeof orders).toBe('object');

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
