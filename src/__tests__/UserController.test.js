/**
 * @Test Class
 * User Controller Test
 */
import UserController  from '../controllers/User';
import { User } from '../models/User';

const Users = expect.any(Array);
const userTest = new User(
    "apellido_test",
    "nombre_test",
    "cuit_test",
    "cuil_test",
    "tipoDocumento_test",
    "numeroDocumento_test",
    "direccion_test",
    "telefono_test",
    "email_test",
    "estado_test",
    "role_test"
);

const userMock = {
    apellido: expect.any(String),
    nombre: expect.any(String),
    cuit: expect.any(String),
    cuil: expect.any(String),
    tipoDocumento: expect.any(String),
    numeroDocumento: expect.any(String),
    direccion: expect.any(String),
    telefono: expect.any(String),
    email: expect.any(String),
    estado: expect.any(String),
    role: expect.any(String)

};

const userDTOMock = {
    estado: expect.any(String),
    role: expect.any(String)
}

describe('Metodo getUserStatus', () => {
    // Pruebas del metodo getUserStatus
    test('getUserStatus', async () => {
        //Debería devolver un objeto Json del tipo UserDTO
        let userDTO = await UserController.getUserStatus('dperez2055@gmail.com');

        expect(typeof userDTO).toBe('object');

        //Comparo el objeto con un objeto del tipo user
        expect(userDTO).toMatchObject(userDTOMock);
    });

    test('Metodo getUserStatus sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserController.getUserStatus();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});