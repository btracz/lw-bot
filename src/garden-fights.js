/**
 * Created by Benjamin on 08/08/2016.
 */
var apiManager = require("./api-client");
var Q = require("q");

module.exports = {
    doFarmerFights: doFarmerFights
};

function doFarmerFights(count, token) {
    var results = [];
    for (var i = 0; i < count; i++) {
        results.push(doFarmerFight(token));
    }

    return result;
}

function doFarmerFight(token) {
    console.log("Combat d'éleveur à venir");
    var opponentId = getFarmerOpponent(token);

    //var combatId = apiManager.startFarmerFightSync(opponentId, token);

    var fightId = 18390958;
    var fight = apiManager.getFightSync(fightId);
    while(fight.status != 1){
        setTimeout(function(){
            fight = apiManager.getFightSync(fightId);
        }, 2000);
    }

    return {
        "id": fightId,
        "opponentId": opponentId,
        "result": fight.winner
    };
}

function getFarmerOpponent(token) {
    console.log("Recherche d'adversaires");
    var opponents = apiManager.getFarmerGardenOpponentsSync(token);

    if (opponents && opponents.length > 0) {
        return chooseWeakestFarmerOpponent(opponents);
    } else {
        throw new Error("Pas d'adversaire trouvé");
    }
}

function chooseWeakestFarmerOpponent(opponents) {
    return opponents.sort(function (farmer1, farmer2) {
        return farmer1.talent - farmer2.talent;
    })[0].id;
}