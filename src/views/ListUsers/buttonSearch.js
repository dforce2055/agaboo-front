import React from 'react';
import './buttonSearch.css';
import { Input } from '@material-ui/core';


export default function ButtonSearch() {
  
  return (
    <div align="right">  
     <Input type="text" placeholder="Buscar" />  
    </div>
  );
}
