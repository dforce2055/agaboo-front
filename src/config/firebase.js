<<<<<<< HEAD
import firebase from "firebase";
import firebaseConfig from "./firebase-config";

=======
>>>>>>> 7e5babdb8750e09c2e2827abb76ba7140369710b
/**
 *                          ===================
 *                          | IMPORTANTE LEER |
 *                          ===================
 * acá va tu config de Firebase, en un archivo firebase-config.js ignorado por git
 * EN ESTA MISMA CARPETA DE COFIG, EXPORTAR LA VARIABLE CON EL NOMBRE firebaseConfig
 * export const firebaseConfig = {
 *   apiKey: "apiKey",
 *   authDomain: "TU-DOMINIO.firebaseapp.com",
 *   databaseURL: "https://TU-DOMINIO.firebaseio.com",
 *   projectId: "TU-DOMINIO",
 *   storageBucket: "TU-DOMINIO.appspot.com",
 *   messagingSenderId: "MENSAJE_ID",
 *   appId: "appID"
 *   };
 *
 */

<<<<<<< HEAD
const config = firebaseConfig;
=======
import firebase from "firebase";
import {firebaseConfig}  from './firebase-config';
>>>>>>> 7e5babdb8750e09c2e2827abb76ba7140369710b


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db, firebaseApp };