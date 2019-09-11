import React, {Component} from 'react';
//import Navbar from './Navigation';
import ButtonClient from './ButtonClient';
import ButtonProduct from './ButtonProduct';
import ButtonStock from './ButtonStock';
import ButtonOrder from './ButtonOrder';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './MainMenu.css';
import Navbar from './BM-UsersScreen/AppBarAlt';
import ButtonSimple from './ButtonSimple';




class MainMenu extends Component
{
    render()
    {
        return(
            <div>
                 <Navbar/>
                <div  className = {"Button"}><ButtonClient /></div>
                <div  className = {"Button"}><ButtonProduct/></div>
                 <div  className = {"Button"}><ButtonStock/></div>
                 <div  className = {"Button"}><ButtonOrder/></div>
                 <div  className = {"Button"}><ButtonSimple nombre = {'Estado de cuenta'/*Utilizo los props para reutilizar el boton simple*/}/></div>
                 <div  className = {"Button"}><ButtonSimple nombre = {'Mantenimientos a realizar'}/></div>
            </div>
           
            
            
            )
    }
}

export default MainMenu;