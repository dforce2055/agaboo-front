import React, { useState, useEffect} from 'react';
import AuthContextProvider from './views/contexts/AuthContext';
import './App.css';
import { BrowserRouter, Route  } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from "./views/HomePage/HomePage";
import MainMenu from "./views/MainMenu/MainMenu";
import LogIn from './views/LogIn/Login';
import DeleteUpdateUserAdmin from "./views/ModuleCustomer/index";
import * as serviceWorker from './serviceWorker';
import CreateUserAdm from './views/ModuleCustomer/Create/index'; //Componente para registrar un nuevo cliente¿
import CreateUserAdmOK from './views/ModuleUser/Create/index';
import ListUsers from './views/ModuleUser/ListUsers/index';
import indexCreateProduct from './views/ModuleProduct/Create/index'
import indexUpdateProduct from './views/ModuleProduct/Update/index';
import CreateOrder from './views/ModuleOrder/Create/index';
import OrderReady from './views/ModuleOrder/index';
import DeleteOrder from './views/ModuleOrder/Delete/index';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

import firebase from '../src/config/firebase';
import LoaderScreen from './views/LoaderScreen/LoaderScreen';

import AccountStatus from './views/ModuleOrder/AccountStatus/index';
import Service from './views/ModuleService/Index.js'
import OrderDetail from './views/ModuleOrder/Table/OrderDetail/index'
import newCustomer from './views/ModuleCustomer/newCustomer';
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
      <AuthContextProvider>
        <BrowserRouter>
            <React.Fragment>
                <Route path="/" component={HomePage} exact/>
                <Route path="/login" component={LogIn} exact/>
                <Route path= "/mainMenu" component={MainMenu} />
                <Route path="/registrar-usuario" component={CreateUserAdmOK} />
                <Route path="/usuarios" component={ListUsers} />
                <Route path="/usuarios-new" component={newCustomer} />
                <Route path= "/tablaClientes" component={DeleteUpdateUserAdmin} />
                <Route path= "/registrarCliente" component={CreateUserAdm} />
                <Route path= "/createProduct" component={indexCreateProduct} />
                <Route path= "/tableProduct" component= {indexUpdateProduct}/>
                <Route path= "/registrarPedido" component={CreateOrder} />
                <Route path= "/pedidosListos" component={OrderReady} />
                <Route path= "/eliminarPedidos" component={DeleteOrder} />
                <Route path = "/EstadoDeCuenta" component={AccountStatus}/>
                <Route path = "/servicios" component={Service}/>
                <Route path = "/orderDetail" component={OrderDetail}/>
            </React.Fragment>
        </BrowserRouter>
      </AuthContextProvider>
    </MuiThemeProvider>
    ) : <LoaderScreen/>
}
serviceWorker.unregister();