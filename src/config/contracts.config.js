import Web3 from 'web3';
import contract from 'truffle-contract';
import RideManager from '../contracts/RideManager.json';

let accounts;
let lms;
var web3;

const initContract = async () => {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

    const LMS = contract(RideManager, '0xEd5BF8B846DAf73b9BAfD05901AC83c497da7191');
    LMS.setProvider(web3.currentProvider);

    accounts = await web3.eth.getAccounts();
    lms = await LMS.deployed();
}

const getLMSandAccount = () => {
    return { accounts, lms };
}

export { initContract, getLMSandAccount };
