/**
 * @Model
 * User Model Class extends by Person Model Class
 */
import { Person } from "./Person";

export class User extends Person{
    constructor(nombre, apellido, cuit, cuil, tipoDocumento, numeroDocumento, direccion, telefono, email, estado, role, password) {
        super(nombre, apellido, cuit, cuil, tipoDocumento, numeroDocumento, direccion, telefono, email, estado)
        this.role = role;
        this.password = password;
    }
    //@Methods
    sayHello() {
        return `Hola soy un Usuario mi rol es ${this.role}`;
    }

    sosAdmin() {
        //Comparo tipo y número de documento
        return this.role.toUpperCase() === "ADMIN" ? true:false;
    }
    
    // Retorno objeto JSON omitiendo algunos campos
    toString() {
        let user = {
            apellido: this.apellido,
            nombre: this.nombre,
            cuit: this.cuit,
            cuil: this.cuil,
            tipoDocumento: this.tipoDocumento,
            numeroDocumento: this.numeroDocumento,
            direccion: this.direccion,
            telefono: this.telefono,
            email: this.email,
            estado: this.estado,
            role: this.role,
        }
        return (user);
    }

    //@Getters

    //@Setters
    set setRole(newRole) {
        this.role = newRole;
    }

}