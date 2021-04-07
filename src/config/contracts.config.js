import Web3 from 'web3';
import RideManager from '../contracts/RideManager.json';

let accounts;
let contract;
var web3;

const initContract = async () => {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    }

    contract = new web3.eth.Contract(RideManager.abi, '0x76105917F3a4B6D95676c7A2FD80c2EF19d7d879');
}

const getContractandAccount = () => {
    return { accounts, contract };
}

export { initContract, getContractandAccount };

