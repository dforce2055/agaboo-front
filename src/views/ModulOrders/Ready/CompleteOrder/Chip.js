import React from 'react'
import ChipInput from 'material-ui-chip-input'
import { Container } from '@material-ui/core';
 
export default function Chip(props){
  const {handleChange} = props;

 return (
  <div>
  <Container >

   <ChipInput
    color='primary'
    variant="outlined"
    onChange = { ( chips ) => handleChange ( chips ) } 
  />
  </Container>
  </div>
  )
}