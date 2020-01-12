import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined') {
    //In the browser
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
}
else {
    //On the server
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/25f0ffa1065b4c6aa558453503408a5f');
    web3 = new Web3(provider);
}

export default web3;