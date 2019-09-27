import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import MainMenu from "./views/MainMenu";
import SignIn from './views/LogInScreen/Login';
import DeleteUpdateUserAdmin from "./views/ModulsUserAdmin/Delete-Update-List/index";
import * as serviceWorker from './serviceWorker';
import CreateUserAdm from './views/ModulsUserAdmin/Create/index'; //Componente para registrar un nuevo cliente
import CreateOrder from './views/ModulOrders/Create/createOrder';
import ProductForm from './views/ModuleProduct/RegisterProduct';
import TableProduct from './views/ModuleProduct/TableProducts';






class App extends Component 
  {  

  render(){ 
    
    return (
     
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" component={SignIn} exact/>
            <Route path= "/mainMenu" component={MainMenu} />
            {/* <Route path= "/nav" component={Navbar} /> */}
            <Route path= "/bmUsers" component={DeleteUpdateUserAdmin} />
            <Route path= "/registrarCliente" component={CreateUserAdm} />
            <Route path= "/createProduct" component={ProductForm} />
            <Route path= "/tableProduct" component= {TableProduct}/>
          </React.Fragment>
        </BrowserRouter>
   
    );
}
}

export default App;

serviceWorker.unregister();
