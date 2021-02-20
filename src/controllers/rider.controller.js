import { getLMSandAccount } from '../config/contracts.config';

const riderRegisterController = (req, res) => {
    let user = req.body.user;
    let { accounts, lms } = getLMSandAccount();

    try {
        lms.getRiderInfo(user.account, { from: user.account })
            .then((data) => {
                res.status(200).send({ "status": "success", data });
            })
            .catch(err => {
                res.status(500).send({ "status": "Failed" });
            });
    } catch {
        res.status(500).send({ "status": "Failed" });
    }

}

export { riderRegisterController };