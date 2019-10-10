// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// Listen for updates to any `user` document and add field _search.
exports.onUpdateUsers = functions.firestore
    .document('users/{userId}')
    .onUpdate((change, context) => {
        // Retrieve the current and previous value
        const data = change.after.data();
        const previousData = change.before.data();

        // We'll only update if the document has changed.
        // This is crucial to prevent infinite loops.
        if (data.lastUpdate) {
            if (data.lastUpdate === previousData.lastUpdate) return null;
        }

        //const _search = data.nombre +" " +data.apellido + " " +data.email;

        let _search = "";
        if (data.nombre) _search = data.nombre +" ";
        if (data.apellido) _search += data.apellido +" ";
        if (data.numeroDocumento) _search += data.numeroDocumento +" ";
        if (data.localidad) _search += data.localidad +" ";

        // Then return a promise of a set operation to update the count
        return change.after.ref.set({
            "_search":  _search ,
            "lastUpdate": admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    });
// Listen for updates to any `customer` document and add field _search.
exports.onUpdateCustomers = functions.firestore
    .document('customers/{customerId}')
    .onUpdate((change, context) => {
        // Retrieve the current and previous value
        const data = change.after.data();
        const previousData = change.before.data();

        // We'll only update if the document has changed.
        // This is crucial to prevent infinite loops.
        if (data.lastUpdate) {
            if (data.lastUpdate === previousData.lastUpdate) return null;
        }
        

        //const _search = data.nombre +" " +data.apellido + " " +data.email;

        let _search = "";
        if (data.nombre) _search = data.nombre +" ";
        if (data.apellido) _search += data.apellido +" ";
        if (data.numeroDocumento) _search += data.numeroDocumento +" ";
        if (data.localidad) _search += data.localidad +" ";

        // Then return a promise of a set operation to update the count
        return change.after.ref.set({
            "_search":  _search ,
            "lastUpdate": admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    });

