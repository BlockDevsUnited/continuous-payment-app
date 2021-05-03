let persistentProvider
var signer;
var provider;
var ethers;
var utils;
var overrides;
var URPList;

var UDContract, UDContractP; //uDistribute Contract
let TokenContract, TokenContractP;
var UDContractAddress = '0x2f5bCd57878675B3698fCE0a998759F9d25930c0'//'0x84631Db1B39E3Da0938D4FC31c8Cc5d265119b1B';
var UCASHContractAddress = '0x0f54093364b396461AAdf85C015Db597AAb56203';
var UCASHABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "allowed",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "bountyHunter",
				"type": "address"
			},
			{
				"name": "bounty",
				"type": "uint256"
			}
		],
		"name": "payBounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
]
var UDABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "waitTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "period",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountPerPeriod",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "distribute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "Distribution",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "distributions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tokenIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "recipientIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "p",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "touchpoint",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "getRecipientIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getWithdrawable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "numDistributions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "recipientIndexes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "recipientList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "tokenIndexes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

var tokenList

let decimals
let symbol

let eventsD //deposit events
let eventsDU //deposits for user
let eventsW //withdrawal events

async function initialize(){
	await ethereum.enable()

	persistentProvider = await new ethers.providers.JsonRpcProvider('https://eth-ropsten.alchemyapi.io/v2/GhFikNm5T3chbBNnPuUW_paHt6jHqnQD')

	try{
		provider = new ethers.providers.Web3Provider(web3.currentProvider);
		utils = ethers.utils;
	  let accounts = await provider.listAccounts()

	  signer = provider.getSigner(accounts[0]);
	}
	catch {
		signer = persistentProvider
	}


    UDContract = new ethers.Contract(UDContractAddress, UDABI, signer);

		UDContractP = new ethers.Contract(UDContractAddress, UDABI, persistentProvider);
		await getTokenList()
		await loadToken()
		await populateTokenList()
		await displayWalletDetails()

		await getLogs()

		await populateDistributionsTable()
}

async function getTokenList(){
	let end = false
	let o = 1
	tokenList = new Array()
	while(!end){
		try{
			let tokenAddress = await UDContractP.tokenList(o)

			let token = new ethers.Contract(tokenAddress,UCASHABI,persistentProvider)
			tokenList.push(token)
			o++
		} catch{
			end = true
		}
	}
}

async function populateTokenList(){
	let select = document.getElementById('tokenListSelect')

	for (let o =0; o < tokenList.length; o ++ ) {
    option = document.createElement('option');
		option.setAttribute('value', o);
    option.appendChild(document.createTextNode(await tokenList[o].symbol()));
    select.appendChild(option);
	}
}

async function ShowHideTokenSelectElements() {
	let checkbox = document.getElementById("customTokenCheckbox")
	if(checkbox.checked){
		document.getElementById("tokenListSelect").disabled = true
		document.getElementById("tokenAddressInput").disabled = false

	} else {
		document.getElementById("tokenListSelect").disabled = false
		document.getElementById("tokenAddressInput").disabled = true
	}

	await loadToken()
}

async function loadToken(){
	console.log("loading.........")
	let tokenAddress
	let checkbox = document.getElementById("customTokenCheckbox")
	if(checkbox.checked){
		address = document.getElementById("tokenAddressInput").value

		if(ethers.utils.isAddress(address)){
			tokenAddress = address
			document.getElementById("invalidAddressLabel").innerHTML = ""

		} else {
			if(address!=""){
				document.getElementById("invalidAddressLabel").innerHTML = "Invald Address"
			} else {
				document.getElementById("invalidAddressLabel").innerHTML = ""
			}
			return
		}

	} else {

		let sI = document.getElementById("tokenListSelect").selectedIndex
		if(sI==-1){sI=0}
		console.log(sI)
		tokenAddress = tokenList[sI].address
	}

	TokenContract = new ethers.Contract(tokenAddress,UCASHABI,signer)
	TokenContractP = new ethers.Contract(tokenAddress,UCASHABI,persistentProvider)
	try{
		decimals = await TokenContractP.decimals()
		symbol = await TokenContractP.symbol()
	} catch {
		symbol = "unrecognized"
		decimals = 0
	}
	await displayWalletDetails()

}

