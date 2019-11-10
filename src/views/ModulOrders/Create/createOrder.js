import React from "react";
import "./Form.css";
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import SimpleTable from './OrderDetail/TableProduct';

function formulario(handleChange, value){
  
  return(
    <form>
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
              name="fechaDeCreacionPedido"
              noValidate
              onChange={handleChange('fechaDeCreacionPedido')}
            />
          </div>

          <div className="lastName2">
            <label htmlFor="lastName">Fecha de finalizacion</label> 
            <input
              placeholder="DD/MM/AAAA"
              type="date"
              name="fechaDeEntregaPedido"
              noValidate
              min = {value}
              onChange={handleChange('fechaDeEntregaPedido')}
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

export default function Form() {

  const [values,setValues] = React.useState({
    lugarDePago:'',
    responsableDelPago:'',
    ContactoEnTrabajo:'',
    formaDePago:'',
    fecha_entrega:'',
    fecha_finalizacion: '',
    ubicacionDeEntrega:'',
    ciudad:''
    });  

  const handleChange = name => event => {    
    setValues({ ...values, [name]: event.target.value }); 
    sessionStorage.setItem('info_detalle_pedido',JSON.stringify(values)); 
  };

  // const authFec = () => {
  //   if (values.fechaDeCreacionPedido) {
  //     return values.fechaDeCreacionPedido;
  //   }
  // }

  // React.useEffect( () => {
  //   if(values.fechaDeCreacionPedido){
  //     setValues({ ...values, ['fechaDeEntregaPedido']: values.fechaDeCreacionPedido }); 

  //   }
  // })


  const handleSubmit= () =>{

    //Agrego detalle pedido a SESSION STORAGE
    
    
    console.log("Agrego info_detalle_pedido a SESSION STORAGE");

    //sessionStorage.setItem("detalle_pedido",JSON.stringify());
  }

  
  return (
    <React.Fragment>
    <Container  maxWidth="md" className='nuevo'>
        <form onSubmit={handleSubmit} noValidate>
          {formulario(handleChange, values.fechaDeCreacionPedido)}
          {/*detallePedido(product,handleProductChange,handleChange)*/}
          <SimpleTable></SimpleTable>
        </form>
    </Container>
  </React.Fragment>
  );
}