import React , { useEffect , useState}from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ProductController from '../../../controllers/Product';



const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3fb5a5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
}));

export default function CustomizedTables(props) {
  const {rows,setRows} = props;
  const {value, setValue} = props;
  const {update, setUpdate} = props;

  const classes = useStyles();
  const array = [] 
  const typesProduct = ["Baño Químico", "Oficina", "Boletería", "Garita"] // Hardcode de los tipos de productos
  
  

  async function getProducts(){
    if( update ){

      const products = await ProductController.getProductsByState(value);
      let product;
      let count ;

      for(let idx = 0 ; idx < typesProduct.length ; idx++  ){
        product = typesProduct[idx] ;
        count = countProducts( product, products); // traigo la cantidad del mismo tipo
        array.push({"product" : product, "value" : value, "count" : count}) 
      };
      
      setRows(array);
      setUpdate(false); 
    }

  };

  function countProducts(product, array){ // Funcion para contar Productos

    let count = 0;
    let i = 0;
    while(i < array.length) {
      if(product === array[i].type){
        count++ ;
      }
      i++;
    }

    return count;
  }


  useEffect(() => {
    getProducts();
  });
  
  return (
      <React.Fragment>
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <StyledTableCell align= "justyfy">Producto</StyledTableCell>
                    <StyledTableCell align="justyfy">Estado</StyledTableCell>
                    <StyledTableCell align="justyfy">Cantidad</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map(row => (
                    <StyledTableRow key={row.typeProduct}>
                    <StyledTableCell component="th" scope="row">
                      
                      {row.product}
                    </StyledTableCell>
                    <StyledTableCell align="justyfy">{row.value}</StyledTableCell>
                    <StyledTableCell align="justyfy">{row.count}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </Paper>
      </React.Fragment>         
        
    
    
  );
}