function showEnd(){
	let endDate

	let ta = document.getElementById("amount").value
	let app = document.getElementById("amountPerPeriod").value

	ta = new ethers.BigNumber.from(ta)			//total amount
	app = new ethers.BigNumber.from(app)			//amount per period
	console.log(ta)
	console.log(app)

	let w = document.getElementById("waitTimeUnit")
	let t = document.getElementById("initialWaitTime").value
	let wt = w.options[w.selectedIndex].value*t;
	wt = ethers.BigNumber.from(wt)		//wait time

	//amountPerPeriod = utils.parseUnits(amountPerPeriod,decimals)

	let l = document.getElementById("periodTimeUnit");
	let i = document.getElementById("interval").value
	let p = l.options[l.selectedIndex].value*i;
	p = ethers.BigNumber.from(p) //Period

	let np = ta.div(app)			//number of periods
	dp = np.mul(p)					//distribution time
	tt = wt.add(dp)					//total time
	tt = tt.mul(1000)

	tt = utils.formatUnits(tt,0)
	tt = parseInt(tt)

	endDate = tt + Date.now()
	endDate = new Date(endDate)

	document.getElementById("EndDate").innerHTML = "Distribution End Date: " + endDate
}

async function create(){
		let address = document.getElementById("address").value
		let amount = document.getElementById("amount").value
		amount = utils.parseUnits(amount,decimals);

		var w = document.getElementById("waitTimeUnit")
		var t = document.getElementById("initialWaitTime").value
		var waitTime = w.options[w.selectedIndex].value*t;
		waitTime = ethers.BigNumber.from(waitTime)

		let amountPerPeriod = document.getElementById("amountPerPeriod").value				//amount Per Period
		amountPerPeriod = utils.parseUnits(amountPerPeriod,decimals)


		var l = document.getElementById("periodTimeUnit");
		var i = document.getElementById("interval").value
		var period = l.options[l.selectedIndex].value*i;								//
		period = ethers.BigNumber.from(period)

		let description = document.getElementById("descriptionInput").value

    await UDContract.distribute(TokenContract.address,address,waitTime,period,amountPerPeriod,amount,description);
}



async function withdraw(){
	//await UReleaseContract.withdrawALL(overrides);
//u = new ethers.Contract("0x2B2AC520eaeb379523E3D6366c009B62a4fcF0c0",DABI,signer)
	await UDContract.withdrawALL(overrides);
}

async function approve(){
	var amount = 	document.getElementById("approveAmount").value;
	amount = utils.parseUnits(amount,decimals)
	await TokenContract.approve(UDContractAddress,amount);
}

async function displayWalletDetails(){
	document.getElementById("selectedTokenHeading").innerHTML = "Selected Token: " + symbol

	var balance = await TokenContract.balanceOf(signer._address)
	var approved = await TokenContract.allowance(signer._address,UDContractAddress)

	balance = utils.formatUnits(balance,decimals);
	approved = utils.formatUnits(approved,decimals);
	balance = utils.commify(balance);
	approved = utils.commify(approved);

	document.getElementById("UCASHBalance").innerHTML = "Balance: "+ balance + " " + symbol
	document.getElementById("UCASHApproved").innerHTML = "Approved: " + approved +  " " + symbol
	document.getElementById('approveTokenToContract').innerHTML = "Approve " + symbol + " to Contract"
}

async function getLogs() {
	console.log("get Event Logs")
	let TopicD = ethers.utils.id("Distribution(address,address,address,uint256,uint256,string)");
	let TopicW = ethers.utils.id("Withdrawal(address,address,uint256,uint256)");
	console.log(TopicD)
	console.log(TopicW)
	let filterD = {
    address: UDContractAddress,
    fromBlock: 9400000 ,
    toBlock: 14400000,
    topics: [ TopicD ]
	}
	let filterW = {
    address: UDContractAddress,
    fromBlock: 9400000 ,
    toBlock: 14400000,
    topics: [ TopicW ]
	}
	let resultD = await persistentProvider.getLogs(filterD)
	let resultW = await persistentProvider.getLogs(filterW)
	console.log(resultD)
	console.log(resultW)
	eventsD = new Array()
	eventsDU = new Array()
	for (n=0;n<resultD.length;n++){
		let log = new Object()
		let data = resultD[n].data
		data = data.substring(2)
		data = data.match(/.{1,64}/g) //divide data from event log into 64 length sections

		for (j=0;j<5;j++){
			data[j] = "0x" + data[j]
		}

		let token = "0x" + data[0].substring(26)
		let distributor = "0x" + data[1].substring(26)
		let recipient = "0x" + data[2].substring(26)
		recipient = ethers.utils.getAddress(recipient)
		let index = ethers.utils.formatUnits(ethers.BigNumber.from(data[3]),0)
		let amount = ethers.utils.formatUnits(ethers.BigNumber.from(data[4]),decimals)
		let description = ""
		for(j = 7; j<data.length;j++){
			description += ethers.utils.toUtf8String("0x" + data[j])
		}
		log.token = token
		log.distributor = distributor
		log.recipient = recipient
		log.index = index
		log.amount = amount
		log.txHash = resultD[n].transactionHash
		log.description = description
		if(signer._address==recipient){
			eventsDU.push(log)
		}
		eventsD.push(log)
}
eventsW = new Array()
for (n=0;n<resultW.length;n++){
	let log = new Object()
	let data = resultW[n].data
	data = data.substring(2)
	data = data.match(/.{1,64}/g) //divide data from event log into 64 length sections
	console.log(data)
	for (j=0;j<4;j++){
		data[j] = "0x" + data[j]
	}

	let token = "0x" + data[0].substring(26)
	let recipient = "0x" + data[1].substring(26)
	let index = ethers.utils.formatUnits(ethers.BigNumber.from(data[2]),0)
	let amount = ethers.utils.formatUnits(ethers.BigNumber.from(data[3]),decimals)
	log.token = token
	log.recipient = recipient
	log.index = index
	log.amount = amount
	log.txHash = resultW[n].transactionHash
	eventsW.push(log)
}
}

