import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './buttonSearch.css';
import { Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme => ({
  
}));

export default function ButtonSearch() {
  
  return (
    <div >       
     {/*<TextField
      style={{ margin: 8 ,backgroundColor: '#fff'}}
      placeholder="Buscar..."
      //helperText="Introducir persona a buscar."
      fullWidth
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }/> */}
     

     <Input type="text" placeholder="Buscar" />  
       
    </div>
  );
}
