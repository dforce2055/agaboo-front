import React from "react";
import "./Form.css";
import Container from '@material-ui/core/Container';
import SimpleTable from './OrderDetail/TableProduct';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: {
      MuiContainer:{
        root:{
          paddingTop:'14px',
        },
      },

}});

function formulario(handleChange, value){
  const now = new Date();
  const minDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  
  return(
    <form noValidate>
      <div className="password">
            <label htmlFor="dni">Direccion de cobro</label> 
            <input
              placeholder="Direccion de cobro"
              type="text"
              noValidate
              onChange={handleChange('lugarDePago')}
            />
          </div>
          
          
          <div className="password"> 
            <label htmlFor="firstName">Responsable de pago</label> 
            <input
              placeholder="Nombre y Apellido"
              type="text"
              noValidate
              onChange={handleChange('responsableDelPago')}
            />
          </div>

          <div className="password"> 
            <label htmlFor="lastName">Contacto en obra</label> 
            <input
              placeholder="Nombre y Apellido"
              type="text"
              noValidate
              onChange={handleChange('ContactoEnTrabajo')}
            />              
          </div>

          <div className="password">
            <label htmlFor="lastName">Forma de pago</label> 
            <input
              placeholder="Cheque, Efectivo..."
              type="text"
              noValidate
              onChange={handleChange("formaDePago")}
            />              
          </div>



          <div className="lastName">
            <label htmlFor="lastName">Fecha de entrega</label> 
            <input
              placeholder="DD/MM/AAAA"
              type="date"
              name="fecha_entrega"
              noValidate
              min= {minDate}
              onChange={handleChange('fecha_entrega')}
            />
          </div>

          <div className="lastName2">
            <label htmlFor="lastName">Fecha de finalizacion</label> 
            <input
              placeholder="DD/MM/AAAA"
              type="date"
              name="fecha_finalizacion"
              noValidate
              min = {value}
              onChange={handleChange('fecha_finalizacion')}
            />
          </div>

          <div className="password"> 
            <label htmlFor="lastName">Ciudad</label> 
            <input
              placeholder="Ciudad"
              type="text"
              noValidate
              onChange={handleChange('ciudad')} 
            />              
          </div>

          <div className="password"> 
            <label htmlFor="lastName">Direccion de entrega</label> 
            <input
              placeholder="Direccion de entrega"
              type="text"
              noValidate

              onChange={handleChange('ubicacionDeEntrega')} 
            />              
          </div>
    </form>
  );
}

export default function CreateOrder(props) {
  const { setButtonState } = props; 

  const [values,setValues] = React.useState({
    lugarDePago:'',
    responsableDelPago:'',
    ContactoEnTrabajo:'',
    formaDePago:'',
    fecha_entrega: '',
    fecha_finalizacion: '',
    ubicacionDeEntrega:'',
    ciudad:''
    });  

  const handleChange = name => event => {    
    setValues({ ...values, [name]: event.target.value }); 
    sessionStorage.setItem('info_detalle_pedido',JSON.stringify(values));    
  };

  const handleSubmit= () =>{    
    
    console.log("Agrego info_detalle_pedido a SESSION STORAGE");

    sessionStorage.setItem("info_detalle_pedido",JSON.stringify(values));
  }

  
  return (
    <React.Fragment>
    <MuiThemeProvider theme={theme}>
      <Container  maxWidth="md" className='nuevo'>
          <form onSubmit={handleSubmit} noValidate>
            {formulario(handleChange, values.fecha_entrega)}
            {/*detallePedido(product,handleProductChange,handleChange)*/}
            <SimpleTable setButtonState={setButtonState}></SimpleTable>
          </form>
      </Container>
    </MuiThemeProvider>
  </React.Fragment>
  );
}