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

          <div className="firstName">
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
    locationOfDelivery:'',
    units:'',
    totalPrice:''
    });  
  const [product, setProduct] = React.useState('false');

  React.useEffect(()=>{
    //BORRAR
    if (sessionStorage.getItem('cliente_pedido') !=null) {
      var data = JSON.stringify(sessionStorage.getItem('info_cliente_pedido'))  
      console.log(data);
             
    }
  });

  const handleChange = name => event => {    
    setValues({ ...values, [name]: event.target.value });  
  };

  //BORRAAR
  function handleProductChange(event) {
    setProduct(event.target.value);
  };

  const handleSubmit= () =>{
    sessionStorage.setItem('cliente_pedido',JSON.stringify(values));
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