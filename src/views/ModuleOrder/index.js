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