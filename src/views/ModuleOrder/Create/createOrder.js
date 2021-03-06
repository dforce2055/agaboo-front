import React from "react";
import "./Form.css";
import {Container,TextField,Grid} from '@material-ui/core';
import TableProduct from './OrderDetail/TableProduct';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

//IMPORTO 
import OrderController from '../../../controllers/Order';
import TableOrderDisp from './TableOrderDisp.js';
import PlaceMaps from './PlaceMaps.js';

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: {
      MuiContainer:{
        root:{
          paddingTop:'14px',
        },
      },

}});

function nada() {
  return console.log("No hay nada cargado");
}

function formulario(handleChange, value){
  const now = new Date();
  const month = (now.getMonth() + 1) >= 10 ? (now.getMonth() + 1) : ('0' + (now.getMonth() + 1));
  const day = now.getDate() >= 10 ? now.getDate() : ('0' + now.getDate());
  const minDate = now.getFullYear() + '-' + month + '-' + day;
  console.log(minDate);
  return(
    <form noValidate>
      {/* <div className="password">
            <label htmlFor="dni">Direccion de cobro</label> 
            <input
              placeholder="Direccion de cobro"
              type="text"
              noValidate
              onChange={handleChange('lugarDePago')}
            />
          </div> */}
          
          
          <div className="password"> 
            <TextField
              variant="outlined"
              label="Responsable de pago"
              placeholder="Nombre y Apellido"
              type="text"
              noValidate
              onChange={handleChange('responsableDelPago')}
            />
          </div>

          <div className="password"> 
            <TextField
              label="Contacto en obra"
              variant="outlined"
              placeholder="Nombre y Apellido"
              type="text"
              noValidate
              onChange={handleChange('ContactoEnTrabajo')}
            />              
          </div>

          <div className="password">
            <TextField
              label="Forma de pago"
              variant="outlined"
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
              min={minDate}
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

          {/* <div className="password"> 
            <label htmlFor="lastName">Ciudad</label> 
            <input
              placeholder="Ciudad"
              type="text"
              noValidate
              onChange={handleChange('ciudad')} 
            />              
          </div> */}

          {/* <div className="password"> 
            <label htmlFor="lastName">Direccion de entrega</label> 
            <input
              placeholder="Direccion de entrega"
              type="text"
              noValidate
              onChange={handleChange('ubicacionDeEntrega')} 
            />              
          </div> */}
    </form>
  );
}

export default function CreateOrder(props) {
  const { setButtonState } = props; 
  const [loadData,setLoadData] = React.useState(true);
  const [alquilables,setAlquilables] = React.useState([]);

  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const [address2, setAddress2] = React.useState("");
  const [coordinates2, setCoordinates2] = React.useState({
    lat: null,
    lng: null
  });

  React.useEffect(()=>{
    if (values.fecha_entrega != '' && values.fecha_finalizacion != '' && loadData) {
      OrderController.validateOrder(values.fecha_entrega,values.fecha_finalizacion)
        .then(result=>{
         if (result) {
          setAlquilables(result)
         }
        })
      setLoadData(false)
    }
  });

  const [data,setData] = React.useState({ //guardo los datos completos
    lugarDePago:'',
    coordinates_lugarDePago:'',
    responsableDelPago:'',
    ContactoEnTrabajo:'',
    formaDePago:'',
    fecha_entrega: '',
    fecha_finalizacion: '',
    ubicacionDeEntrega:'',
    coordinates_ubicacionDeEntrega:''
  });

    const [values,setValues] = React.useState({
    lugarDePago:'',
    coordinates_lugarDePago:'',
    responsableDelPago:'',
    ContactoEnTrabajo:'',
    formaDePago:'',
    fecha_entrega: '',
    fecha_finalizacion: '',
    ubicacionDeEntrega:'',
    coordinates_ubicacionDeEntrega:''
    });

  React.useEffect(()=>{ //Se ejecutara siempre que detecte un cambio
    data.lugarDePago = address2
    data.coordinates_lugarDePago = coordinates2

    data.responsableDelPago = values.responsableDelPago
    data.ContactoEnTrabajo = values.ContactoEnTrabajo
    data.formaDePago = values.formaDePago
    data.fecha_entrega = values.fecha_entrega
    data.fecha_finalizacion = values.fecha_finalizacion

    data.ubicacionDeEntrega = address
    data.coordinates_ubicacionDeEntrega = coordinates

    console.log("data",data);
    
    sessionStorage.setItem('info_detalle_pedido',JSON.stringify(data)); 
  },[address,address2,values,coordinates]); //Se ejecuta este uuseEffect cuando detecte algun cambio en los siguientes campos

    
  const handleChange = name => event => {    
    setValues({ ...values, [name]: event.target.value }); 
    //Recalcula la cantidad luego de haber cambiado la fecha de entrega o de finalizacion
    if (name == 'fecha_finalizacion' || name == 'fecha_entrega') {
      setLoadData(true)
    }
       
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
          <Grid xs={12} style={{marginBottom:"15px"}}>
            <PlaceMaps
              address = {address2}
              setAddress ={setAddress2}
              coordinates = {coordinates2}
              setCoordinates = {setCoordinates2}
              labelString = "Direccion de cobro"
            />
          </Grid>
            {formulario(handleChange, values.fecha_entrega)}
            <Grid xs={12} style={{marginBottom:"25px"}}>
            <PlaceMaps
              address = {address}
              setAddress ={setAddress}
              coordinates = {coordinates}
              setCoordinates = {setCoordinates}
              labelString = "Direccion de entrega"
            />
            </Grid>
            {alquilables.length > 0  && <TableOrderDisp rows={alquilables}/>}  {/*Renderizo la tabla que contiene la cantidad de productos disponibles para su alquiler*/}
            <TableProduct 
            alquilables = {alquilables} //Paso alquilables, para verificar cada vez que se introduzca un valor nuevo al arreglo.
            setButtonState={setButtonState}/>
          </form>
      </Container>
    </MuiThemeProvider>
  </React.Fragment>
  );
}