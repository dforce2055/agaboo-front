/**
 * @Test Class
 * User Class
 */
import  {User}  from '../models/User';
const user = new User(
    "Diego",
    "Pérez",
    "20-32465169-2",
    "20-32465169-2",
    "DNI",
    "32465169",
    "Jason 915",
    "2254 596194",
    "dperez2055@gmail.com",
    "estado",
    "admin",
    "lslsls"
    );



test('un test', () => {
    user.name= "NAME";
    user.role = "Super Admin";
    user.setNombre = "Obdulio";
    console.log(user.sayHello() + ' y mi nombre es ' + user.getNombre + ' mi telefono es ' + user.getTelefono);
    //console.log(user.toString());
    console.log(user.esTuDocumento("Dni", "32465169"));
    console.log(user.sosAdmin());
    console.log(user);
    expect(true).toBeTruthy();
});
