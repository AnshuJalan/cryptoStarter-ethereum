pragma solidity >=0.4.22;

contract CampaignFactory{
    Campaign[] public deployedCampaigns;
    
    function createCampaign(uint minContrib) public
    {
        Campaign newCampaign = new Campaign(minContrib, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getCampaigns() public view returns(Campaign[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{
    
    struct Request{
      string description;
      uint value;
      address payable recipient;
      bool completed;
      uint approvalCount;
      mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minContrib;
    mapping(address => bool) public approvers;
    uint public noOfApprovers;
    
    constructor(uint min, address creator) public{
        manager = creator;
        minContrib = min;
        noOfApprovers = 0;
    }
    
    function contribute() public payable{
        require(msg.value > minContrib, "");
        
        if(!approvers[msg.sender])
        {   
            approvers[msg.sender] = true;
            noOfApprovers++;
        }
    }  
    
    function createRequest(string memory description, uint value, address payable recipient) public restricted
    {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            completed: false,
            approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        require(approvers[msg.sender] && !requests[index].approvals[msg.sender], "");
        
        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted{
        require(!requests[index].completed, "");
        require(requests[index].approvalCount > noOfApprovers / 2, "");
        require(requests[index].value < (address(this).balance), "");
        
        requests[index].completed = true;
        requests[index].recipient.transfer(requests[index].value);
    }

    function getSummary() public view returns(uint, uint, uint, uint, address)
    {
        return(
            minContrib,
            address(this).balance,
            requests.length,
            noOfApprovers,
            manager
        );
    } 

    function getRequestsCount() public view returns(uint){
        return( requests.length );
    }
    
    modifier restricted(){
        require(msg.sender == manager, "");
        _;
    }
}