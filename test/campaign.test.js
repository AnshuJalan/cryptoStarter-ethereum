const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider({gasLimit: '8000000'}));

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

const check = async () => {
    //Get accounts
    accounts = await web3.eth.getAccounts();

    //Deploy
    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({data: compiledFactory.evm.bytecode.object})
        .send({from: accounts[0], gas: 5000000});

    //console.log(factory);

    //get address of deployed campaign
    campaignAddress = await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: 5000000
    });

    //Get the campaign
    [campaignAddress] = await factory.methods.getCampaigns().call();
    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);

}

check();


// beforeEach( async () => {
//     //Get accounts
//     accounts = await web3.eth.getAccounts();

//     //Deploy
//     factory = await new web3.eth.Contract(compiledFactory.abi)
//         .deploy({data: compiledFactory.evm.bytecode.object})
//         .send({from: accounts[0], gas: 5000000});

//     //console.log(factory);

//     //get address of deployed campaign
//     campaignAddress = await factory.methods.createCampaign('100').send({
//         from: accounts[0],
//         gas: 5000000
//     });

//     //Get the campaign
//     [campaignAddress] = await factory.methods.getCampaigns().call();
//     campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);

//     console.log(campaignAddress[0]);
// });


// describe('Campaign', () => {
//     it('has been deployed', () => {
//         assert.ok(factory.options.address);
//         assert.ok(campaign.options.address);
//     })

//     // it('allows manager to make a payment request', async () => {
//     //     const paymentRequest = {
//     //         description: "Payment request test",
//     //         value: '100',
//     //         recipient: accounts[1]
//     //     } 

//     //     await campaign.methods.createRequest(paymentRequest.description, paymentRequest.value, paymentRequest.recipient).send({
//     //         from: accounts[0],
//     //         gas: 5000000
//     //     });

//     //     const request = await campaign.methods.requests(0).call();

//     //     assert.ok(request);
//     // })

//     // it('processes requests', async () => {
//     //     //Contribute
//     //     await campaign.methods.contribute().send({
//     //         value: 200,
//     //         from: accounts[1],
//     //         gas: 5000000
//     //     });

//     //     await campaign.methods.contribute().send({
//     //         value: 200,
//     //         from: accounts[2],
//     //         gas: 5000000
//     //     })

//     //     //Make request
//     //     await campaign.methods.createRequest("Test", 200, accounts[3]).send({
//     //         from: accounts[0],
//     //         gas: 5000000
//     //     });

//     //     //Approve request
//     //     await campaign.methods.approveRequest(0).send({
//     //         from: accounts[1],
//     //         gas: 5000000
//     //     })

//     //     await campaign.methods.approveRequest(0).send({
//     //         from: accounts[2],
//     //         gas: 5000000
//     //     })

//     //     const initalBalance = web3.eth.getBalance(accounts[3]);

//     //     //Finalize request
//     //     await campaign.methods.finalizeRequest(0).send({
//     //         from: accounts[0],
//     //         gas: 5000000
//     //     });

//     //     const finalBalance = web3.eth.getBalance(accounts[3]);

//     //     assert(initalBalance != finalBalance);
//     // })
// })

