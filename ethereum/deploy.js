const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

//Provider setup
const provider = new HDWalletProvider(
    'mystery ankle labor dove vibrant minute since plunge warm find two foot',
    'https://rinkeby.infura.io/v3/25f0ffa1065b4c6aa558453503408a5f'
);

const web3 = new Web3(provider);

//Get the compiled file
const compiledFactory = require('./build/CampaignFactory.json');

const interface = compiledFactory.abi;
const bytecode = compiledFactory.evm.bytecode.object;

let accounts;
let factory;

const deploy = async () => {

    //Get the accounts
    accounts = await web3.eth.getAccounts();

    console.log('Deploying from: ', accounts[0]);

    //Deploy
    factory = await new web3.eth.Contract(interface)
        .deploy({ data: '0x' + bytecode })
        .send({ from: accounts[0] });

    console.log('Contract deployed to: ', factory.options.address);
}

deploy();