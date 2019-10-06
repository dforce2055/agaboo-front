/**
 * @Model
 * Product **Model** Class
 */

export class Product{
    constructor( type, code, codebar, qrcode, description, state, localization,
        price, fechaAlta) {
        this.type = type;
        this.code = code;
        this.codebar = codebar;
        this.qrcode = qrcode;
        this.description = description;
        this.state = state; // ALQUILADO | DISPONIBLE | EN MANTENIMIENTO | EN TRANSITO
        this.localization = localization;// geopoint
        this.price = price;
        this.fechaAlta = fechaAlta;
    }
    //@Methods
    //@Getters
    //@Setters
}

