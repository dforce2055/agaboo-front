/**
 * @Test Class
 * User Repo Test
 */
import UserRepo from '../repositories/User';
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
    apellido : expect.any(String),
    cuit : expect.any(String),
    cuil : expect.any(String),
    tipoDocumento : expect.any(String),
    numeroDocumento : expect.any(String),
    fechNac: expect.objectContaining({
        nanoseconds: expect.any(Number),
        seconds: expect.any(Number),
    }),
    direccion : expect.any(String),
    calle : expect.any(String),
    altura : expect.any(String),
    localidad : expect.any(String),
    celular : expect.any(String),
    telefono : expect.any(String),
    email : expect.any(String),
    estado : expect.any(Boolean),
    role : expect.any(String)  
};



describe('Metodo getUser', () => {
    // Pruebas del metodo getUser
    test('getUser', async () => {
        //Debería devolver un objeto Json del tipo User
        let user = await UserRepo.getUser('aperez2055@gmail.com');

        expect(typeof user).toBe('object');
        
        //Comparo el objeto con un objeto del tipo user
        //expect(user).toMatchObject(userMock);
    });

    test('Metodo getUser sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserRepo.getUser();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});
/*
describe('Metodo getUserByCUIL', () => {
    // Pruebas del metodo getUser
    test('getUserByCUIL', async () => {
        //Debería devolver un objeto Json del tipo User
        let user = await UserRepo.getUserByCUIL('20-32465169-2');

        expect(typeof user).toBe('object');

        //Comparo el objeto con un objeto del tipo user
        expect(user).toMatchObject(userMock);
    });

    test('Metodo getUserByCUIL sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserRepo.getUserByCUIL();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});

describe('Metodo getUserByEMAIL', () => {
    // Pruebas del metodo getUser
    test('getUserByEMAIL', async () => {
        //Debería devolver un objeto Json del tipo User
        let user = await UserRepo.getUserByEMAIL('aperez2055@gmail.com');

        expect(typeof user).toBe('object');

        //Comparo el objeto con un objeto del tipo user
        expect(user).toMatchObject(userMock);
    });

    test('Metodo getUserByEMAIL sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserRepo.getUserByEMAIL();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});


describe('Metodo getUsers', () => {
    // Pruebas del metodo getUsers
    test('getUsers', async () => {
        //Debería devolver un array de objetos del tipo User en Json
        let users = await UserRepo.getUsers();

        expect(typeof users).toBe('object');

        //Comparo el objeto con un objeto del tipo User
        expect(users).toMatchObject(Users);

        // Verifico que me llegue un array de objetos del tipo User
        expect(users).toEqual(
            expect.arrayContaining([
                userMock
            ])
        )
    });
});


describe('Metodo addUser', () => {
    // Pruebas del metodo getUser
    test('addUser', async () => {
        //Debería devolver un objeto Json del tipo User
        let result = await UserRepo.addUser(userTest);

        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo addUser sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserRepo.addUser();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});


describe('Metodo editUser', () => {
    test('Metodo editUser', async () => {
        //Debería devolver true si encuentra el email
        //y logra modificar al usuario

        let result = await UserRepo.editUser('email_test', userTest);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo editUser sin parametros', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserRepo.editUser();
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });
});

describe('Metodo deleteUser', () => {
    test('Metodo deleteUser', async () => {
        //Debería devolver true si encuentra el email
        //y logra eliminar al usuario
        //Creo un user
        await UserRepo.addUser(userTest);

        //Lo elimino y evaluo el resultado
        let result = await UserRepo.deleteUser(userTest.email);
        console.log("Eliminado " + result);
        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo deleteUser sin parametros', async () => {
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserRepo.deleteUser();
        } catch (e) {
            message = e.message
        }
        //console.log(message);
        expect(message).toBeTruthy()
    });
});
*/