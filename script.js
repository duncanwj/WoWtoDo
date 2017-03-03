
var apiKey = 'c7hv6esk265g4ujytse3vbmdz5mcp5nz';
var myCharacter = 'Dralsi';
var myLocale = 'en_US';
var myRealm = 'thrall';

// Get character achievement data
var achReq = new XMLHttpRequest();
achReq.open("GET", "https://us.api.battle.net/wow/character/" + myRealm + "/"+ myCharacter + "?fields=achievements&locale=" + myLocale + "&apikey=" + apiKey, true);
achReq.addEventListener("load", function()
	{
		if(achReq.status >= 200 && achReq.status < 400)
		{
			var achData = JSON.parse(achReq.responseText);
			console.log("Achievement data retrieved.");
		}
		else
		{
			console.log("Error in network request: " + achReq.statusText);
		}
		// Update character data
		document.getElementById('charname').textContent = achData.name;
		document.getElementById('charrealm').textContent = achData.realm;
		document.getElementById('charbg').textContent = achData.battlegroup;
		document.getElementById('charachp').textContent = achData.achievementPoints;
		document.getElementById('charhks').textContent = achData.totalHonorableKills;
	});
achReq.send(null);

// Get character quest data
var questReq = new XMLHttpRequest();
questReq.open("GET", "https://us.api.battle.net/wow/character/" + myRealm + "/"+ myCharacter + "?fields=quests&locale=" + myLocale + "&apikey=" + apiKey, true);
questReq.addEventListener("load", function()
	{
		if(questReq.status >= 200 && questReq.status < 400)
		{
			var questData = JSON.parse(questReq.responseText);
			console.log("Quest data retrieved.");
		}
		else
		{
			console.log("Error in network request: " + questReq.statusText);
		}
		checkDailies(questData);
	});
questReq.send(null);

// Check daily quest completion
function checkDailies(questData)
{
	var questList = questData.quests;
	var questLength = questList.length;
	document.getElementById('btsixk').textContent = "Incomplete"; //Blingtron 6000
	for (var i = 0; i<questLength; i++)
	{
		var curQuest = questList[i];
		if (curQuest == 40753) //Blingtron 6000
		{
			document.getElementById('btsixk').textContent = "Completed!";
		}
	}
}



// Get auction house snapshot
var aucReq = new XMLHttpRequest();
aucReq.open("GET", "https://us.api.battle.net/wow/auction/data/" + myRealm + "?locale=" + myLocale + "&apikey=" + apiKey, true);
aucReq.addEventListener("load", function()
	{
		if(aucReq.status >= 200 && aucReq.status < 400)
		{
			var aucResp = JSON.parse(aucReq.responseText);
			console.log("Auction url retrieved.");
			var aucFile = aucResp.files[0].url;
		}
		else
		{
			console.log("Error in network request: " + aucReq.statusText);
		}
		var aucReqtwo = new XMLHttpRequest();
		aucReqtwo.open("GET", aucFile, true)
		aucReqtwo.addEventListener("load", function()
		{
			if(aucReqtwo.status >= 200 && aucReqtwo.status < 400)
			{
			var aucData = JSON.parse(aucReqtwo.responseText);
			console.log("Auction data retrieved.");
			}
			else
			{
				console.log("Error in network request: " + aucReqtwo.statusText);
			}
			checkAuctions(aucData);
		});
		aucReqtwo.send(null);
	});
aucReq.send(null);


// Process auction data
function checkAuctions(aucData)
{
	var auctionList = aucData.auctions;
	var aLength = auctionList.length;
	var leylightArr = []; //item=124441 
	var arkhanaArr = []; //item=124440
	for (var i = 0; i<aLength; i++)
	{
		var curAuc = auctionList[i];
		if (curAuc.item == 124441)
		{
			leylightArr.push(curAuc.buyout/curAuc.quantity);
		}
		else if(curAuc.item == 124440)
		{
			arkhanaArr.push(curAuc.buyout/curAuc.quantity);
		}
	}
	var leyAvg = leylightArr.sum()/leylightArr.length;
	var arkAvg = arkhanaArr.sum()/arkhanaArr.length;
	var leyShatter;
	if ((arkAvg*3) > leyAvg)
	{
		leyShatter = 1;
	}
	else 
	{
		leyShatter = 0;
	}
	// Update with auction data
	document.getElementById('leyprice').textContent = leyAvg;
	document.getElementById('arkprice').textContent = arkAvg;
	if(leyShatter == 1)
		{
			document.getElementById('shatterley').textContent = "Shatter!";
		}
	else
		{
			document.getElementById('shatterley').textContent = "Don't shatter!";
		}
}