import firebase from "firebase";
import firebaseConfig from "./firebase-config";

/**
 * acá va tu config de Firebase, en un archivo firebase-config.js ignorado por git
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

const config = firebaseConfig;


const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
export { db, firebaseApp };