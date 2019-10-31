import React from 'react'
import ChipInput from 'material-ui-chip-input'
import { Container } from '@material-ui/core';
 
export default function Chip(props){
  const {handleChange} = props;
  const {obj} = props;

  const [a,setA] = React.useState([]);
  //Metodo para guardar el objeto en el arreglo.
  const guardarObj = (chip) =>{
    let data = {
      producto:obj.producto,
      modelo:obj.modelo,
      id_producto:chip
    }
    console.log(data);
    handleChange(obj.producto,data);
  }

  const handleSave = (chip ) =>{
    setA(chip);
  }

 return (
  <div>
  <Container >

   <ChipInput
    color='primary'
    variant="outlined"
    onChange = { ( chips ) => guardarObj ( chips ) } 
  />
  </Container>
  </div>
  )
}