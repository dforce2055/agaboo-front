import React,{useState} from 'react';
import Navbar from '../Header/Navigation'
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import SimpleBottomNavigation from '../Footer/Footer';
import {MuiThemeProvider, createMuiTheme ,makeStyles} from '@material-ui/core/styles';
import { Paper,CardHeader,Grid } from '@material-ui/core';
import IndexTable from './Table/index.js';
import Filter from './Filter/index.js';
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
    const [state, setState] = React.useState({input:'',select:''});
    const [updateList,setUpdateList] = React.useState(false);

    //Se realizara la query para poder pasar la informacion a sus hijos

    React.useEffect(()=>{//Si cambio de estado un pedido se recargara la pagina
        if (updateList) {
            OrderController.getOrders()
            .then(result =>{
                setOrders(result)
                setUpdateList(false)
            })
            setUpdateList(false)
        }
    })

    React.useEffect(()=>{
       if (state.select != '') {
        OrderController.filterByState(state.select)
            .then(result=>{
               setOrders(result)
            })
        }else{
            OrderController.getOrders()
            .then(result =>{
            setOrders(result);
            }); 
        }
    },[state]);
  
  const ChangeOrders = newOrder =>{
      setOrders(newOrder);
  }

  const updateArray = () =>{
      setUpdateList(true)
  }
  const handleChangeFilter = name => event => {
    setState({...state,[name]:event.target.value});
  };
  
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
                alignItems="baseline" 
            >
                <Filter
                    state={state}
                    setState={setState}
                    handleChangeFilter={handleChangeFilter}
                />
            </Grid> 
            </div>         

            <Paper className={classes.espacio}>
                <IndexTable
                    orders={orders}
                    handleChangeFilter={handleChangeFilter}
                    updateArray={updateArray}
                />
            </Paper>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(OrderReady);