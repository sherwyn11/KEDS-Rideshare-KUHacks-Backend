import admin from "firebase-admin";

import serviceAccount from "../../service.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };