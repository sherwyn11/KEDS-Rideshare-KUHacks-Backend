import { Router } from 'express';
import firebase from 'firebase-admin';
import { db } from '../config/admin.config';

const driversRoute = Router()

driversRoute.get('/get', async function (req, res) {
    
    db.collection("drivers").get().then((data) => {
        data.forEach(d=>{console.log(d.data())})
    });
});

driversRoute.put('/update/:eth_address', async function (req, res) {
    try {
        let eth_address = req.params.eth_address;
        let location = new firebase.firestore.GeoPoint(req.body.lat, req.body.lng);
        let updatedLocation = {};
        updatedLocation[eth_address] = location;
        db.collection("root").doc("drivers").update(updatedLocation);
        res.json({ message: "Driver location successfully updated!" });
    } catch (e) {
        console.log(e);
        res.json({ err: e });
    }
});

export default driversRoute;