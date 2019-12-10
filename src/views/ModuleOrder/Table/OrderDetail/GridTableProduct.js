import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  ButtonGroup,
  Grid,
  Divider,
  Typography} from '@material-ui/core';
import {
  MuiThemeProvider, 
  createMuiTheme} from '@material-ui/core/styles';
import DialogSave from './DialogSaveOrder';
import OrderController from '../../../../controllers/Order';
import GridTableProductRespon from './GridTableProductRespon';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#318377',
    color: theme.palette.common.white,
  },
}))(TableCell);

const themeMuiProvider = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#3fb5a5',
        '&:hover': {
          backgroundColor: '#0ce8ca',
          "@media (hover: none)": {
            backgroundColor: "#0ce8ca"
          },
        },
      },
      containedSecondary: {
        backgroundColor: '#b53f3f',
        '&:hover': {
          backgroundColor: '#f30b0b',
          "@media (hover: none)": {
            backgroundColor: "#f30b0b"
          },
        },
      },
    }, 
  }
})

const useStyles = makeStyles(theme => ({
  TextField:{
    width:'125px'
  },
  buttonRight: {
    marginTop: theme.spacing(2),
  },
}));

//Este metodo le llegan como parametro un conjunto de objetos y los recorre, luego se fija su respectiva cantidad y lo mapea
const onlyProduct = (order) => {
  let result = []; 
  order.forEach(element => {
    if (element.modelo === " ") {
      element.modelo = "---"
    }
    for (let i = 0; i < element.cantidad; i++) {
      result.push({
        producto:element.producto,
        precio_X_unidad:element.precio_X_unidad,
        modelo:element.modelo,
        id_producto:''
      })
    } 
  });
  return result
}

const TableResponsive = (order,addIdForIndex,orderComplete,valueForIndex,disabledText) =>{
  let array = onlyProduct(order)
  
  return(
    <React.Fragment>
    
    <Grid
      style={{backgroundColor:'#318377'}}
      container 
      direction="row" 
      justify="space-around" 
      alignItems="center"
      spacing={2}
      >
        <Grid item>
       <Typography 
        style={{background:'#318377'}}
        align='center'
        variant='h6'
      >
        <spam style={{color:'#fff'}}>Producto</spam>
      </Typography>

        </Grid>

        <Grid item>
        <Typography 
        style={{background:'#318377'}}
        align='center'
        variant='h6'
      >
        <spam style={{color:'#fff'}}>Modelo</spam>
      </Typography>
        </Grid>

        <Grid item>
        <Typography 
        style={{background:'#318377'}}
        align='center'
        variant='h6'
      >
        <spam style={{color:'#fff'}}>Codigo</spam>
      </Typography>
        </Grid>
    </Grid>
    {array.map((row,index)=>(
      <div key={index}>
        <br/>
          <GridTableProductRespon
            data={row}
            i={index}
            addIdForIndex={addIdForIndex}
            orderComplete={orderComplete}
            valueForIndex={valueForIndex}
            disabledText={disabledText}
          />
        <br/>
        <Divider/>
      </div>
    ))}
    </React.Fragment>
  );
}


export default function GridTableProduct() {
  const classes = useStyles();
  const [arrayOnlyProduct] = React.useState([]); //Guardo el arreglo con los id
  const [orderComplete,setOrderComplete] = React.useState(''); //Guardo el id del pedido
  const [order,setOrder] = React.useState([]); //Guardo listado de productos con su cantidad
  const [load,setLoad] = React.useState(true); //al renderizar cargo datos
  const [openDialog, setOpenDialog] = React.useState(false);//State de Dialog
  const [disabled,setDisabled] = React.useState(true);//Oculta el boton de guardar
  const [disabledText,setDisabledText] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  React.useEffect(()=>{ //Carga los datos la primera vez
    if (load) {  
        setOrder(JSON.parse(sessionStorage.getItem('listado_producto')));  
        setOrderComplete(JSON.parse(sessionStorage.getItem('pedido_completo')));
        
        setLoad(false);
    }
  });

  React.useEffect(()=>{ //Se ejecuta siempre que cambie el valor order
    onlyProduct(order).forEach(element => {
      arrayOnlyProduct.push(element)
    }); 
  },[order]);

  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana

  React.useEffect(() => {//Se ejecuta siempre que el tamaño de la pantalla cambie
    const updateWidth = () => {
      const width = document.body.clientWidth;
      setWidthWindows(width);
    };
    updateWidth();    
    window.addEventListener("resize", updateWidth);
  }, []);

  const addIdForIndex = index => (event)=>{
    arrayOnlyProduct[index].id_producto = event.target.value;//Guardo el valor en id_producto en el indice dado
    
    if (arrayOnlyProduct.find(x=>x.id_producto =="")) { //Si existe un campo vacio pondra el boton invicible
      setDisabled(true)
    }else{
      setDisabled(false)
    }
  }

  const save = () => {
    let productos_con_id = arrayOnlyProduct.slice()
    OrderController.saveOrderProductIds(orderComplete.id_pedido,productos_con_id)
    setDisabled(true);
    setDisabledText(true);
    console.log("guardo pedido con su lista.");
    console.log("lista:",arrayOnlyProduct);
    console.log("id del pedido:",orderComplete.id_pedido);
    handleCloseDialog();
  }

  //Busco el id del producto ingresado 
  const valueForIndex = (index) =>{
    return orderComplete.lista_productos_con_ids[index]
  }

  return (
      <div className={classes.root}>
      <DialogSave 
        open={openDialog} 
        handleClose={handleCloseDialog}
        handleSave={save}
        handleOpenDialog={handleOpenDialog}
      />
        {
          (widthWindow > 700) ? 
          <Table>
          <TableHead >
            <TableRow hover={true}>
              <StyledTableCell>id</StyledTableCell>
              <StyledTableCell>Producto</StyledTableCell>
              <StyledTableCell align="right">Modelo</StyledTableCell>
              <StyledTableCell align="right">Codigo</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {onlyProduct(order).map((row,index) => (
                <TableRow key={index}>
                <TableCell 
                >
                  {index}
                </TableCell>
                <TableCell component="th" scope="row" >
                  <Typography gutterBottom variant="subtitle1">
                    {row.producto}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography gutterBottom variant="subtitle1">
                    {row.modelo}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {
                    (orderComplete.estado === 'INICIAL') ?
                    <TextField 
                    className={classes.TextField} 
                    variant="outlined" 
                    label="Codigo" 
                    multiline 
                    rowsMax="4"
                    onChange={addIdForIndex(index)}
                    disabled={disabledText}
                    />
                    :
                    <TextField 
                    className={classes.TextField} 
                    variant="outlined" 
                    label="Codigo" 
                    multiline 
                    rowsMax="4"
                    //onChange={addIdForIndex(index)}
                    value={valueForIndex(index).id_producto}
                    disabled={true}
                    />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        :
        TableResponsive(order,addIdForIndex,orderComplete,valueForIndex,disabledText)
        }

        <MuiThemeProvider theme={themeMuiProvider}>
            
            <Button 
            onClick={handleOpenDialog} 
            className={classes.buttonRight} 
            color="primary" 
            variant="contained"
            disabled={disabled}
            > 
              Guardar 
            </Button>
        </MuiThemeProvider>
      </div>
  );
}
