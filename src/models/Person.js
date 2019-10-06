/**
 * @Model
 * Person Model Class
 */
export class Person {
    constructor(nombre, apellido, cuit, cuil, tipoDocumento, numeroDocumento, fechNac, 
            direccion, calle, altura, localidad, celular, telefono, email, estado) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cuit = cuit;
        this.cuil = cuil;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.fechNac = fechNac;
        this.direccion = direccion;
        this.calle = calle;
        this.altura =  altura;
        this.localidad = localidad;
        this.celular = celular;
        this.telefono = telefono;
        this.email = email;
        this.estado = estado;
    }

    "@Methods"
    sayHello() {
        return 'Hola soy una Persona';
    }

    esTuDocumento(tDoc, nDoc) {
        //Comparo tipo y número de documento
        return (
            this.tipoDocumento.toUpperCase() === tDoc.toUpperCase() 
            && this.numeroDocumento.toUpperCase() === nDoc.toUpperCase()) 
            ? true:false;  
    }

    "@Getters"
    get getNombre() {
        return this.nombre;
    }
    get getApellido() {
        return this.apellido;
    }
    get getCuit() {
        return this.cuit;
    }
    get getCuil() {
        return this.cuil;
    }

    get getTipoDocumento() {
        return this.tipoDocumento;
    }
    get getNumeroDocumento() {
        return this.numeroDocumento;
    }
    get getDireccion() {
        return this.direccion;
    }
    get getTelefono() {
        return this.telefono;
    }
    get getEmail() {
        return this.email;
    }
    get getEstado() {
        return this.estado;
    }
    get getFechNac() {
        return this.fechNac;
    }

    "@Setters"
    set setNombre(newNombre) {
        this.nombre = newNombre;
    }

}

