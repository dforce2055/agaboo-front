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
    background: 'linear-gradient(45deg, #2c7369 20%, #3fb5a5 90%)',
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
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
}));

export default function CustomizedTables(props) {
  const {rows,setRows} = props;
  const {value, setValue} = props;
  const [count, setCount] = useState(0);
  const {update, setUpdate} = props;

  const classes = useStyles();
  const array =[] 
  const typesProduct = ["Baño Químico", "Oficina", "Boletería", "Garita"]
  
  

  async function getProducts(){
    const products = await ProductController.getProductsByState(value);
    let product;
    for(let idx = 0 ; idx < typesProduct.length ; idx++  ){
      //console.log("typesProducts : ", typesProduct.length )

      product = typesProduct[idx] ;
      setCount(countProducts( product, products)); // traigo la cantidad del mismo tipo
      array.push({"product" : product, "value" : value, "count" : count}) 
    };// Revisar Mañana

      // const product = "Baño Químico" ;
      // setCount(countProducts( product, products)); // traigo la cantidad del mismo tipo
      // array.push({"product" : product, "value" : value, "count" : count}) 
    
    


    console.log("Array :" , array) 
    if( update ){
      
      setRows(array);
      setUpdate(false); 
      console.log("products :" , rows);  
    }

  };
  console.log('Rows despues de getProducts: ', rows);

  function countProducts(product, array){

    let count = 0;
    let i = 0;
    while(i < array.length) {
      if(product === array[i].type){
        count++ ;
      }
      i++;
    }
    console.log("Count dentro de countProduct() : " , count);

    return count;
  }

  // function getArray(newArray){
  //   console.log('getArray :',  newArray);
  //   setRows(newArray);
  //   console.log('Rows en table products: ' , rows);
  //   getProducts();
  // };
  


  useEffect(() => {
    getProducts();


    if( array !== rows){
     // setRows(array);
      
    }

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
        {/* <Button label = {'Volver'} onClick={()=> history.push('/mainMenu')}/> */}
      </React.Fragment>         
        
    
    
  );
}
