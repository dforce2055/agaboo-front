/**
 * @Model
 * Product **Model** Class
 */

export class Product{
    constructor( type, code, codebar, qrcode, description, state, localization,
        price, creationDate, currentAddress) {
        this.type = type;
        this.code = code;
        this.codebar = codebar;
        this.qrcode = qrcode;
        this.description = description;
        this.state = state; // ALQUILADO | DISPONIBLE | EN MANTENIMIENTO | EN TRANSITO
        this.localization = localization;// geopoint { Latitud: number, Longitud: number }
        this.price = price;
        this.creationDate = creationDate; // timestamp {seconds: number, nanoseconds: number }
        this.currentAddress = currentAddress;

    }
    //@Methods
    toString() {
        let user = {
            type: this.type,
            code: this.code,
            codebar: this.codebar,
            qrcode: this.qrcode,
            description: this.description,
            state: this.state, 
            localization: this.localization,
            price: this.price,
            creationDate: this.creationDate, 
            currentAddress: this.currentAddress, 
        }
        return (user);
    }
    //@Getters
    getCreationDateFormated() {
        return new Date(this.creationDate.seconds);
    }

    getCurrentAddress() {
        return this.currentAddress;
    }
    
    //@Setters
}

