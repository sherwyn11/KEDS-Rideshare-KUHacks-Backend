import { Router } from 'express';
import firebase from 'firebase-admin';
import { db } from '../config/admin.config';

const usersRoute = Router()

usersRoute.get('/get/:eth_address', async function (req, res) {
    let eth_address = req.params.eth_address;
    let result = await db.collection("root").doc("users").get(eth_address);
    let geocode = result.get(eth_address);
    res.json({ geopoint: geocode });
});

usersRoute.put('/update/:eth_address', async function (req, res) {
    try {
        let eth_address = req.params.eth_address;
        let location = new firebase.firestore.GeoPoint(req.body.lat, req.body.lng);
        let updatedLocation = {};
        updatedLocation[eth_address] = location;
        db.collection("root").doc("users").update(updatedLocation);
        res.json({ message: "User location successfully updated!" });
    } catch (e) {
        console.log(e);
        res.json({ err: e });
    }
});

export default usersRoute;