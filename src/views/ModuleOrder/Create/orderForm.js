import React from 'react';
import Typography from '@material-ui/core/Typography';
import CreateOrder from './CreateOrder';

export default function OrderForm(props) {
  const { setButtonState } = props; 
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Detalles de pedido
      </Typography>
      <CreateOrder setButtonState={setButtonState}/>
    </React.Fragment>
  );
}