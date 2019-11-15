import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import DialogOrders from './DialogOrders';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './Table.css';

import OrderController from './../../../controllers/Order';
import DialogPayment from './DialogPayment.js';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  tablaPedidos: {
    textAlign: "left",
    borderCollapse: 'collapse',
    borderSpacing: 0,
    borderColor: 'rgba(0,0,0,.5)',
    padding: '.25em',
    
    '& tbody': {
      '& tr': {
        border: '1px solid rgba(0,0,0,.1)',
        padding: '.25em',
      },
      '& td': {
        border: '1px solid rgba(0,0,0,.1)',
        padding: '.25em',
      }
    },
    '& thead': {
      backgroundColor: 'rgba(0,0,0,.1)',
      color: '#555',
      border: '1px solid rgba(0,0,0,.1)',
      padding: '.25em',
      
      '& th': {
        border: '1px solid rgba(0,0,0,.1)',
        padding: '.25em',
      }
    },
  },
  
}));

export default function Board(props) {
  const classes = useStyles();

  const {handleCloseReload} = props;
  const {handleOpenReload} = props;

  const [unpaid, setUnpaid] = React.useState([]);
  const [loadOrder, setLoadOrder] = React.useState(true);

  React.useEffect(() => {
    if (loadOrder) {
      OrderController.unpaidOrders()
      .then(result =>{
        if (result)
          setUnpaid(result)
        else
          setUnpaid([]);
      })
      setLoadOrder(false)
    }
  });

  const handlesetLoadOrder = () =>{
    setLoadOrder(true);
  }
  return (
    <React.Fragment>           
      <Title>Pedidos impagos</Title>
      <Table className={classes.tablaPedidos}>
        <Thead>
          <Tr style={{background: '#f5f5f5'}}> 
            <Th>#</Th>
            <Th>Nombre</Th>
            <Th>Localidad</Th>
            <Th>Dirección</Th>
            <Th>Ver más...</Th>
            <Th>Confirmar pago</Th>
          </Tr>
        </Thead>
        <Tbody>
          {unpaid.map((pedido, index, array) => (
            <Tr key={pedido.id_pedido}>
              <Td style={{ padding:'5px'}}>{index+1}</Td> 
              <Td>{pedido.cliente.nombre +' ' +pedido.cliente.apellido}</Td>
              <Td>{pedido.ciudad}</Td>
              <Td>{pedido.direccion}</Td>
              <Td>
                <DialogOrders pedido={pedido}/>
              </Td>
              <Td>
                <DialogPayment 
                  id_pedido={pedido.id_pedido} 
                  handleOpenReload={handleOpenReload} //Si acepta cobrar el pedido, se recarga el "Total Acumulado"
                  handlesetLoadOrder={handlesetLoadOrder} //Si acepta el eliminar se actualizara el array
                  />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </React.Fragment>
  );
}