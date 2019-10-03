import React from "react";
import "./Form.css";
import Container from '@material-ui/core/Container';
//import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

/*const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
); //Verificacion que gmail no contenga campos extraños
*/
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

export default function Form() {
  const [product, setProduct] = React.useState('false');
  /* const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [telephonefixed, setTelephoneFixed] = React.useState("");
  const [location, setLocation] = React.useState(""); */
  const [cuit, setCuit] = React.useState("");
  const [locationOfPay, setLocationOfPay] = React.useState("");
  const [responsibleForPayment, setResponsibleforPayment] = React.useState("");
  const [workContact, setWorkContact] = React.useState("");
  const [formOfPay, setFormOfPay] = React.useState("");
  const [dateOfDelivery, setDateOfDelivery] = React.useState("");
  const [locationOfDelivery, setLocationOfDelivery] = React.useState("");
  const [units, setUnits] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState("");


  let handleSubmit = e => {
    e.preventDefault();

    if (formValid()) {
      console.log(`
        --SUBMITTING--
        cuit: ${cuit}
        direccion de cobro:${locationOfPay}
        responsable de pago: ${responsibleForPayment}
        contacto en obra: ${workContact}
        forma de pago: ${formOfPay}
        fecha de entrega:${dateOfDelivery}
        direccion de entrega: ${locationOfDelivery}
        producto: ${product}
        unidades: ${units}
        precio total:${totalPrice}
      `);
    } else {
      console.error("FORMULARIO INVALIDO");
    }
  };

  /* let handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let units = { ...units };

    switch (name) { //Validar campos
      case "email":
        email = emailRegex.test(value)
          ? ""
          : "Email invalido";
        break;
        case "cuit": // Si el campo es menor al num caracteres elejido mostrara error
          cuit = 
            value.length < 11 ? "Minimo 11 caracteres":"";
        break;
        case "units": // Si el campo es menor al num caracteres elejido mostrara error
          units = 
            value.length < 1 ? "Minimo 11 caracteres":"";
        break;
            
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      return console.log(state);
    });
  }; */

  function handleProductChange(event) {
    setProduct(event.target.value);
  }
  /* function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }
  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handleTelephoneChange(event) {
    setTelephone(event.target.value);
  }
  function handleTelephoneFixedChange(event) {
    setTelephoneFixed(event.target.value);
  }
  function handleLocationChange(event) {
    setLocation(event.target.value);
  } */
  function handleCuitChange(event) {
    setCuit(event.target.value);
  }
  function handleLocationOfPayChange(event) {
    setLocationOfPay(event.target.value);
  }
  function handleResponsibleForPaymentChange(event) {
    setResponsibleforPayment(event.target.value);
  }
  function handleWorkContactChange(event) {
    setWorkContact(event.target.value);
  }
  function handleFormOfPayChange(event) {
    setFormOfPay(event.target.value);
  }
  function handleDateOfDeliveryChange(event) {
    setDateOfDelivery(event.target.value);
  }
  function handleLocationOfDeliveryChange(event) {
    setLocationOfDelivery(event.target.value);
  }
  function handleUnitsChange(event) {
    setUnits(event.target.value);
  }
  function handleTotalPriceChange(event) {
    setTotalPrice(event.target.value);
  }
    
  return (
    <React.Fragment>
    <Container  maxWidth="md" className='nuevo'>
        {/* <h1>Registro de Pedido</h1> */}
        <form onSubmit={handleSubmit} noValidate>
           {/* <div className="firstName">
            <label htmlFor="firstName">Nombre</label>
            <input
              className={firstName.length > 0 ? "error" : null}
              placeholder="Nombre"
              type="text"
              name="firstName"
              noValidate
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="lastName">
            <label htmlFor="lastName">Apellido</label>
            <input
              className={lastName.length > 0 ? "error" : null}
              placeholder="Apellido"
              type="text"
              name="lastName"
              noValidate
              onChange={handleLastNameChange}
            />
          </div>

          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              className={email.length > 0 ? "error" : null}
              placeholder="Email@correo.com"
              type="email"
              name="email"
              noValidate
              onChange={handleEmailChange}
            />
          </div> */}
          {/*<------PRUBEA Y AGREGACION DE CAMPOS------->*/}

           {/* <div className="firstName">   
            <label htmlFor="firstName">Telefono</label> 
            <input
              className={telephone.length > 0 ? "error" : null}
              placeholder="22546654**"
              type="tel"
              name="telephonefixed"  //Nombre state a utilizar
              noValidate
              onChange={handleTelephoneChange}  // Guardo los cambios 
            />
          </div>

          <div className="lastName">   
            <label htmlFor="lastName">Tel. de Contacto</label> 
            <input
              className={telephonefixed.length > 0 ? "error" : null}
              placeholder="22674210**"
              type="tel"
              name="telephonefixed"  //Nombre state a utilizar
              noValidate
              onChange={handleTelephoneFixedChange}  // Guardo los cambios 
            />             
          </div>

           <div className="password">
            <label htmlFor="location">Direccion</label>
            <input
              className={location.length > 0 ? "error" : null}
              placeholder="Direccion"
              type="text"
              name="location"
              noValidate
              onChange={handleLocationChange}
            />
          </div> */}

          <div className="cuit">   {/* Nombre del css a utilizar*/}
            <label htmlFor="cuit">CUIT</label> 
            <input
              className={cuit.length > 0 ? "error" : null}
              placeholder="33*******9"
              type="number"
              name="cuit"  //Nombre state a utilizar
              noValidate
              onChange={handleCuitChange}  // Guardo los cambios 
            />
          </div>

          <div className="password">   {/* Nombre del css a utilizar*/}
            <label htmlFor="dni">Direccion de cobro</label> 
            <input
              className={locationOfPay.length > 0 ? "error" : null}
              placeholder="Direccion de cobro"
              type="text"
              name="locationOfPay"  //Nombre state a utilizar
              noValidate
              onChange={handleLocationOfPayChange}  // Guardo los cambios 
            />
          </div>
          
          <div className="password">   {/* Nombre del css a utilizar*/}
            <label htmlFor="firstName">Responsable de pago</label> 
            <input
              className={responsibleForPayment.length > 0 ? "error" : null}
              placeholder="Nombre y Apellido"
              type="text"
              name="responsibleForPayment"  //Nombre state a utilizar
              noValidate
              onChange={handleResponsibleForPaymentChange}  // Guardo los cambios 
            />
          </div>

          <div className="password">   {/* Nombre del css a utilizar*/}
            <label htmlFor="lastName">Contacto en obra</label> 
            <input
              className={workContact.length > 0 ? "error" : null}
              placeholder="Nombre y Apellido"
              type="text"
              name="workContact"  //Nombre state a utilizar
              noValidate
              onChange={handleWorkContactChange}  // Guardo los cambios 
            />              
          </div>

          <div className="firstName">   {/* Nombre del css a utilizar*/}
            <label htmlFor="lastName">Forma de pago</label> 
            <input
              className={formOfPay.length > 0 ? "error" : null}
              placeholder="Cheque, Efectivo..."
              type="text"
              name="formOfPay"  //Nombre state a utilizar
              noValidate
              onChange={handleFormOfPayChange}  // Guardo los cambios 
            />              
          </div>

          <div className="lastName">   {/* Nombre del css a utilizar*/}
            <label htmlFor="lastName">Fecha de entrega</label> 
            <input
              className={dateOfDelivery.length > 0 ? "error" : null}
              placeholder="DD/MM/AAAA"
              type="date"
              name="dateOfDelivery"  //Nombre state a utilizar
              noValidate
              onChange={handleDateOfDeliveryChange}  // Guardo los cambios 
            />
          </div>

          <div className="password">   {/* Nombre del css a utilizar*/}
            <label htmlFor="lastName">Direccion de entrega</label> 
            <input
              className={locationOfDelivery.length > 0 ? "error" : null}
              placeholder="Direccion de entrega"
              type="text"
              name="locationOfDelivery"  //Nombre state a utilizar
              noValidate
              onChange={handleLocationOfDeliveryChange}  // Guardo los cambios 
            />              
          </div>

          <div className="password">
          <FormControl>
            <InputLabel htmlFor="max-width">Seleccionar producto</InputLabel>
              <Select 
              value={product}
              onChange={handleProductChange}
              inputProps={{
                name: 'max-width',
                id: 'max-width',
              }}>
              <MenuItem value="baño quimico">Baño químico</MenuItem>
              <MenuItem value="garita de seguridad">Garita de seguridad</MenuItem>
              <MenuItem value="oficina de obra">Oficina de obra</MenuItem>
              <MenuItem value="boleteria">Boletería</MenuItem>
            </Select>
          </FormControl>           
          </div>

          <div className="firstName">   {/* Nombre del css a utilizar*/}
            <label htmlFor="firstName">Unidades</label> 
            <input
              className={units.length > 0 ? "error" : null}
              placeholder="Cantidad"
              type="number"
              name="units"  //Nombre state a utilizar
              noValidate
              onChange={handleUnitsChange}  // Guardo los cambios 
            />
          </div>

          <div className="lastName">   {/* Nombre del css a utilizar*/}
            <label htmlFor="lastName">Precio total</label> 
            <input
              className={totalPrice.length > 0 ? "error" : null}
              placeholder="$"
              type="number"
              name="totalPrice"  //Nombre state a utilizar
              noValidate
              onChange={handleTotalPriceChange}  // Guardo los cambios 
            />             
          </div>

          {/*<------Finaliza campos de ubicacion y direccon---->*/}
          {/* <div className="createAccount">
            <Button> Registrar Pedido </Button>
          </div> */}
        </form>
    </Container>
  </React.Fragment>
  );
}


