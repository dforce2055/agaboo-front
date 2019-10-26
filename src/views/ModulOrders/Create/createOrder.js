import React from "react";
import "./Form.css";
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import SimpleTable from './OrderDetail/TableProduct';

function formulario(handleChange){
  
  return(
    <form>
      <div className="password">
            <label htmlFor="dni">Direccion de cobro</label> 
            <input
              placeholder="Direccion de cobro"
              type="text"
              noValidate
              onChange={handleChange('locationOfPay')}
            />
          </div>
          
          <div className="password"> 
            <label htmlFor="firstName">Responsable de pago</label> 
            <input
              placeholder="Nombre y Apellido"
              type="text"
              noValidate
              onChange={handleChange('responsibleForPayment')}
            />
          </div>

          <div className="password"> 
            <label htmlFor="lastName">Contacto en obra</label> 
            <input
              placeholder="Nombre y Apellido"
              type="text"
              noValidate
              onChange={handleChange('workContact')}
            />              
          </div>

          <div className="password">
            <label htmlFor="lastName">Forma de pago</label> 
            <input
              placeholder="Cheque, Efectivo..."
              type="text"
              noValidate
              onChange={handleChange("formOfPay")}
            />              
          </div>



          <div className="lastName">
            <label htmlFor="lastName">Fecha de entrega</label> 
            <input
              placeholder="DD/MM/AAAA"
              type="date"
              name="dateOfDelivery"
              noValidate
              onChange={handleChange('dateOfDelivery')}
            />
          </div>

          <div className="lastName">
            <label htmlFor="lastName">Fecha de finalizacion</label> 
            <input
              placeholder="DD/MM/AAAA"
              type="date"
              name="dateOfDeliveryFIN"
              noValidate
              onChange={handleChange('dateOfDeliveryFIN')}
            />
          </div>

          <div className="password"> 
            <label htmlFor="lastName">Direccion de entrega</label> 
            <input
              placeholder="Direccion de entrega"
              type="text"
              noValidate
              onChange={handleChange('locationOfDelivery')} 
            />              
          </div>
    </form>
  );
}

function detallePedido(product,handleProductChange,handleChange){
  /*//VA EN FORM
  const [product, setProduct] = React.useState('false');
  function handleProductChange(event) {
    setProduct(event.target.value);
  };*/

  return(
    <React.Fragment>
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

        <div className="firstName">
          <label htmlFor="firstName">Unidades</label> 
          <input
            placeholder="Cantidad"
            type="number"
            noValidate
            onChange={handleChange("units")}
          />
        </div>

        <div className="lastName">
          <label htmlFor="lastName">Precio total</label> 
          <input
            placeholder="$"
            type="number"
            name="totalPrice"
            noValidate
            onChange={handleChange("totalPrice")}
          />             
      </div>
    </React.Fragment>
  );
}
export default function Form() {

  const [values,setValues] = React.useState({
    locationOfPay:'',
    responsibleForPayment:'',
    workContact:'',
    formOfPay:'',
    dateOfDelivery:'',
    dateOfDeliveryFIN:'',
    locationOfDelivery:''
    //units:'',
    //totalPrice:''
    });  

  const handleChange = name => event => {    
    setValues({ ...values, [name]: event.target.value }); 
    
    sessionStorage.setItem('info_detalle_pedido',JSON.stringify(values)); 
  };


  const handleSubmit= () =>{

    //Agrego detalle pedido a SESSION STORAGE
    
    
    console.log("Agrego info_detalle_pedido a SESSION STORAGE");

    //sessionStorage.setItem("detalle_pedido",JSON.stringify());
  }

  
  return (
    <React.Fragment>
    <Container  maxWidth="md" className='nuevo'>
        <form onSubmit={handleSubmit} noValidate>
          {formulario(handleChange)}
          {/*detallePedido(product,handleProductChange,handleChange)*/}
          <SimpleTable></SimpleTable>
        </form>
    </Container>
  </React.Fragment>
  );
}