import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import MainMenu from "./views/MainMenu";
import Navbar from "./views/ModulsUserAdmin/Delete-Update-List/Navigation";
import SignIn from './views/LogInScreen/Login';
import BMUsers from "./views/ModulsUserAdmin/Delete-Update-List/indexUserAdm";
import * as serviceWorker from './serviceWorker';
import Navbar2 from './views/ModulsUserAdmin/Create/Navigation'; //Componente para registrar un nuevo cliente

class App extends Component 
  {  

  render(){ 
    
    return (
     
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" component={SignIn} exact/>
            <Route path= "/mainMenu" component={MainMenu} />
            <Route path= "/nav" component={Navbar} />
            <Route path= "/bmUsers" component={BMUsers} />
            <Route path= "/registrarCliente" component={Navbar2} />
           
          </React.Fragment>
        </BrowserRouter>
   
    );  
}
}

export default App;

serviceWorker.unregister();
