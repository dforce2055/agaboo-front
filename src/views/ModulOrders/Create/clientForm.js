import React from 'react';
import Typography from '@material-ui/core/Typography';
import IntegrationAutosuggest from './clientsList';

export default function ClientForm() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [telephonefixed, setTelephoneFixed] = React.useState("");
  const [location, setLocation] = React.useState("");

  function handleFirstNameChange(event) {
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
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles de cliente
      </Typography>
      <IntegrationAutosuggest/>

      <form noValidate>
        <div className="firstName">
          <label htmlFor="firstName">Nombre</label>
          <input
            className={firstName.length > 0 ? "error" : null}
            placeholder="Nombre"
            type="text"
            name="firstName"
            noValidate
            onChange={handleFirstNameChange}
            readOnly
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
            readOnly
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
            readOnly
          />
        </div>

        <div className="firstName">   {/* Nombre del css a utilizar*/}
          <label htmlFor="firstName">Telefono</label> 
          <input
            className={telephone.length > 0 ? "error" : null}
            placeholder="22546654**"
            type="tel"
            name="telephonefixed"  //Nombre state a utilizar
            noValidate
            onChange={handleTelephoneChange}  // Guardo los cambios 
            readOnly
          />
        </div>

        <div className="lastName">   {/* Nombre del css a utilizar*/}
          <label htmlFor="lastName">Tel. de Contacto</label> 
          <input
            className={telephonefixed.length > 0 ? "error" : null}
            placeholder="22674210**"
            type="tel"
            name="telephonefixed"  //Nombre state a utilizar
            noValidate
            onChange={handleTelephoneFixedChange}  // Guardo los cambios 
            readOnly
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
            readOnly
          />
        </div>
      </form>

    </React.Fragment>
  );
}