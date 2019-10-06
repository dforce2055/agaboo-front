/**
 * @Test Class
 * User **Controller** Test
 */
import UserController  from '../controllers/User';
import { User } from '../models/User';

const Users = expect.any(Array);
const userTest = new User(
    "nombre_test",
    "apellido_test",
    "cuit_test",
    "cuil_test",
    "tipoDocumento_test",
    "numeroDocumento_test",
    "fechNac_test",
    "direccion_test",
    "calle_test",
    "altura_test",
    "localidad_test",
    "celular_test",
    "telefono_test",
    "email_test",
    true,//estado
    "role_test"
);

const userMock = {
    nombre: expect.any(String),
    apellido: expect.any(String),
    cuit: expect.any(String),
    cuil: expect.any(String),
    tipoDocumento: expect.any(String),
    numeroDocumento: expect.any(String),
    fechNac: expect.any(Object),
    direccion: expect.any(String),
    calle: expect.any(String),
    altura: expect.any(String),
    localidad: expect.any(String),
    celular: expect.any(String),
    telefono: expect.any(String),
    email: expect.any(String),
    estado: expect.any(Boolean),
    role: expect.any(String)
};

const userDTOMock = {
    estado: expect.any(Boolean),
    role: expect.any(String)
}

describe('Metodo getUserStatusAndRole', () => {
    // Pruebas del metodo getUserStatus
    test('getUserStatus', async () => {
        //Debería devolver un objeto Json del tipo UserDTO
        let userDTO = await UserController.getUserStatusAndRole('dperez2055@gmail.com');

        expect(typeof userDTO).toBe('object');

        //Comparo el objeto con un objeto del tipo user
        expect(userDTO).toMatchObject(userDTOMock);
    });

    test('Metodo getUserStatusAndRole sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserController.getUserStatusAndRole();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});