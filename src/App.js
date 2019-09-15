import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import MainMenu from "./views/MainMenu";
import Navbar from "./views/Navigation";
import * as serviceWorker from './serviceWorker';
import SignIn from './views/Log In Screen/Login';
import BMUsers from './views/BM-UsersScreen/BMUsers';





class App extends Component 
  {  

  render(){ 
    
    return (
     
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" component={SignIn} exact/>
            <Route path= "/mainMenu" component={MainMenu} />
            <Route path= "/nav" component={Navbar} />
            <Route path= "/BMUsers" component={BMUsers}/>      
           
          </React.Fragment>
        </BrowserRouter>
   
    );  
}
}

export default App;

serviceWorker.unregister();
