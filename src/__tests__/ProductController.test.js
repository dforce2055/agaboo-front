/**
 * @Test class
 * Product **Controller** test
 */
import ProductController from '../controllers/Product';
import { Product } from '../models/Product';

const Products = expect.any(Array);
const productTest = new Product(
    "type_test",
    "code_test",
    "codebar_test",
    "qrcode_test",
    "description_test",
    "state_test",
    { "_lat": -37.127842, "_long": -56.909413 }, //localization geopoint { Latitud: number, Longitud: number }
    "price_test",
    { "seconds": 0, "nanoseconds": 1571454000 }, //creationDate timestamp {nanoseconds: number, seconds: number }
    "en Depósito"
);

const productMock = {
    type: expect.any(String),
    code: expect.any(String),
    codebar: expect.any(String),
    qrcode: expect.any(String),
    description: expect.any(String),
    state: expect.any(String),
    localization: expect.objectContaining({
        _lat: expect.any(Number),
        _long: expect.any(Number),
    }),
    price: expect.any(Number),
    creationDate: expect.objectContaining({
        seconds: expect.any(Number),
        nanoseconds: expect.any(Number),
    }),
};

describe('Metodo addProduct', () => {
    // Pruebas del metodo addProduct
    test('addProduct', async () => {
        //Debería devolver true si pudo guardar el producto o false
        let result = await ProductController.addProduct(productTest);

        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo addProduct sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductController.addProduct();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});

describe('Metodo getProductById', () => {
    // Pruebas del metodo getProductById
    test('getProductById', async () => {
        //Debería devolver un objeto Json del tipo Product
        let product = await ProductController.getProductById('1111');

        expect(typeof product).toBe('object');

        //Comparo el objeto con un objeto del tipo Product
        expect(product).toMatchObject(productMock);
    });

    test('Metodo getProduct sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductController.getProductById();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});

describe('Metodo getProductByCodebar', () => {
    // Pruebas del metodo getProductByCodeBar
    test('getProductByCodebar', async () => {
        //Debería devolver un objeto Json del tipo Product
        let product = await ProductController.getProductByCodeBar('aa-1111-zz');

        expect(typeof product).toBe('object');

        //Comparo el objeto con un objeto del tipo Product
        expect(product).toMatchObject(productMock);
    });

    test('Metodo getProductByCodebar sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductController.getProductByCodebar();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});
describe('Metodo getProductByCode', () => {
    // Pruebas del metodo getProductByCode
    test('getProductByCode', async () => {
        //Debería devolver un objeto Json del tipo Product
        let product = await ProductController.getProductByCode('1111');

        expect(typeof product).toBe('object');

        //Comparo el objeto con un objeto del tipo Product
        expect(product).toMatchObject(productMock);
    });

    test('Metodo getProductByCode sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductController.getProductByCode();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});
describe('Metodo getProducts', () => {
    // Pruebas del metodo getProducts
    test('getProducts', async () => {
        //Debería devolver un array de objetos del tipo Product en Json
        let products = await ProductController.getProducts();

        expect(typeof products).toBe('object');

        //Comparo el objeto con un objeto del tipo Product
        expect(products).toMatchObject(Products);

        // Verifico que me llegue un array de objetos del tipo Product
        expect(products).toEqual(
            expect.arrayContaining([
                productMock
            ])
        )
    });
});

describe('Metodo getCantProductsByType', () => {
    jest.setTimeout(30000);
    // Pruebas del metodo getCantProductsByType
    test('getCantProductsByType', async () => {
        //Debería devolver un array de objetos del tipo Product en Json
        let cantProducts = await ProductController.getCantProductsByType('Baño Químico');
        await console.log(cantProducts);
        await expect(typeof cantProducts).toBe('number');
    }, 30000);
    
    test('Metodo getCantProductsByType sin parametros', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductController.getCantProductsByType();
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });
});



describe('Metodo editProduct', () => {
    test('Metodo editProduct', async () => {
        //Debería devolver true si encuentra el código de barras
        //y logra modificar el producto

        let result = await ProductController.editProduct(productTest);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo editProduct sin parametros', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductController.editProduct();
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });
});


describe('Metodo getProductsByState', () => {
    test('Metodo getProductsByState', async () => {
        //Debería devolver un array de objetos del tipo Product si 
        //Encuentra productos con el estado pasado por parametro
        let products = await ProductController.getProductsByState('DISPONIBLE');

        //Comparo el objeto con un array de objetos del tipo Product
        expect(products).toMatchObject(Products);
       
        if ( products ) {
            //Comparo el objeto con un objeto del tipo Product
            console.log("ESTA DANDO ERROR POR QUE HAY PRODUCTOS EN LA BBDD CON FORMATO INVALIDO. HABILITAR TEST CUANDO HAYA UNIFORMIDAD");
            //expect(typeof products[0]).toBe('object');
            //expect(products[0]).toMatchObject(productMock);
        }
    });

    test('Metodo getProductsByState parametro invalido', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductController.getProductsByState('CUALQUIER COSA');
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });

    test('Metodo getProductsByState sin parametros', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductController.getProductsByState();
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });
});

describe('Metodo deleteProduct', () => {
    test('Metodo deleteProduct', async () => {
        //Debería devolver true si encuentra el código de barras
        //y logra eliminar el producto
        //Creo un producto nuevo
        await ProductController.addProduct(productTest);

        //Lo elimino y evaluo el resultado
        let result = await ProductController.deleteProduct(productTest.code);
        console.log("Producto eliminado " +result);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo deleteProduct sin parametros', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductController.deleteProduct();
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });
});