import React from 'react';
import { MagicSpinner } from "react-spinners-kit";
import argenbath from '../img/logo-argenbath.png';
import './Loader.css'


export default function LoaderScreen(){

    return(
        <div>
            <img src = {argenbath}/>
            <div id="loader"><MagicSpinner color={'#303f9f'}/></div>
        </div>
    )
} 