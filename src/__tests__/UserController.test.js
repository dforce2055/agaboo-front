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
    "role_test",
    "password"
);

const userMock = {
    nombre: expect.any(String),
    apellido: expect.any(String),
    cuit: expect.any(String),
    cuil: expect.any(String),
    tipoDocumento: expect.any(String),
    numeroDocumento: expect.any(String),
    fechNac: expect.objectContaining({
        nanoseconds: expect.any(Number),
        seconds: expect.any(Number),
    }),
    direccion: expect.any(String),
    calle: expect.any(String),
    altura: expect.any(String),
    localidad: expect.any(String),
    celular: expect.any(String),
    telefono: expect.any(String),
    email: expect.any(String),
    estado: expect.any(Boolean),
    role: expect.any(String),
    password: expect.any(String),
};

const userDTOMock = {
    estado: expect.any(Boolean),
    role: expect.any(String)
}


describe('Metodo addUser', () => {
    // Pruebas del metodo getUser
    test('addUser', async () => {
        //Debería devolver un objeto Json del tipo User
        let result = await UserController.addUser(userTest);

        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo addUser sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserController.addUser();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});

describe('Metodo getAllUsers', () => {
    // Pruebas del metodo getAllUsers
    test('getAllUsers', async () => {
        //Debería devolver un array de objetos del tipo User en Json
        let users = await UserController.getAllUsers();

        expect(typeof users).toBe('object');

        //Comparo el objeto con un objeto del tipo User
        expect(users).toMatchObject(Users);

        // Verifico que me llegue un array de objetos del tipo User
        // que al menos un Objeto contenga un campo role: 'ADMIN'

        expect(users).toEqual(          
            expect.arrayContaining([      
                expect.objectContaining({   
                    role: 'ADMIN'              
                })
            ])
        )
    });
});

describe('Metodo getFirstActiveUser', () => {
    // Pruebas del metodo getFirstActiveUser
    test('getFirstActiveUser', async () => {
        //Debería devolver un array de objetos del tipo User en Json
        let user = await UserController.getFirstActiveUser();

        expect(typeof user).toBe('object');

        console.log("Primer usuario activo => " + user.email);

        //Comparo el objeto con un objeto del tipo User
        //expect(user).toMatchObject(User);

        // Verifico que me llegue un array de objetos del tipo User
        // que al menos un Objeto contenga un campo role: 'ADMIN'

        expect(user).toEqual(
            expect.objectContaining({
                eliminado: false
            })
        )
    });
});

describe('Metodo getActiveUsers', () => {
    // Pruebas del metodo getActiveUsers
    test('getActiveUsers', async () => {
        //Debería devolver un array de objetos del tipo User en Json
        let users = await UserController.getActiveUsers();

        expect(typeof users).toBe('object');

        //Comparo el objeto con un objeto del tipo User
        expect(users).toMatchObject(Users);

        // Verifico que me llegue un array de objetos del tipo User
        // que al menos un Objeto contenga un campo role: 'ADMIN'

        expect(users).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    eliminado: false
                })
            ])
        )
    });
});

describe('Metodo getUsersPagination', () => {
    // Pruebas del metodo getUsersPagination
    test('getUsersPagination', async () => {
        //Debería devolver un array de objetos del tipo User en Json
        let users = await UserController.getUsersPagination("aprez2055@gmail.com", 5);
        console.log("################# ULTIMOS USUARIOS PAGINADOS #######################")
        console.log(users);
        expect(typeof users).toBe('object');

        //Comparo el objeto con un objeto del tipo User
        expect(users).toMatchObject(Users);

        // Verifico que me llegue un array de objetos del tipo User
        // que al menos un Objeto contenga un campo role: 'ADMIN'

        expect(users).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    role: 'ADMIN'
                })
            ])
        )
    });
});

describe('Metodo getUsersActivePagination', () => {
    // Pruebas del metodo getUsersActivePagination
    test('getUsersActivePagination', async () => {
        //Debería devolver un array de objetos del tipo User en Json
        let users = await UserController.getUsersActivePagination("bigoton@mail.com", 2);

        expect(typeof users).toBe('object');

        //Comparo el objeto con un objeto del tipo User
        expect(users).toMatchObject(Users);

        // Verifico que me llegue un array de objetos del tipo User
        // que al menos un Objeto contenga un campo role: 'ADMIN'

        expect(users).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    role: 'ADMIN'
                })
            ])
        )
    });
});


describe('Metodo editUser', () => {
    // Pruebas del metodo getUser
    test('editUser', async () => {
        //Debería devolver un objeto Json del tipo User
        let result = await UserController.editUser(userTest);

        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo editUser sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserController.editUser();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});


describe('Metodo deleteUser', () => {
    // Pruebas del metodo getUser
    test('deleteUser', async () => {
        //Debería devolver un objeto Json del tipo User
        let result = await UserController.deleteUser(userTest);

        expect(typeof result).toBe('boolean');
        expect(result).toBe(true);
    });

    test('Metodo deleteUser sin PARAMETRO', async () => {
        //No le envió ningun parametro
        //Debería devolver un mensaje de error
        let message = false
        try {
            await UserController.deleteUser();
        } catch (e) {
            message = e.message
        }
        console.log(message);
        expect(message).toBeTruthy()
    });
});

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