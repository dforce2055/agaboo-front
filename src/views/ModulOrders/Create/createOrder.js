import React, { Component } from "react";
import "./Form.css";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
); //Verificacion que gmail no contenga campos extraños

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      telephone:null, //Agrego numero de telefono+
      telephonefixed:null,
      cuit:null,
      location:null,
      locationOfPay:null,
      responsibleForPayment:null,
      workContact:null,
      formOfPay:null,
      dateOfDelivery:null,
      locationOfDelivery:null,
      product:null,
      units:null,
      totalPrice:null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        telephone:"" ,//Agrego estado vacio, para demostrar error
        telephonefixed:"",
        cuit:"",
        location:"",
        locationOfPay:"",
        responsibleForPayment:"",
        workContact:"",
        formOfPay:"",
        dateOfDelivery:"",
        locationOfDelivery:"",
        product:"",
        units:"",
        totalPrice:"",
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        nombre: ${this.state.firstName}
        apellido: ${this.state.lastName}
        Email: ${this.state.email}
        telefono:${this.state.telephone}
        telefono de contacto: ${this.state.telephonefixed}
        cuit: ${this.state.cuit}
        direccion: ${this.state.location}
        direccion de cobro:${this.state.locationOfPay}
        responsable de pago: ${this.state.responsibleForPayment}
        contacto en obra: ${this.state.workContact}
        forma de pago: ${this.state.formOfPay}
        fecha de entrega:${this.state.dateOfDelivery}
        direccion de entrega: ${this.state.locationOfDelivery}
        producto: ${this.state.product}
        unidades: ${this.state.units}
        precio total:${this.state.totalPrice}
      `);
    } else {
      console.error("FORMULARIO INVALIDO - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) { //Validar campos
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Email invalido";
        break;
        case "cuit": // Si el campo es menor al num caracteres elejido mostrara error
          formErrors.cuit = 
            value.length < 11 ? "Minimo 11 caracteres":"";
            break;
            
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <React.Fragment>
      <Container  maxWidth="sm" className='nuevo'>    
      
      {/*<div className="wrapper"> -->PRUEBA*/}
         {/*<div className="nuevo">*/}
          <h1>Registro de Pedido</h1>
          <form onSubmit={this.handleSubmit} noValidate>

            <div className="firstName">
              <label htmlFor="firstName">Nombre</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="Nombre"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Apellido</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Apellido"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email@correo.com"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            {/*<------PRUBEA Y AGREGACION DE CAMPOS------->*/}

            <div className="firstName">   {/* Nombre del css a utilizar*/}
              <label htmlFor="firstName">Telefono</label> 
              <input
                className={formErrors.telephone.length > 0 ? "error" : null}
                placeholder="22546654**"
                type="tel"
                name="telephonefixed"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.telephone.length > 0 && (  //Verifico length de campos
                <span className="errorMessage">{formErrors.telephone}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
              )}
            </div>

            <div className="lastName">   {/* Nombre del css a utilizar*/}
              <label htmlFor="lastName">Tel. de Contacto</label> 
              <input
                className={formErrors.telephonefixed.length > 0 ? "error" : null}
                placeholder="22674210**"
                type="tel"
                name="telephonefixed"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.telephonefixed.length > 0 && //Verifico length de campos
                (  
                 <span className="errorMessage">{formErrors.telephonefixed}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
                )                
              }              
            </div>

            <div className="cuit">   {/* Nombre del css a utilizar*/}
              <label htmlFor="cuit">CUIT</label> 
              <input
                className={formErrors.cuit.length > 0 ? "error" : null}
                placeholder="33*******9"
                type="number"
                name="cuit"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.cuit.length > 1 && (  //Verifico length de campos
                <span className="errorMessage">{formErrors.cuit}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
              )}
            </div>

            <div className="password">
              <label htmlFor="location">Direccion</label>
              <input
                className={formErrors.location.length > 0 ? "error" : null}
                placeholder="Direccion"
                type="text"
                name="location"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.location.length > 0 && (
                <span className="errorMessage">{formErrors.location}</span>
              )}
            </div>

            <div className="password">   {/* Nombre del css a utilizar*/}
              <label htmlFor="dni">Direccion de cobro</label> 
              <input
                className={formErrors.locationOfPay.length > 0 ? "error" : null}
                placeholder="Direccion de cobro"
                type="text"
                name="locationOfPay"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.locationOfPay.length > 1 && (  //Verifico length de campos
                <span className="errorMessage">{formErrors.locationOfPay}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
              )}
            </div>
            
            <div className="password">   {/* Nombre del css a utilizar*/}
              <label htmlFor="firstName">Responsable de pago</label> 
              <input
                className={formErrors.responsibleForPayment.length > 0 ? "error" : null}
                placeholder="Nombre y Apellido"
                type="text"
                name="responsibleOfPayment"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.responsibleForPayment.length > 0 && (  //Verifico length de campos
                <span className="errorMessage">{formErrors.responsibleForPayment}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
              )}
            </div>

            <div className="password">   {/* Nombre del css a utilizar*/}
              <label htmlFor="lastName">Contacto en obra</label> 
              <input
                className={formErrors.workContact.length > 0 ? "error" : null}
                placeholder="Nombre y Apellido"
                type="text"
                name="workContact"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.workContact.length > 0 && //Verifico length de campos
                (  
                 <span className="errorMessage">{formErrors.workContact}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
                )
              }              
            </div>

            <div className="lastName">   {/* Nombre del css a utilizar*/}
              <label htmlFor="lastName">Forma de pago</label> 
              <input
                className={formErrors.formOfPay.length > 0 ? "error" : null}
                placeholder="Cheque, Efectivo..."
                type="text"
                name="formOfPay"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.formOfPay.length > 0 && //Verifico length de campos
                (  
                 <span className="errorMessage">{formErrors.formOfPay}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
                )
              }              
            </div>

            <div className="lastName">   {/* Nombre del css a utilizar*/}
              <label htmlFor="lastName">Fecha de entrega</label> 
              <input
                className={formErrors.dateOfDelivery.length > 0 ? "error" : null}
                placeholder="DD/MM/AAAA"
                type="date"
                name="dateOfDelivery"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.dateOfDelivery.length > 0 && //Verifico length de campos
                (  
                 <span className="errorMessage">{formErrors.dateOfDelivery}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
                )
              }              
            </div>

            <div className="password">   {/* Nombre del css a utilizar*/}
              <label htmlFor="lastName">Direccion de entrega</label> 
              <input
                className={formErrors.locationOfDelivery.length > 0 ? "error" : null}
                placeholder="Direccion de entrega"
                type="text"
                name="locationOfDelivery"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.locationOfDelivery.length > 0 && //Verifico length de campos
                (  
                 <span className="errorMessage">{formErrors.locationOfDelivery}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
                )
              }              
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Producto</label> 
              <input
                className={formErrors.product.length > 0 ? "error" : null}
                placeholder="Seleccionar producto"
                type="text"
                name="product"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.product.length > 0 && //Verifico length de campos
                (  
                 <span className="errorMessage">{formErrors.product}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
                )
              }              
            </div>

            <div className="lastName">   {/* Nombre del css a utilizar*/}
              <label htmlFor="lastName">Unidades</label> 
              <input
                className={formErrors.units.length > 0 ? "error" : null}
                placeholder="Cantidad"
                type="number"
                name="units"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.units.length > 0 && //Verifico length de campos
                (  
                 <span className="errorMessage">{formErrors.units}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
                )
              }              
            </div>

            <div className="lastName">   {/* Nombre del css a utilizar*/}
              <label htmlFor="lastName">Precio total</label> 
              <input
                className={formErrors.totalPrice.length > 0 ? "error" : null}
                placeholder="$"
                type="number"
                name="totalPrice"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.totalPrice.length > 0 && //Verifico length de campos
                (  
                 <span className="errorMessage">{formErrors.totalPrice}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
                )
              }              
            </div>

            {/*<------Finaliza campos de ubicacion y direccon---->*/}
            <div className="createAccount">
              <Button> Registrar Pedido </Button>
            </div>
          </form>
        {/*</div>
      </div>*/}
      </Container>
    </React.Fragment>
    );
  }
}

export default Form;