/**
 * @Test Class
 * Product Class
 */
import { Product } from '../../models/Product';
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



test('un test', () => {
    //productTest.type = "NAME";
    console.log(productTest);
    console.log(`Fecha de creación ${ productTest.getCreationDateFormated() }`);
    console.log(`Ubicación actual ${ productTest.getCurrentAddress() }`);
    expect(true).toBeTruthy();
});
