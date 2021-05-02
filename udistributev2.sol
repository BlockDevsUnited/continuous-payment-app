pragma solidity ^0.8.0;

abstract contract ERC20 {
    function balanceOf(address who) public virtual view returns (uint256);
    function transfer(address to, uint256 value) public virtual returns (bool);
    function transferFrom(address from, address to, uint256 value) public virtual returns (bool);
}

contract uDistributeV2 {
    address UCASHAddress = 0x0f54093364b396461AAdf85C015Db597AAb56203;
    struct distribution{
        address recipient;
        uint start;             //start of distribution
        uint initialPeriod;     //initial waiting period which must elapse
        uint p;                 //period
        uint a;                 //amount per period
        uint touchpoint;        //Withdrawal touch point, when the initial waiting period has ended, or the last withdrawal has occured
        uint totalAmount;       //totalAmount Distributed
    }

    event Distribution(address distributor, address recipient, uint index, uint amount);
    event Withdrawal(address recipient, uint index, uint amount);

    mapping(address => distribution[]) public distributions;

    function distribute(address recipient,uint initialPeriod,uint p,uint a, uint totalAmount) public{
        ERC20(UCASHAddress).transferFrom(msg.sender,address(this),totalAmount);
        distributions[recipient].push(distribution(recipient,block.timestamp,initialPeriod,p,a,block.timestamp+initialPeriod,totalAmount));

        emit Distribution(msg.sender,recipient,numDistributions(recipient),totalAmount);
    }

    function withdraw(uint index) public{
        require(index<numDistributions(msg.sender), "Requested distribution does not exist");
        uint toWithdraw = getWithdrawable(msg.sender,index);

        require(toWithdraw>0,"Nothing to Withdraw");

        ERC20(UCASHAddress).transfer(msg.sender,toWithdraw);

        distributions[msg.sender][index].touchpoint = block.timestamp;
        distributions[msg.sender][index].totalAmount -= toWithdraw;

        emit Withdrawal(msg.sender,index,toWithdraw);
    }

    function getWithdrawable(address recipient,uint index) public view returns (uint){
        distribution memory d = distributions[recipient][index];
        uint toWithdraw;
        uint elapsedPeriods;

        elapsedPeriods = (block.timestamp - d.touchpoint)/d.p;

        if(elapsedPeriods<=0){
            return(0);
        }

        toWithdraw = d.a*elapsedPeriods;

        if(toWithdraw>d.totalAmount){
            return(d.totalAmount);
        }

        return(toWithdraw);
    }

    function numDistributions(address recipient) public view returns(uint) {
        return distributions[recipient].length;
    }
}
