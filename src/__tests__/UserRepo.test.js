/**
 * @Test Class
 * User Repo Test
 */
import UserRepo from '../repositories/User';
import { User } from '../models/User';
let userTest = new User(
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
    apellido : expect.any(String),
    nombre : expect.any(String),
    cuit : expect.any(String),
    cuil : expect.any(String),
    tipoDocumento : expect.any(String),
    numeroDocumento : expect.any(String),
    direccion : expect.any(String),
    telefono : expect.any(String),
    email : expect.any(String),
    estado : expect.any(String),
    role : expect.any(String)
    
};

test('Metodo getUser', async () => {
    //Debería devolver un objeto Json del tipo User
    let user = await UserRepo.getUser('aperez2055@gmail.com');

    expect(typeof user).toBe('object');
    //console.log(user);
    
    //Comparo el objeto con un objeto del tipo user
    expect(user).toMatchObject(userMock);
});

test('Metodo getUser sin PARAMETRO', async () => {
    //Debería devolver un objeto Json del tipo User
    let user = await UserRepo.getUser('');

    expect(user).toBe(null);
    //console.log(user);

    //Comparo el objeto con un objeto del tipo user
    //expect(user).toMatchObject(userMock);
});