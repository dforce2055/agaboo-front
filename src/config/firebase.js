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

import { firebaseConfig } from './firebase-config';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }
    
    async signInWithGoogle() {
        let email = await this.auth.signInWithPopup(this.googleProvider)
            .then((socialAuthUser) => {
                //alert(socialAuthUser.user.uid + socialAuthUser.user.email);
                return socialAuthUser.user.email
            });
        return email;
    }
        
    
    signOut = () => this.auth.signOut();

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName
    }

    getCurrentUserPhoto() {
        return this.auth.currentUser && this.auth.currentUser.photoURL
    }

}

export default new Firebase()
