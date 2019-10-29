import React, { useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route  } from "react-router-dom";
import {Provider} from 'react-redux'; // Librería de react para poder utilizar redux
import store from  './redux/store' ;
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from "./views/HomePage/HomePage";
import MainMenu from "./views/MainMenu/MainMenu";
import LogIn from './views/LogIn/Login';
import DeleteUpdateUserAdmin from "./views/ModulsUserAdmin/Delete-Update-List/index";
import * as serviceWorker from './serviceWorker';
import CreateUserAdm from './views/ModulsUserAdmin/Create/index'; //Componente para registrar un nuevo cliente¿
import CreateUserAdmOK from './views/ModuleUserOK/Create/index';
import ListUsers from './views/ModuleUserOK/ListUsers/index';
import indexCreateProduct from './views/ModuleProduct/Create/index'
import indexUpdateProduct from './views/ModuleProduct/Update/index';
import CreateOrder from './views/ModulOrders/Create/index';
import OrderReady from './views/ModulOrders/Ready/index';
import DeleteOrder from './views/ModulOrders/Delete/index';
import Stock from './views/ModuleProduct/Stock/index'; 


import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles' ;
import { CssBaseline, CircularProgress } from '@material-ui/core';

import firebase from '../src/config/firebase';

const theme = createMuiTheme();


export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val)
    })
  })
  // Consulto si se inicializo firebase
  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
        <Provider store = {store}>
            <React.Fragment>
                <Route path="/" component={HomePage} exact/>
                <Route path="/login" component={LogIn} exact/>
                <Route path= "/mainMenu" component={MainMenu} />
                <Route path="/registrar-usuario" component={CreateUserAdmOK} />
                <Route path="/usuarios" component={ListUsers} />
                <Route path= "/bmUsers" component={DeleteUpdateUserAdmin} />
                <Route path= "/registrarCliente" component={CreateUserAdm} />
                <Route path= "/createProduct" component={indexCreateProduct} />
                <Route path= "/tableProduct" component= {indexUpdateProduct}/>
                <Route path= "/registrarPedido" component={CreateOrder} />
                <Route path= "/pedidosListos" component={OrderReady} />
                <Route path= "/eliminarPedidos" component={DeleteOrder} />
                <Route path= "/stock" component={Stock} />
            </React.Fragment>
          </Provider> 
        </ BrowserRouter>
    </MuiThemeProvider>
    ) : <div id="loader"><CircularProgress /></div>
}
serviceWorker.unregister();