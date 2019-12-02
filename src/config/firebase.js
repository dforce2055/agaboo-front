    
import { firebaseConfig } from './firebase-config';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import UserController from '../controllers/User';
//import 'firebase-admin';
/*
let firebaseConfig;
if (process.env.NODE_ENV === 'test') {
    firebaseConfig = process.env.FIREBASE_CONFIG;
} else {
    firebaseConfig = process.env.FIREBASE_CONFIG_GITLAB;
}
*/
 
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.googleProvider = new app.auth.GoogleAuthProvider();
        //this.admin = require("firebase-admin");
        this.userValidated = null;
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

    getCurrentEmail() {
        return this.auth.currentUser.email;
    }

    getCurrentUserPhoto() {
        return this.auth.currentUser && this.auth.currentUser.photoURL
    }
    
    async getCurrentUserRole() {
        if (this.userValidated === null) this.userValidated = await UserController.getUserStatusAndRole(this.auth.currentUser.email)
        return this.userValidated.role;
    }

}

export default new Firebase()
