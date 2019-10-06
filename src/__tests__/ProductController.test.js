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
    "localization_test",
    "price_test",
    "fechaAlta_test",
);

const productMock = {
    type: expect.any(String),
    code: expect.any(String),
    codebar: expect.any(String),
    qrcode: expect.any(String),
    description: expect.any(String),
    state: expect.any(String),
    localization: expect.any(Object),
    price: expect.any(Number),
    fechaAlta: expect.any(Object),
};

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
            await ProductController.getProductByCodeBar();
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
describe('Metodo deleteProduct', () => {
    test('Metodo deleteProduct', async () => {
        //Debería devolver true si encuentra el código de barras
        //y logra eliminar el producto
        //Creo un producto nuevo
        await ProductController.addProduct(productTest);

        //Lo elimino y evaluo el resultado
        let result = await ProductController.deleteProduct(productTest.code);
        
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