import React from 'react';
import Typography from '@material-ui/core/Typography';
import Form from './CreateOrder';

export default function OrderForm(props) {
  const { setButtonState } = props; 
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles de pedido
      </Typography>
      <Form setButtonState={setButtonState}/>
    </React.Fragment>
  );
}