import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SignIn from './views/Login';
import * as serviceWorker from './serviceWorker';

<<<<<<< HEAD



ReactDOM.render(<App />, document.getElementById('root'));
=======
ReactDOM.render(<SignIn />, document.getElementById('root'));
>>>>>>> 875c936a2a61de21d133bd9a5337ff33d48595fa

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
