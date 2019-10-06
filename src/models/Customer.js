/**
 * @Model Class
 * Customer Model Class
 */
import { Person } from "./Person";

export class Customer extends Person {
    constructor(nombre, apellido, cuit, cuil, tipoDocumento, numeroDocumento, fechNac,
            direccion, calle, altura, localidad, celular, telefono, email, estado,
            ) {
        super(nombre, apellido, cuit, cuil, tipoDocumento, numeroDocumento, fechNac, 
                direccion, calle, altura, localidad, celular, telefono, email, estado)
        
        
    }
    //@Methods
    sayHello() {
        //return `Hola soy un Usuario mi rol es ${this.role}`;
    }

    sosAdmin() {
        //Comparo tipo y número de documento
        //return this.role.toUpperCase() === "ADMIN" ? true : false;
    }

    // Retorno objeto JSON omitiendo algunos campos
    toString() {
        let customer = {
            apellido: this.apellido,
            nombre: this.nombre,
            cuil: this.cuil,
            /*cuit: this.cuit,
            tipoDocumento: this.tipoDocumento,
            numeroDocumento: this.numeroDocumento,
            fechNac: this.fechNac,
            direccion: this.direccion,
            telefono: this.telefono,
            email: this.email,
            estado: this.estado,
            role: this.role*/
        }
        return (customer);
    }

    //@Getters

    //@Setters
    

}

/**
 * Modelo de objeto Customer


const Customer = {
    apellido: expect.any(String),
    nombre: expect.any(String),
    cuil: expect.any(String),
    dni: expect.any(String),
    //edad: expect.any(Number)
}

module.exports = {
    Customer
}

*/