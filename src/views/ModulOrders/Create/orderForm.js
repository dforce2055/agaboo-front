import React from 'react';
import Typography from '@material-ui/core/Typography';
import Form from './createOrder';

export default function OrderForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles de pedido
      </Typography>
      <Form />
    </React.Fragment>
  );
}