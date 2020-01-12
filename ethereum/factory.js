import web3 from './web3';
import CompiledFactory from './build/CampaignFactory.json';

const address = '0x35D8d64433D3c4187968A53A19667Bcc4dA44ce7';

export default new web3.eth.Contract(CompiledFactory.abi, address);