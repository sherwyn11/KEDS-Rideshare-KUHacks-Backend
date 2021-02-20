import { getLMSandAccount } from '../config/contracts.config';
import { db } from '../config/admin.config';
import { isPointWithinRadius } from 'geolib';


const getAllDriversGeoPoints = () => {
    return new Promise(async function (resolve, reject) {
        let drivers = await db.collection("drivers").get();
        let driverArr = [];
        drivers.forEach(d => {
            driverArr.push({ ethAddress: d.data().ethAddress, geoLocation: d.data().geoLocation });
        })
        resolve(driverArr);
    });
}

const getDriverInfo = (lms, acc, mainAct) => {
    return new Promise(async function (resolve, reject) {
        lms.getDriverInfo(acc, { from: mainAct })
            .then(async (info) => {
                resolve(info);
            })
            .catch(err => {
                console.log({ "status": "Failed" });
            });
    });
}

const getAvailableDrivers = (lms, mainAct) => {
    return new Promise(async function (resolve, reject) {
        lms.returnDriversAvailable({ from: mainAct })
            .then(async (drivers) => {
                let driverArrNew = [];
                for (let d of drivers) {
                    driverArrNew.push(await getDriverInfo(lms, d, mainAct));
                }
                resolve(driverArrNew);
            })
            .catch(err => {
                console.log({ "status": "Failed" });
            });
    });
}

const manipulate = (data) => {
    let temp = [];
    for (let d of data) {
        temp.push({
            'name': d[0],
            'contact': d[1],
            'email': d[2],
            'carNo': d[3],
            'seats': d[4],
            'rating': d[5],
            'status': d[7],
            'ethAddress': d[8]
        });
    }
    return temp;
}

const checkLoc = (drivers, user) => {
    let temp = []
    for (let driver of drivers) {
        let decision = isPointWithinRadius(
            { latitude: driver.geoLocation.latitude, longitude: driver.geoLocation.longitude },
            { latitude: user.latitude, longitude: user.longitude },
            8000
        );
        if (decision) temp.push(driver['ethAddress']);
    }
    return temp;
}

const checkIfDriverFree = (drivers, status) => {
    let temp = status.filter((element) => {
        return element.status === '0' && drivers.includes(element['ethAddress'])
    });

    return temp;
}


const requestRide = async (req, res) => {
    let user = req.body.user;
    let { lms } = getLMSandAccount();

    try {
        let driverData = await getAllDriversGeoPoints();
        let data = await getAvailableDrivers(lms, user.account);
        data = manipulate(data);
        let drivers = checkLoc(driverData, user);
        let selectedDrivers = checkIfDriverFree(drivers, data);

        res.status(200).send({ selectedDrivers: selectedDrivers });
    } catch (e) {
        console.log(e);
        res.status(500).send({ "status": "Failed" });
    }

}

export { requestRide };