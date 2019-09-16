import React, { Component } from "react";
import "./buttonForm.css";
import Container from '@material-ui/core/Container';
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
      password: null,
      telephone:null, //Agrego numero de telefono+
      telephonefixed:null,
      location:null,
      Street:null,
      height:null,
      dni:null,
      cuit:null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        telephone:"" ,//Agrego estado vacio, para demostrar error
        telephonefixed:"",
        location:"",
        Street:"",
        height:"",
        dni:"",
        cuit:"",
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
        telephone:${this.state.telephone}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) { //Validar campos
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "Minimo 4 caracteres" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "Minimo 10 caracteres" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Email invalido";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
        case "telephone": // Si el campo es menor al num caracteres elejido mostrara error
          formErrors.telephone = 
            value.length < 10 ? "Minimo 10 caracteres":"";
            break;
        case "telephonefixed": // Si el campo es menor al num caracteres elejido mostrara error
          formErrors.telephonefixed = 
            value.length < 10 ? "Minimo 10 caracteres":"";
            break;
        case "location": // Si el campo es menor al num caracteres elejido mostrara error
          formErrors.location = 
            value.length < 5 ? "Minimo 5 caracteres":"";
            break;
        case "Street": // Si el campo es menor al num caracteres elejido mostrara error
          formErrors.Street = 
            value.length < 5 ? "Minimo 5 caracteres":"";
            break;
        case "height": // Si el campo es menor al num caracteres elejido mostrara error
          formErrors.height = 
            value.length <= 1 ? "Minimo 1 caracter":"";
            break;
        case "dni": // Si el campo es menor al num caracteres elejido mostrara error
          formErrors.dni = 
            value.length < 8 ? "Minimo 8 caracteres":"";
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
          <h1>Formulario</h1>
          <form onSubmit={this.handleSubmit} noValidate>

            <div className="firstName">
              <label htmlFor="firstName">Nombre</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="Primer Nombre"
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
            {/*<------PRUBEA Y AGREGACION DE CAMPOS------->*/}

            <div className="firstName">   {/* Nombre del css a utilizar*/}
              <label htmlFor="firstName">Num. Celular</label> 
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
              <label htmlFor="lastName">Telefono</label> 
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

            <div className="dni">   {/* Nombre del css a utilizar*/}
              <label htmlFor="dni">D.N.I</label> 
              <input
                className={formErrors.dni.length > 0 ? "error" : null}
                placeholder="41265****"
                type="number"
                name="dni"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.dni.length > 1 && (  //Verifico length de campos
                <span className="errorMessage">{formErrors.dni}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
              )}
            </div>

            <div className="cuit">   {/* Nombre del css a utilizar*/}
              <label htmlFor="cuit">CUIT (Para empresas)</label> 
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

            {/*FIN DE AGREGACION DE CAMPOS Y PRUEBA DE COMPONENTES*/}
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email@gmail.com"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            {/*<-------INICIA campos de ubicacion y direccon----->*/}
            <div className="password">
              <label htmlFor="location">Localidad</label>
              <input
                className={formErrors.location.length > 0 ? "error" : null}
                placeholder="Ciudad"
                type="text"
                name="location"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.location.length > 0 && (
                <span className="errorMessage">{formErrors.location}</span>
              )}
            </div>

            <div className="firstName">   {/* Nombre del css a utilizar*/}
              <label htmlFor="firstName">Calle</label> 
              <input
                className={formErrors.Street.length > 0 ? "error" : null}
                placeholder="Jason"
                type="tel"
                name="Street"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.Street.length > 0 && (  //Verifico length de campos
                <span className="errorMessage">{formErrors.Street}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
              )}
            </div>

            <div className="lastName">   {/* Nombre del css a utilizar*/}
              <label htmlFor="lastName">Altura</label> 
              <input
                className={formErrors.height.length > 0 ? "error" : null}
                placeholder="1025"
                type="number"
                name="height"  //Nombre state a utilizar
                noValidate
                onChange={this.handleChange}  // Guardo los cambios 
              />
              {formErrors.height.length > 0 && //Verifico length de campos
                (  
                 <span className="errorMessage">{formErrors.height}</span>  //Si el largo del campo es menor al esperado muestro mensaje de error
                )                
              }              
            </div>

            {/*<------Finaliza campos de ubicacion y direccon---->*/}
            <div className="createAccount">
              <button type="submit">Registrar Cliente</button>
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