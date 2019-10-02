import firebase from "firebase";

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

const config = {
  apiKey:'AIzaSyDLVYnr_2LjpA8aYS8ycRUllV5DTudWs7Q',
  authDomain:'agaboodb.firebaseapp.com',
  databaseURL:'https://agaboodb.firebaseapp.com',  
  storageBucket: 'agaboodb.firebaseio.appspot.com',
  projectId:'agaboodb',
  messaginSendID:'892253944017'
};


const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
db.settings({timestampsInSnapshots:true});
export { db, firebaseApp };