async function populateDistributionsTable(){
	var DTable = document.getElementById('DTable'); //table of distributions
	console.log(UDContract)
	let numD = eventsDU.length;
	for(var o=0;o<numD;o++){
			let tA = eventsDU[o].token
			let tC = new ethers.Contract(tA,UCASHABI,persistentProvider)
			let s = await tC.symbol()

			let r = eventsDU[o].recipient				//recipient
			let i = eventsDU[o].index						//index

			let date = new Date()
			let now = date.getTime()
			now = ethers.BigNumber.from(now.toString())
			let rI = await UDContractP.getRecipientIndex(signer._address)
			let d = await UDContractP.distributions(rI,o)
			let a = d.a
			let p = d.p
			let tP = d.touchpoint

			let dn = eventsDU[o].description

			let wait = tP.sub(now)
			if(wait.lte(p)){
				wait = "over"
			} else {
				wait = ethers.utils.formatUnits(wait,0)
				wait = wait.toString()
				wait += " seconds"
			}


			a = ethers.utils.formatUnits(a,decimals)
			p = ethers.utils.formatUnits(p,0)
			p = p.toString()
			p+= " seconds"

			let w = await UDContractP.getWithdrawable(r.toString(),parseInt(i))		//withdrawable

			w = ethers.utils.formatUnits(w,decimals)
			w = ethers.utils.commify(w)
			let v = d.totalAmount
			v = ethers.utils.formatUnits(v,decimals)						//vault
			v = ethers.utils.commify(v)
			var newRow  = DTable.insertRow(DTable.rows.length);
			var tCell = newRow.insertCell(0);
			var tokenLink = document.createElement("a")
			tokenLink.innerHTML = s
			tokenLink.href = "https://ropsten.etherscan.io/token/" + tA
			tCell.appendChild(tokenLink);


			var rCell  = newRow.insertCell(1);
			var addressLink = document.createElement("a")
			addressLink.innerHTML = r;
			addressLink.href = "https://ropsten.etherscan.io/address/" +r
			rCell.appendChild(addressLink);

			var wCell = newRow.insertCell(2);
			var wText = document.createTextNode(w);
			wCell.appendChild(wText);

			var vCell  = newRow.insertCell(3);
			var vText = document.createTextNode(v);
			vCell.appendChild(vText);

			var wCell = newRow.insertCell(4)
			let withdrawButton = document.createElement("input")
	    withdrawButton.type="button"
	    withdrawButton.value = "Withdraw"
	    withdrawButton.onclick = function () {
				withdraw(i)
			}
			wCell.appendChild(withdrawButton)

			var aCell  = newRow.insertCell(5);
			var aText = document.createTextNode(a);
			aCell.appendChild(aText);

			var pCell  = newRow.insertCell(6);
			var pText = document.createTextNode(p);
			pCell.appendChild(pText);

			var waitCell  = newRow.insertCell(7);
			var waitText = document.createTextNode(wait);
			waitCell.appendChild(waitText);

			var dnCell  = newRow.insertCell(8);
			var dnText = document.createTextNode(dn);
			dnCell.appendChild(dnText);


		}
	}

	async function withdraw(index){
		console.log(index)
		await UDContract.withdraw(parseInt(index),{gasLimit:300000})
	}


	dispenserAddress = "0x314c563161b5139Ba704e757385260cc5A7bd0F0"
	dispenserABI =
		[
			{
				"constant": false,
				"inputs": [],
				"name": "dispense",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "UCASHAddress",
				"outputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			}
		]

	async function dispense() {
		dispenseContract = new ethers.Contract(dispenserAddress,dispenserABI,signer)
		await dispenseContract.dispense()
	}
