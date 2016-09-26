/**
 * Created by Benjamin on 08/08/2016.
 */
var apiManager = require("./api-client");
var Q = require("q");

module.exports = {
    doFarmerFights: doFarmerFights,
    doLeekFights: doLeekFights,
    doCompoFights: doCompoFights
};

function doFarmerFights(count, token) {
    var results = [];
    for (var i = 0; i < count; i++) {
        console.log("Combat d'eleveur n°" + (i+1));
        var fightRes = doFarmerFight(token);
        results.push(fightRes);
    }
    return results;
}

function doLeekFights(leekId, count, token) {
    var results = [];
    for (var i = 0; i < count; i++) {
        console.log("Combat du poireau " + leekId + " n°" + (i+1));
        var fightRes = doLeekFight(leekId, token);
        results.push(fightRes);
    }
    return results;
}

function doCompoFights(compoId, count, token){
    var results = [];
    for (var i = 0; i < count; i++) {
        console.log("Combat de la compo " + compoId + " n°" + (i+1));
        var fightRes = doCompoFight(compoId, token);
        results.push(fightRes);
    }
    return results;
}

function doFarmerFight(token) {
    var opponentId = getFarmerOpponent(token);
    console.log("Combat d'éleveur à venir face à " + opponentId);

    var fightId = apiManager.startFarmerFightSync(opponentId, token);
    var fight = apiManager.getFightSync(fightId);
    while(fight.status != 1){
        pause(3000);
        fight = apiManager.getFightSync(fightId);
    }

    printResult(fight.winner);

    return {
        "id": fightId,
        "opponentId": opponentId,
        "result": fight.winner
    };
}

function doLeekFight(leekId, token) {
    var opponentId = getLeekOpponent(leekId, token);
    console.log("Combat de poireau à venir face à " + opponentId);

    var fightId = apiManager.startLeekFightSync(leekId, opponentId, token);
    var fight = apiManager.getFightSync(fightId);
    while(fight.status != 1){
        pause(3000);
        fight = apiManager.getFightSync(fightId);
    }

    printResult(fight.winner);

    return {
        "id": fightId,
        "opponentId": opponentId,
        "result": fight.winner
    };
}

function doCompoFight(compoId, token) {
    var opponentId = getCompoOpponent(compoId, token);
    console.log("Combat de compo à venir face à " + opponentId);

    var fightId = apiManager.startCompoFightSync(compoId, opponentId, token);
    var fight = apiManager.getFightSync(fightId);
    while(fight.status != 1){
        pause(3000);
        fight = apiManager.getFightSync(fightId);
    }

    printResult(fight.winner);

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
        return chooseLowestTalentedOpponent(opponents);
    } else {
        throw new Error("Pas d'adversaire trouvé");
    }
}

function getLeekOpponent(leekId, token) {
    console.log("Recherche d'adversaires");
    var opponents = apiManager.getLeekGardenOpponentsSync(token, leekId);

    if (opponents && opponents.length > 0) {
        return chooseLowestTalentedOpponent(opponents);
    } else {
        throw new Error("Pas d'adversaire trouvé");
    }
}

function getCompoOpponent(compoId, token) {
    console.log("Recherche d'adversaires");
    var opponents = apiManager.getCompoGardenOpponentsSync(token, compoId);

    if (opponents && opponents.length > 0) {
        return chooseLowestTalentedOpponent(opponents);
    } else {
        throw new Error("Pas d'adversaire trouvé");
    }
}

function chooseLowestTalentedOpponent(opponents) {
    return opponents.sort(function (opp1, opp2) {
        return opp1.talent - opp2.talent;
    })[0].id;
}

function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

function printResult(winner){
    if(winner == 1){
        console.log("*********** VICTOIRE ***********");
    } else if(winner == 2){
        console.log("¤¤¤¤¤¤¤¤¤¤¤ DEFAITE ¤¤¤¤¤¤¤¤¤¤¤");
    } else {
        console.log("----------- NUL -----------");
    }
}