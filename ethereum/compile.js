const solc = require('solc');
const path = require('path');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'Task': {
            content: source,
         },
      },
      settings: { 
        outputSelection: {
            '*': {
                '*': ['*'],   
            },
        },
    }
  };
  
const output =  JSON.parse(solc.compile(JSON.stringify(input))).contracts['Task'];

fs.ensureDirSync(buildPath);

for(let contract in output)
{
    fs.outputJsonSync(path.resolve(buildPath, contract + '.json'), 
        output[contract]);
}