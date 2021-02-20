import Web3 from 'web3';
import contract from 'truffle-contract';
import RideManager from '../contracts/RideManager.json';

let accounts;
let lms;
var web3;

const initContract = async () => {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    }

    const LMS = contract(RideManager, '0x49dae11aEc6AD035a6c312Be4Ae35Af71f04a928');
    LMS.setProvider(web3.currentProvider);

    accounts = await web3.eth.getAccounts();
    lms = await LMS.deployed();
}

const getLMSandAccount = () => {
    return { accounts, lms };
}

export { initContract, getLMSandAccount };

