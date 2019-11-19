/**
 * @Test Class
 * Order **Controller** Test
 */

 import ServiceController from '../controllers/Service.js'


describe('Metodo getServices', () => {
    test('getServices', async () => {
        let service = await ServiceController.getServices();
        console.log(service);
         expect(Array.isArray(['value'])).toBe(true);
    });
});

describe('Metodo getServiceById', () => {
    test('getServiceById', async () => {
        let service = await ServiceController.getServiceById('1');
        console.log(service);
        expect(typeof service).toBe('object')
        //expect(Object.is(received, expected)).toBe(true)
    });
});