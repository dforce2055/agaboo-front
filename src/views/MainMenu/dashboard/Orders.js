import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import DialogOrders from './DialogOrders';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

import OrderController from './../../../controllers/Order';

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

export default function Orders(props) {
  const classes = useStyles();
  const [pedidos, setPedidos] = React.useState([]);
  const [cargarPedidos, setCargarPedidos] = React.useState(true);
   

  React.useEffect(() => {

    if (cargarPedidos) {
      OrderController.getOrdersNow()
        .then(pedidos => {
          setPedidos(pedidos);
          setCargarPedidos(false);
        })
        .catch(error => {
          console.log("Error al traer los Pedidos del día => ", error);
        })
    }
  });

  return (
    <React.Fragment>
      <Title>Pedidos para Hoy</Title>
      <Table className={classes.tablaPedidos}>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Nombre</Th>
            <Th>Localidad</Th>
            <Th>Dirección</Th>
            <Th>Ver más...</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pedidos.map((pedido, index, array) => (
            <Tr key={pedido.id_pedido}>
              <Td>{index+1}</Td> 
              <Td>{pedido.cliente.nombre +' ' +pedido.cliente.apellido}</Td>
              <Td>{pedido.ciudad}</Td>
              <Td>{pedido.direccion}</Td>
              <Td>
                <DialogOrders pedido={pedido}/>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </React.Fragment>
  );
}