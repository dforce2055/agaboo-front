import firebase from "firebase";

// Acá va la config de tu firebase
const firebaseConfigDforce = {
    apiKey: "AIzaSyBWyiW40BmzESznSeF__4xnX2xyLEceV-4",
    authDomain: "agaboodforce.firebaseapp.com",
    databaseURL: "https://agaboodforce.firebaseio.com",
    projectId: "agaboodforce",
    storageBucket: "agaboodforce.appspot.com",
    messagingSenderId: "773704679477",
    appId: "1:773704679477:web:0e58f47db6e7671aeb717c"
};
const firebaseConfigFrancisco = {
    apiKey: "AIzaSyDZlLzbUPiXEscYPqEtY3G1o2HIqNSWO0E",
    authDomain: "agaboofront-francisco.firebaseapp.com",
    databaseURL: "https://agaboofront-francisco.firebaseio.com",
    projectId: "agaboofront-francisco",
    storageBucket: "",
    messagingSenderId: "817185700205",
    appId: "1:817185700205:web:89d2bcbc26586291fb8264"
};

const firebaseApp = firebase.initializeApp(firebaseConfigDforce);
const db = firebaseApp.firestore();

export { db, firebaseApp };