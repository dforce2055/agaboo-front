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

import firebase from "firebase";
import {firebaseConfig}  from './firebase-config';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db, firebaseApp };