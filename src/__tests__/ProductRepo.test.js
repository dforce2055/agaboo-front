/**
 * @Test class
 * Product **Repo** test
 */
import ProductRepo from '../repositories/Product';
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

describe('Metodo getProduct', () => {
    // Pruebas del metodo getProduct
    test('getProduct', async () => {
        //Debería devolver un objeto Json del tipo Product
        let product = await ProductRepo.getProduct('1111');

        expect(typeof product).toBe('object');

        //Comparo el objeto con un objeto del tipo Product
        expect(product).toMatchObject(productMock);
    });

    test('Metodo getProduct sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductRepo.getProduct();
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
        let product = await ProductRepo.getProductByCodebar('aa-1111-zz');

        expect(typeof product).toBe('object');

        //Comparo el objeto con un objeto del tipo Product
        expect(product).toMatchObject(productMock);
    });

    test('Metodo getProductByCodebar sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductRepo.getProductByCodebar();
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
        let product = await ProductRepo.getProductByCode('1111');

        expect(typeof product).toBe('object');

        //Comparo el objeto con un objeto del tipo Product
        expect(product).toMatchObject(productMock);
    });

    test('Metodo getProductByCode sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductRepo.getProductByCode();
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
        let products = await ProductRepo.getProducts();

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

describe('Metodo addProduct', () => {
    // Pruebas del metodo addProduct
    test('addProduct', async () => {
        //Debería devolver true si pudo guardar el producto o false
        let result = await ProductRepo.addProduct(productTest);

        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo addProduct sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductRepo.addProduct();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});


describe('Metodo editProduct', () => {
    test('Metodo editProduct', async () => {
        //Debería devolver true si encuentra el código de barras
        //y logra modificar el producto

        let result = await ProductRepo.editProduct('code_test', productTest);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo editProduct sin parametros', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductRepo.editProduct();
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });
    test('Metodo editProduct sin codigo de barras', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductRepo.editProduct(productTest);
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });
    test('Metodo editProduct sin producto', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductRepo.editProduct("code_test");
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
        await ProductRepo.addProduct(productTest);

        //Lo elimino y evaluo el resultado
        let result = await ProductRepo.deleteProduct(productTest.code);
        console.log("Eliminado " + result);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo deleteProductREAL', async () => {
        //Finalmente elimino el producto test realmente de la BBDD
        let result = await ProductRepo.deleteProductREAL(productTest.code);
        console.log("Producto eliminado " + result);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo deleteProduct sin parametros', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await ProductRepo.deleteProduct();
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });
});