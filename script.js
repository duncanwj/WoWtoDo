
var apiKey = 'c7hv6esk265g4ujytse3vbmdz5mcp5nz';
var myCharacter = 'Dralsi';
var myLocale = 'en_US';
var myRealm = 'thrall';

// Get character achievement data
var achReq = new XMLHttpRequest();
achReq.open("GET", "https://us.api.battle.net/wow/character/" + myRealm + "/"+ myCharacter + "?fields=achievements&" + myLocale + "&apikey=" + apiKey, true);
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
	});
achReq.send(null);
event.preventDefault();

// Get character quest data
var questReq = new XMLHttpRequest();
questReq.open("GET", "https://us.api.battle.net/wow/character/" + myRealm + "/"+ myCharacter + "?fields=quests&" + myLocale + "&apikey=" + apiKey, true);
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
	});
questReq.send(null);
event.preventDefault();

// Get auction house snapshot
var aucReq = new XMLHttpRequest();
aucReq.open("GET", "https://us.api.battle.net/wow/auction/data/" + myRealm + "?locale=" + myLocale + "&apikey=" + apiKey, true);
aucReq.addEventListener("load", function()
	{
		if(aucReq.status >= 200 && aucReq.status < 400)
		{
			var aucResp = JSON.parse(aucResp.responseText);
			console.log("Auction data retrieved.");
			var aucFile = aucResp.files[0].url;
			var aucData = JSON.parse(aucFile.getContentText());
		}
		else
		{
			console.log("Error in network request: " + aucReq.statusText);
		}
	});
aucReq.send(null);
event.preventDefault();

// Process auction data
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