import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import MainMenu from "./views/MainMenu";
import SignIn from './views/LogInScreen/Login';
import DeleteUpdateUserAdmin from "./views/ModulsUserAdmin/Delete-Update-List/index";
import * as serviceWorker from './serviceWorker';
import CreateUserAdm from './views/ModulsUserAdmin/Create/index'; //Componente para registrar un nuevo cliente





class App extends Component 
  {  

  render(){ 
    
    return (
     
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" component={SignIn} exact/>
            <Route path= "/mainMenu" component={MainMenu} />
<<<<<<< HEAD
            <Route path= "/nav" component={Navbar} />
            <Route path= "/bmUsers" component={BMUsers} />
            <Route path= "/registrarCliente" component={Navbar2} />

=======
            <Route path= "/bmUsers" component={DeleteUpdateUserAdmin} />
            <Route path= "/registrarCliente" component={CreateUserAdm} />
           
>>>>>>> ad9d4b8d7c2690665ea1a3c67ca295261b666252
          </React.Fragment>
        </BrowserRouter>
   
    );  
}
}

export default App;

serviceWorker.unregister();
