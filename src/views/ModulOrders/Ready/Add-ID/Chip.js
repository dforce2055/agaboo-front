import React from 'react'
import ChipInput from 'material-ui-chip-input'
import { Container } from '@material-ui/core';
import OrderController from '../../../../controllers/Order';
import SnackbarsSuccess from './SnackbarsSuccess.js';
import SnackbarsError from './SnackbarsError.js';

export default function Chip(props){
  const[existProduct,setExistProduct] = React.useState(false);
  const {handleChange} = props;
  const {obj} = props;
  
  //Metodo para guardar el objeto en el arreglo.
  const guardarObj = (chip) =>{
    let data = {
      producto:obj.producto,
      modelo:obj.modelo,
      id_producto:chip
    }
    console.log(data);
    
   //AUTENTICACION DE EL PRODUCTO INTRODUCIDO. 
   let auth = chip[chip.length-1] //Selecciono el ultimo dato introducido

    OrderController.verifyProductExistence(auth)
    .then(result => {setExistProduct(result) 
      console.log(result);})
    console.log("exist=",existProduct);

    handleChange(obj.producto,data); //Metodo para guardar el id en el listado del pedido id's
  }

  const handleExistProduct = () =>{
    setExistProduct(false)
  }

 return (
  <div>
  
  <SnackbarsError
    existProduct={existProduct}
    handleExistProduct={handleExistProduct}
  />
  <SnackbarsSuccess
  existProduct={existProduct}
  handleExistProduct={handleExistProduct}/>
  <Container >
   <ChipInput
    variant="outlined"
    onChange = { ( chips ) => guardarObj ( chips ) } 
  />
  </Container>
  </div>
  )
}