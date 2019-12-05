import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Title from './Title';
import DialogOrders from './DialogOrders';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import './Table.css';

import OrderController from '../../../controllers/Order';
import DialogPayment from './DialogPayment';

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: {
      MuiTypography:{
        gutterBottom:{
          marginLeft:'15px',
        },
      },

}});

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
    marginBottom:theme.spacing(10),

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

export default function TableAccount(props) {
  const classes = useStyles();

  const {handleOpenReload} = props;
  const {reloadCumulativeTotal} = props;
  const [unpaid, setUnpaid] = React.useState([]);
  const [loadOrder, setLoadOrder] = React.useState(true);

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (reloadCumulativeTotal) {
        OrderController.unpaidOrders()
      .then(result =>{
        if (result)
          setUnpaid(result)
        else
          setUnpaid([]);
      })
      setLoadOrder(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const handlesetLoadOrder = () =>{
    setLoadOrder(true);
  }

  return unpaid.length === 0 ? (
    <React.Fragment>
      <Title>No tiene pedidos impagos</Title>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
      <Title>Pedidos impagos</Title>
      <Table className={classes.tablaPedidos}>
        <Thead>
          <Tr style={{background: '#f5f5f5'}}> 
            <Th>#</Th>
            <Th>Nombre</Th>
            <Th>Localidad</Th>
            <Th>Dirección</Th>
            <Th>Monto</Th>
            <Th>Ver más...</Th>
            <Th>Confirmar pago</Th>
          </Tr>
        </Thead>
        <Tbody>
          {unpaid.map((pedido, index, array) => (
            <Tr key={pedido.id_pedido}>
              <Td style={{ padding:'5px'}}>{index+1}</Td> 
              <Td>{pedido.cliente.nombre +' '+pedido.cliente.apellido}</Td>
              <Td>{pedido.ciudad}</Td>
              <Td>{pedido.direccion}</Td>
              <Td>{pedido.monto_calculado}</Td>
              <Td>
                <DialogOrders pedido={pedido}/>
              </Td>
              <Td>
                <DialogPayment 
                  estado = {pedido.estado}
                  id_pedido={pedido.id_pedido} 
                  handleOpenReload={handleOpenReload} //Si acepta cobrar el pedido, se recarga el "Total Acumulado"
                  handlesetLoadOrder={handlesetLoadOrder} //Si acepta el eliminar se actualizara el array
                  />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </MuiThemeProvider>
    </React.Fragment>
  );
}