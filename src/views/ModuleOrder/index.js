import React,{useState} from 'react';
import Navbar from '../Header/Navigation'
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import SimpleBottomNavigation from '../Footer/Footer';
import {MuiThemeProvider, createMuiTheme ,makeStyles} from '@material-ui/core/styles';
import { Paper,CardHeader,Grid } from '@material-ui/core';
import IndexTable from './Table/index.js';
import Filters from './Filter/index.js';
import OrderController from '../../controllers/Order.js';

const useStyles = makeStyles(theme => ({
    root:{
        flexGrow: 1,
    },
    espacio:{
      margin: theme.spacing(3),
    }
  }));

function OrderReady(props) {
    const classes = useStyles();
    const [orderFilters,setOrderFilters] = useState([]);
    const [orders,setOrders] = useState([]);
    const [search, setSearch] = React.useState({input:'',select:''});
    const [updateList,setUpdateList] = React.useState(false);
    const [temporalOrders,setTemporalOrders] = React.useState([]); //Donde matendre el resultado de la busqueda
    const [validador,setValidador] = React.useState(false);
    const [pagination,setPagination] = React.useState(false);

    React.useEffect(()=>{//Si cambio de estado un pedido se recargara la pagina
        if (updateList) {
            OrderController.getOrders()
            .then(result =>{
                console.log("Seguridad");
                setOrders(result)
                setUpdateList(false)
            })
            setUpdateList(false)
            console.log("SLDKNFGKLSADJGLÑASGÑLARGÑ{");
        }

        if (orders.length === 0) {
            OrderController.getOrders().then(result=>{
                if (result) {
                    setOrders(result)
                }
            })
        }

        //Paginado de la tabla pedidos.
        if(pagination === true){ 
            var lastPosition = orders[orders.length-1];
            var orderPag = orders;        
            if (lastPosition) {
                console.log("entre");
                
                OrderController.getOrderPagination(lastPosition.id_pedido)
                .then(result=>{
                    if (result===false) {
                    return;
                    }

                    result.forEach((res) => orderPag.push(res));
                    ChangeOrders(orderPag)
                    setPagination(false);
                });
            }else{
                setPagination(false);
                alert("Por favor establezca conexion a internet.")
            }
        }
    })

    React.useEffect(()=>{
       if (search.select !== '') {
        OrderController.filterByState(search.select)
            .then(result=>{
                console.log("Seguridad");
               setOrders(result)
            })
            console.log("SLDKNFGKLSADJGLÑASGÑLARGÑ{");
        }else{
            OrderController.getOrders()
            .then(result =>{
            console.log("Seguridad");
            setOrders(result);
            }); 
            console.log("SLDKNFGKLSADJGLÑASGÑLARGÑ{");
        }
    },[search]);
  
  const ChangeOrders = newOrder =>{
      setOrders(newOrder);
  }

  const updateArray = () =>{
      setUpdateList(true)
  }
  const handleChangeFilter = name => event => {
    setSearch({...search,[name]:event.target.value});
  };

  const Typeahead = (string) =>{
      if (string) {
          OrderController.Typeahead(string)
            .then(result=>{
                console.log(result);
                setTemporalOrders(result)
                setValidador(true)
            })
      } else {
          setValidador(false)
      }
  }
  
  const Pagination = () => {
    setPagination(true)
  }
  
    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
    }
    return (
        <div className={classes.root}>
            <header>
                <Navbar/>
            </header>
            <Paper className={classes.espacio}>
                <h1>
                    <CardHeader titleTypographyProps = {'titulo'}title="Pedidos" />
                </h1>
            </Paper>
            <div className={classes.espacio}>
            <Grid
                container 
                direction="row" 
                justify="flex-end" 
                alignItems="baseline">
                <Filters
                    Typeahead={Typeahead}
                    search={search}
                    handleChangeFilter={handleChangeFilter}
                />
            </Grid> 
            </div>  

            <Paper className={classes.espacio}>
                {
                    (!validador) ? 
                        <IndexTable
                            Pagination={Pagination}
                            orders={orders}
                            handleChangeFilter={handleChangeFilter}
                            updateArray={updateArray}/>
                    :
                        <IndexTable
                            orders={temporalOrders}
                            handleChangeFilter={handleChangeFilter}
                            updateArray={updateArray}/>
                }
            </Paper>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(OrderReady);