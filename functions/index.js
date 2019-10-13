// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

//if a new document is created in the users collection, add the field _search.
exports.createUser = functions.firestore
    .document('users/{userId}')
    .onCreate((snap, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newDocument = snap.data();

       /* // Only edit data when it is first created.
        if (change.before.exists()) {
            return null;
        }
        // Exit when the data is deleted.
        if (!change.after.exists()) {
            return null;
        }*/

        console.log(`Un nuevo documento fue agregado a la colección`);
        // perform desired operations ...
        let _search = "";
        if (newDocument.nombre) _search = newDocument.nombre + " ";
        if (newDocument.apellido) _search += newDocument.apellido + " ";
        if (newDocument.numeroDocumento) _search += newDocument.numeroDocumento + " ";
        if (newDocument.localidad) _search += newDocument.localidad + " ";

        console.log(`Se creo el campo _search con los siguentes datos ${ _search }`);

        // Then return a promise of a set operation to create de document
        return snap.ref.set({
            "_search": _search,
            "lastUpdate": admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    });
// Listen for updates to any `user` document and add field _search.
exports.onUpdateUsers = functions.firestore
    .document('users/{userId}')
    .onUpdate((change, context) => {
        // Retrieve the current and previous value
        const data = change.after.data();
        const previousData = change.before.data();

        // We'll only update if the document has changed.
        // This is crucial to prevent infinite loops.
        
        if (data.nombre === previousData.nombre &&
            data.apellido === previousData.apellido &&
            data.numeroDocumento === previousData.numeroDocumento &&
            data.localidad === previousData.localidad) {

            return null;
        }

       
        let _search = "";
        if (data.nombre) _search = data.nombre +" ";
        if (data.apellido) _search += data.apellido +" ";
        if (data.numeroDocumento) _search += data.numeroDocumento +" ";
        if (data.localidad) _search += data.localidad +" ";

        // Then return a promise of a set operation to update the user
        return change.after.ref.set({
            "_search":  _search ,
            "lastUpdate": admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    });
//if a new document is created in the customers collection, add the field _search.
exports.createCustomer = functions.firestore
    .document('customers/{customerId}')
    .onCreate((snap, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newDocument = snap.data();

        /* // Only edit data when it is first created.
         if (change.before.exists()) {
             return null;
         }
         // Exit when the data is deleted.
         if (!change.after.exists()) {
             return null;
         }*/

        console.log(`Un nuevo documento fue agregado a la colección`);
        // perform desired operations ...
        let _search = "";
        if (newDocument.nombre) _search = newDocument.nombre + " ";
        if (newDocument.apellido) _search += newDocument.apellido + " ";
        if (newDocument.numeroDocumento) _search += newDocument.numeroDocumento + " ";
        if (newDocument.localidad) _search += newDocument.localidad + " ";

        console.log(`Se creo el campo _search con los siguentes datos ${_search}`);

        // Then return a promise of a set operation to create de document
        return snap.ref.set({
            "_search": _search,
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

        if (data.nombre === previousData.nombre &&
            data.apellido === previousData.apellido &&
            data.numeroDocumento === previousData.numeroDocumento &&
            data.localidad === previousData.localidad) {

            return null;
        }


        let _search = "";
        if (data.nombre) _search = data.nombre + " ";
        if (data.apellido) _search += data.apellido + " ";
        if (data.numeroDocumento) _search += data.numeroDocumento + " ";
        if (data.localidad) _search += data.localidad + " ";

        console.log(`Se creo el campo _search con los siguentes datos ${_search}`);
        // Then return a promise of a set operation to update the customer
        return change.after.ref.set({
            "_search": _search,
            "lastUpdate": admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    });