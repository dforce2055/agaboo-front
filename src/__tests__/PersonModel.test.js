/**
 * @Test Class
 * Person Class
 */
import  {Person}  from '../models/Person';

const persona = new Person(
    "Diego",
    "Pérez",
    "20-32465169-2",
    "20-32465169-2",
    "DNI",
    "32465169",
    "Jason 915",
    "2254 596194",
    "dperez2055@gmail.com",
    "estado"
    );



test('un test', () => {
    console.log(persona.sayHello());
    expect(true).toBeTruthy();
});
