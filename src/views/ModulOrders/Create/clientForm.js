import React from 'react';
import Typography from '@material-ui/core/Typography';
//import TextField from '@material-ui/core/TextField';

import IntegrationReactSelect from './AutoComplete/Auto';

export default function ClientForm() {

  const [seleccionado,setSeleccionado] = React.useState([]);

  const setCustomerSeleccionado = (e) => {
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

      <form noValidate>
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
          <label htmlFor="location">Dirección</label>
          <input
            value={seleccionado.localidad}
          />
        </div>
      </form>

    </React.Fragment>
  );
}