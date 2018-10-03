import Web3 from 'web3';

// Use MetaMask's provider
const provider = window.web3.currentProvider;
provider.enable();
const web3 = new Web3(provider);

export default web3;

