import React from 'react';
import Typography from '@material-ui/core/Typography';
//import TextField from '@material-ui/core/TextField';

import IntegrationReactSelect from './SelectCustomer/SelectCustomer';

function clientExist(seleccionado2) {
  const seleccionado = seleccionado2;

  return <form noValidate>
  <div className="firstName">
    <label htmlFor="firstName">Nombre</label>
    <input
      value={seleccionado.nombre}
    />
  </div>
  <div className="lastName">
    <label htmlFor="lastName">Apellido</label>
    <input
      value={seleccionado.apellido}
    />
  </div>
  <div className="firstName"> 
      <label htmlFor="cuit">CUIT/CUIL</label> 
      <input
       value={seleccionado.id}
      />
    </div>
  <div className="email">
    <label htmlFor="email">Email</label>
    <input
      value={seleccionado.email}
    />
  </div>
  <div className="firstName">   
    <label htmlFor="firstName">Celular</label> 
    <input
     value={seleccionado.celular}
    />
  </div>
  <div className="password">
    <label htmlFor="location">localidad</label>
    <input
      value = {seleccionado.localidad}
    />
  </div>
</form>

}

function clientNotExist() {
    return <form noValidate>
    <div className="firstName">
      <label htmlFor="firstName">Nombre</label>
      <input
        value={''}
      />
    </div>
    <div className="lastName">
      <label htmlFor="lastName">Apellido</label>
      <input
        value={''}
      />
    </div>
    <div className="firstName"> 
        <label htmlFor="cuit">CUIT/CUIL</label> 
        <input
          value={''}
        />
      </div>
    <div className="email">
      <label htmlFor="email">Email</label>
      <input
        value={''}
      />
    </div>
    <div className="firstName">   
      <label htmlFor="firstName">Celular</label> 
      <input
        value={''}
      />
    </div>
    <div className="password">
      <label htmlFor="location">Dirección</label>
      <input
        value={' '}
      />
    </div>
  </form>
}

export default function ClientForm(props) {

  const [seleccionado,setSeleccionado] = React.useState([]);

  /*var customer = {
    nombre:seleccionado.nombre,
    apellido:seleccionado.apellido,
    id:seleccionado.id,
    email:seleccionado.email,
    celular:seleccionado.celular,
    localidad: seleccionado.localidad
  }
   console.log(customer);
  */

    function setCustomerSeleccionado(e) {
    sessionStorage.setItem('info_cliente_pedido',JSON.stringify(seleccionado));
    
    var data = sessionStorage.getItem('info_cliente_pedido')
    
    setSeleccionado(e);
  }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles de cliente
      </Typography>
      <IntegrationReactSelect
        setSeleccionado = {setCustomerSeleccionado}
      />
      {seleccionado == null ? clientNotExist() : clientExist(seleccionado)}

    </React.Fragment>
  );
}