import React, { useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route  } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from "./views/HomePage/HomePage";
import MainMenu from "./views/MainMenu/MainMenu";
import LogIn from './views/LogIn/Login';
import SignIn from './views/Register/Register';
import DeleteUpdateUserAdmin from "./views/ModulsUserAdmin/Delete-Update-List/index";
import * as serviceWorker from './serviceWorker';
import CreateUserAdm from './views/ModulsUserAdmin/Create/index'; //Componente para registrar un nuevo cliente
import CreateOrder from './views/ModulOrders/Create/createOrder';
import indexProduct from './views/ModuleProduct/index';
import ProductForm from './views/ModuleProduct/RegisterProduct'
import Checkout from './views/ModulOrders/Create/createOrderFinal';
import CustomizedTables from './views/ModuleProduct/TableProducts';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'

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
          <React.Fragment>
            <Route path="/" component={HomePage} exact/>
            <Route path="/register" component={SignIn} exact/>
            <Route path="/login" component={LogIn} exact/>
            <Route path= "/mainMenu" component={MainMenu} />
            {/* <Route path= "/nav" component={Navbar} /> */}
            <Route path= "/bmUsers" component={DeleteUpdateUserAdmin} />
            <Route path= "/registrarCliente" component={CreateUserAdm} />
            <Route path= "/createProduct" component={ProductForm} />
            <Route path= "/tableProduct" component= {CustomizedTables}/>
            <Route path= "/registrarPedido" component={Checkout} />
          </React.Fragment>
        </BrowserRouter>
    </MuiThemeProvider>
    ) : <div id="loader"><CircularProgress /></div>
}
serviceWorker.unregister();