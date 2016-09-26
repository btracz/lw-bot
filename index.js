/**
 * Created by Benjamin on 06/08/2016.
 */
var apiManager = require("./src/api-client");
var fightManager = require("./src/garden-fights");
var Q = require("q");

console.log("Démarrage du bot pour Leekwars");

apiManager.login().then(function (data) {
    var token = data.token;
    var farmerId = data.farmer.id;
    var teamId = data.farmer.team.id;

    console.log("Connecté en tant que " + data.farmer.name);

    // Enregistrement au tournoi d'éleveur
    apiManager.registerFarmerToTournament(token).then(function () {
        console.log("Enregistrement au tournoi d'éleveur effectué");
    }, function (err) {
        console.error("Enregistrement au tournoi d'éleveur échoué, détails : " + JSON.stringify(err));
    });

    apiManager.getOwnTeamDetails(teamId, token).then(function (team) {

        // Enregistrement des compositions aux tournois
        team.compositions.forEach(function (compo) {
            if (!compo.tournament.registered) {
                apiManager.registerTeamToTournament(compo, data.token).then(function (compoReturn) {
                    console.log("Enregistrement au tournoi d'équipe effectué pour la composition " + compoReturn.name);
                }, function (err) {
                    console.error("Enregistrement au tournoi de poireau échoué pour " + err.compo.name + ", détails : " + JSON.stringify(err.error));
                });
            } else {
                console.log("Enregistrement au tournoi d'équipe déjà effectué pour la composition " + compo.name);
            }

        });
    });

    apiManager.getGarden(token).then(function (garden) {
        for (var index in garden.my_compositions) {
            if (garden.my_compositions[index].fights > 0) {
                fightManager.doCompoFights(garden.my_compositions[index].id, garden.my_compositions[index].fights, token);
            }
        }

        for (var leekProp in garden.solo_fights) {
            // skip loop if the property is from prototype
            if (!garden.solo_fights.hasOwnProperty(leekProp)) continue;
            var count = garden.solo_fights[leekProp];
            if (count > 0) {
                fightManager.doLeekFights(leekProp, count, token);
            }
        }
        if (garden.farmer_fights > 0) {
            console.log(garden.farmer_fights + " combat(s) d'éleveur disponible(s)");
            var results = fightManager.doFarmerFights(garden.farmer_fights, token);
        } else {
            console.log("Plus de combat d'éleveur disponibles");
        }

        for (var leekProp in data.farmer.leeks) {
            console.log(leekProp);

            // skip loop if the property is from prototype
            if (!data.farmer.leeks.hasOwnProperty(leekProp)) continue;

            var leek = data.farmer.leeks[leekProp];
            apiManager.registerLeekToTournament(leek.id, token).then(function (leekId) {
                console.log("Enregistrement au tournoi de poireau effectué pour " + data.farmer.leeks[leekId].name);
            }, function (err) {
                console.error("Enregistrement au tournoi de poireau échoué pour " + data.farmer.leeks[err.leekId].name + ", détails : " + JSON.stringify(err));
            });
        }
    });

    console.log("fin d'exécution du bot (hors promesses)");
}, function (err) {
    console.log("Impossible de se connecter");
});

