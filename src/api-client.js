/**
 * Created by Benjamin on 06/08/2016.
 */
var request = require("request");
var syncRequest = require("sync-request");
var configManager = require("./config");
var cookie = require('cookie');
var Q = require("q");

module.exports = {
    login: getToken,
    getConnectedFarmer: getConnectedFarmer,
    getOwnTeamDetails: getOwnTeamDetails,
    getGarden: getGarden,
    registerFarmerToTournament: registerFarmerToTournament,
    registerLeekToTournament: registerLeekToTournament,
    registerTeamToTournament: registerTeamToTournament,
    getFarmerGardenOpponentsSync: getFarmerGardenOpponentsSync,
    getLeekGardenOpponentsSync: getLeekGardenOpponentsSync,
    getCompoGardenOpponentsSync: getCompoGardenOpponentsSync,
    startFarmerFightSync: startFarmerFightSync,
    startLeekFightSync: startLeekFightSync,
    startCompoFightSync: startCompoFightSync,
    getFightSync: getFightSync
};

var sessionId = '';

function executeGETSyncRequest(Url){
    try {
        var response = syncRequest('GET', Url);
        console.log("réponse : " + JSON.stringify(response));
        sessionId = cookie.parse(response.headers["set-cookie"][0]).PHPSESSID;
        var body = response.getBody();
        console.log("corps : " + body);

        return JSON.parse(body);
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

function getToken() {
    var deferred = Q.defer();
    var config = configManager.getFullConfig();
    var login = config.login;
    var password = config.password;
    var setUri = config.API.loginUri.replace("{login}", login).replace("{password}", password);
    console.log("Appel de login : " + config.API.endpoint + setUri);

    request.get(config.API.endpoint + setUri, function (error, response, body) {
        console.log("réponse : " + JSON.stringify(response));
        sessionId = cookie.parse(response.headers["set-cookie"][0]).PHPSESSID;
        /**
         * Exemple de réponse
         * {
              "success": true,
              "farmer": {
                "id": 44791,
                "login": "BTZ",
                "team": {
                  "id": 5618,
                  "name": "MARI",
                  "level": 68,
                  "emblem_changed": 1463161909
                },
                "name": "BTZ",
                "talent": 1394,
                "leeks": {
                  "48868": {
                    "id": 48868,
                    "name": "ALeakyLeek",
                    "color": "#00aa00",
                    "capital": 0,
                    "level": 203,
                    "talent": 1503,
                    "skin": 1,
                    "hat": null
                  },
                  "49288": {
                    "id": 49288,
                    "name": "APerviousLeek",
                    "color": "#00aa00",
                    "capital": 0,
                    "level": 165,
                    "talent": 998,
                    "skin": 1,
                    "hat": null
                  },
                  "49949": {
                    "id": 49949,
                    "name": "APorousLeek",
                    "color": "#00aa00",
                    "capital": 0,
                    "level": 170,
                    "talent": 1460,
                    "skin": 1,
                    "hat": null
                  },
                  "50773": {
                    "id": 50773,
                    "name": "APenetrableLeek",
                    "color": "#00aa00",
                    "capital": 0,
                    "level": 70,
                    "talent": 567,
                    "skin": 1,
                    "hat": null
                  }
                },
                "avatar_changed": 1463217650,
                "talent_more": 346,
                "victories": 3922,
                "fights": [
                  {
                    "id": 18276907,
                    "date": 1470506834,
                    "type": 1,
                    "context": 2,
                    "status": 1,
                    "winner": 1,
                    "farmer_team": 2,
                    "result": "defeat",
                    "farmer1": 43131,
                    "farmer2": 44791,
                    "farmer1_name": "MartinShadok",
                    "farmer2_name": "BTZ"
                  },
                  {
                    "id": 18276293,
                    "date": 1470499281,
                    "type": 1,
                    "context": 3,
                    "status": 1,
                    "winner": 2,
                    "farmer_team": 1,
                    "result": "defeat",
                    "farmer1": 44791,
                    "farmer2": 43621,
                    "farmer1_name": "BTZ",
                    "farmer2_name": "Azelle"
                  },
                  {
                    "id": 18273117,
                    "date": 1470474996,
                    "type": 1,
                    "context": 2,
                    "status": 1,
                    "winner": 1,
                    "farmer_team": 1,
                    "result": "win",
                    "farmer1": 44791,
                    "farmer2": 1763,
                    "farmer1_name": "BTZ",
                    "farmer2_name": "DarkStorm"
                  },
                  {
                    "id": 18273116,
                    "date": 1470474994,
                    "type": 1,
                    "context": 2,
                    "status": 1,
                    "winner": 0,
                    "farmer_team": 1,
                    "result": "draw",
                    "farmer1": 44791,
                    "farmer2": 15440,
                    "farmer1_name": "BTZ",
                    "farmer2_name": "Pastag"
                  },
                  {
                    "id": 18273114,
                    "date": 1470474985,
                    "type": 1,
                    "context": 2,
                    "status": 1,
                    "winner": 2,
                    "farmer_team": 1,
                    "result": "defeat",
                    "farmer1": 44791,
                    "farmer2": 15440,
                    "farmer1_name": "BTZ",
                    "farmer2_name": "Pastag"
                  },
                  {
                    "id": 18273113,
                    "date": 1470474941,
                    "type": 1,
                    "context": 2,
                    "status": 1,
                    "winner": 1,
                    "farmer_team": 1,
                    "result": "win",
                    "farmer1": 44791,
                    "farmer2": 1763,
                    "farmer1_name": "BTZ",
                    "farmer2_name": "DarkStorm"
                  }
                ],
                "draws": 348,
                "defeats": 1863,
                "ratio": "2.11",
                "connected": true,
                "last_connection": 1470522090,
                "register_date": 1462819227,
                "tournaments": [
                  {
                    "id": 33292,
                    "date": 1470499201
                  },
                  {
                    "id": 33270,
                    "date": 1470412802
                  },
                  {
                    "id": 33247,
                    "date": 1470326402
                  },
                  {
                    "id": 33225,
                    "date": 1470240002
                  },
                  {
                    "id": 33202,
                    "date": 1470153602
                  },
                  {
                    "id": 33176,
                    "date": 1470067201
                  }
                ],
                "admin": false,
                "moderator": false,
                "country": "fr",
                "godfather": null,
                "godsons": [],
                "color": "",
                "banned": 0,
                "won_solo_tournaments": 4,
                "won_farmer_tournaments": 1,
                "won_team_tournaments": 10,
                "total_level": 608,
                "leek_count": 4,
                "habs": 3975281,
                "crystals": 0,
                "weapons": [
                  {
                    "id": 503863,
                    "template": 37
                  },
                  {
                    "id": 503863,
                    "template": 37
                  },
                  {
                    "id": 503863,
                    "template": 37
                  },
                  {
                    "id": 506720,
                    "template": 108
                  },
                  {
                    "id": 515225,
                    "template": 42
                  },
                  {
                    "id": 517349,
                    "template": 109
                  },
                  {
                    "id": 519548,
                    "template": 46
                  },
                  {
                    "id": 519414,
                    "template": 48
                  },
                  {
                    "id": 527850,
                    "template": 60
                  }
                ],
                "chips": [
                  {
                    "id": 503897,
                    "template": 1
                  },
                  {
                    "id": 515613,
                    "template": 7
                  },
                  {
                    "id": 506961,
                    "template": 23
                  },
                  {
                    "id": 507485,
                    "template": 15
                  },
                  {
                    "id": 516551,
                    "template": 6
                  },
                  {
                    "id": 511263,
                    "template": 73
                  },
                  {
                    "id": 519142,
                    "template": 12
                  },
                  {
                    "id": 510602,
                    "template": 11
                  },
                  {
                    "id": 518997,
                    "template": 16
                  },
                  {
                    "id": 521416,
                    "template": 94
                  },
                  {
                    "id": 517340,
                    "template": 35
                  },
                  {
                    "id": 519549,
                    "template": 97
                  }
                ],
                "ais": [
                  {
                    "id": 188678,
                    "name": "attacks",
                    "level": 1
                  },
                  {
                    "id": 186119,
                    "name": "bulb",
                    "level": 1
                  },
                  {
                    "id": 183942,
                    "name": "chip_boost",
                    "level": 1
                  },
                  {
                    "id": 183661,
                    "name": "chip_damage",
                    "level": 1
                  },
                  {
                    "id": 183662,
                    "name": "chip_heal",
                    "level": 1
                  },
                  {
                    "id": 186594,
                    "name": "chips",
                    "level": 1
                  },
                  {
                    "id": 188194,
                    "name": "colors",
                    "level": 9
                  },
                  {
                    "id": 188232,
                    "name": "config",
                    "level": 1
                  },
                  {
                    "id": 184045,
                    "name": "IA_1",
                    "level": 1
                  },
                  {
                    "id": 183241,
                    "name": "IA_1_solo",
                    "level": 1
                  },
                  {
                    "id": 190218,
                    "name": "IA_1_team",
                    "level": 1
                  },
                  {
                    "id": 185029,
                    "name": "IA_2",
                    "level": 1
                  },
                  {
                    "id": 184765,
                    "name": "IA_2_booster",
                    "level": 1
                  },
                  {
                    "id": 184766,
                    "name": "IA_2_solo",
                    "level": 1
                  },
                  {
                    "id": 187554,
                    "name": "IA_3",
                    "level": 1
                  },
                  {
                    "id": 191054,
                    "name": "IA_4",
                    "level": 1
                  },
                  {
                    "id": 183663,
                    "name": "movements",
                    "level": 1
                  },
                  {
                    "id": 183249,
                    "name": "punchlines",
                    "level": 1
                  },
                  {
                    "id": 184449,
                    "name": "strategies",
                    "level": 1
                  },
                  {
                    "id": 189849,
                    "name": "suicide",
                    "level": 1
                  },
                  {
                    "id": 188229,
                    "name": "TODOs",
                    "level": 1
                  },
                  {
                    "id": 183248,
                    "name": "utils",
                    "level": 1
                  },
                  {
                    "id": 183902,
                    "name": "weapon",
                    "level": 1
                  }
                ],
                "potions": [
                  {
                    "id": 503864,
                    "template": 58,
                    "quantity": 7
                  },
                  {
                    "id": 527696,
                    "template": 49,
                    "quantity": 2
                  }
                ],
                "hats": [],
                "tournament": {
                  "registered": true,
                  "current": null
                },
                "candidacy": null
              },
              "token": "5d10b8b68d5970fd163c0419c7bd86e885c7de3d5925e7ea1f1cc5bf190637ff"
            }
         */

        if (!error && response.statusCode == 200) {
            deferred.resolve(JSON.parse(body));
        } else {
            console.error(error);
            deferred.reject(error);
        }
    });

    return deferred.promise;
}

function getConnectedFarmer(token) {
    var deferred = Q.defer();
    var config = configManager.getFullConfig();
    var setUri = config.API.connectedFarmerUri.replace("{token}", token);

    console.log("Appel de récupération du fermier connecté : " + config.API.endpoint + setUri);
    request.get(config.API.endpoint + setUri, function (error, response, body) {
        console.log("réponse : " + JSON.stringify(response));
        if (!error && response.statusCode == 200) {
            deferred.resolve(JSON.parse(body));
        } else {
            console.error(error);
            deferred.reject(error);
        }
    });

    return deferred.promise;
}

function getOwnTeamDetails(teamId, token) {
    var deferred = Q.defer();
    var config = configManager.getFullConfig();
    var setUri = config.API.getOwnTeamUri.replace("{token}", token).replace("{team_id}", teamId);

    console.log("Appel de récupération de l'équipe : " + config.API.endpoint + setUri);
    request.get(config.API.endpoint + setUri, function (error, response, body) {
        console.log("réponse : " + JSON.stringify(response));
        /**
         * Exemple de réponse :
         * {
              "success": true,
              "team": {
                "id": 5618,
                "name": "MARI",
                "level": 68,
                "xp": 2012531,
                "up_xp": 2050270,
                "down_xp": 1975970,
                "talent": 1329,
                "victories": 2175,
                "fights": [
                  {
                    "id": 18283784,
                    "date": 1470598314,
                    "type": 2,
                    "context": 3,
                    "status": 1,
                    "winner": 1,
                    "farmer_team": 2,
                    "result": "defeat",
                    "team1": 5653,
                    "team2": 5618,
                    "team1_name": "WeKillLeeks",
                    "team2_name": "MARI"
                  },
                  {
                    "id": 18283685,
                    "date": 1470596681,
                    "type": 2,
                    "context": 3,
                    "status": 1,
                    "winner": 1,
                    "farmer_team": 2,
                    "result": "defeat",
                    "team1": 4586,
                    "team2": 5618,
                    "team1_name": "LFS",
                    "team2_name": "MARI"
                  },
                  {
                    "id": 18283684,
                    "date": 1470596680,
                    "type": 2,
                    "context": 3,
                    "status": 1,
                    "winner": 1,
                    "farmer_team": 2,
                    "result": "defeat",
                    "team1": 5653,
                    "team2": 5618,
                    "team1_name": "WeKillLeeks",
                    "team2_name": "MARI"
                  },
                  {
                    "id": 18283680,
                    "date": 1470596677,
                    "type": 2,
                    "context": 3,
                    "status": 1,
                    "winner": 2,
                    "farmer_team": 1,
                    "result": "defeat",
                    "team1": 5618,
                    "team2": 1808,
                    "team1_name": "MARI",
                    "team2_name": "leekpie"
                  },
                  {
                    "id": 18283679,
                    "date": 1470596676,
                    "type": 2,
                    "context": 3,
                    "status": 1,
                    "winner": 1,
                    "farmer_team": 1,
                    "result": "win",
                    "team1": 5618,
                    "team2": 4896,
                    "team1_name": "MARI",
                    "team2_name": "Cesi Exia"
                  },
                  {
                    "id": 18283612,
                    "date": 1470596464,
                    "type": 2,
                    "context": 3,
                    "status": 1,
                    "winner": 2,
                    "farmer_team": 1,
                    "result": "defeat",
                    "team1": 5618,
                    "team2": 5560,
                    "team1_name": "MARI",
                    "team2_name": "YingYang"
                  }
                ],
                "draws": 205,
                "defeats": 961,
                "emblem_changed": 1463161909,
                "description": "",
                "remaining_xp": 37739,
                "ratio": "2.26",
                "member_count": 14,
                "members": [
                  {
                    "id": 11313,
                    "name": "GetnooH",
                    "avatar_changed": 1406528199,
                    "grade": "owner",
                    "connected": false
                  },
                  {
                    "id": 44663,
                    "name": "kinju",
                    "avatar_changed": 1466880418,
                    "grade": "captain",
                    "connected": true
                  },
                  {
                    "id": 44714,
                    "name": "KaizerDraez",
                    "avatar_changed": 1463342935,
                    "grade": "member",
                    "connected": true
                  },
                  {
                    "id": 44711,
                    "name": "SardineBoy",
                    "avatar_changed": 0,
                    "grade": "member",
                    "connected": false
                  },
                  {
                    "id": 44690,
                    "name": "123tibo",
                    "avatar_changed": 0,
                    "grade": "member",
                    "connected": false
                  },
                  {
                    "id": 44669,
                    "name": "Louiss5",
                    "avatar_changed": 0,
                    "grade": "member",
                    "connected": false
                  },
                  {
                    "id": 44707,
                    "name": "terence02",
                    "avatar_changed": 1464192509,
                    "grade": "member",
                    "connected": false
                  },
                  {
                    "id": 11584,
                    "name": "Juwit",
                    "avatar_changed": 0,
                    "grade": "member",
                    "connected": false
                  },
                  {
                    "id": 44791,
                    "name": "BTZ",
                    "avatar_changed": 1463217650,
                    "grade": "captain",
                    "connected": true
                  },
                  {
                    "id": 44691,
                    "name": "Hurracan",
                    "avatar_changed": 0,
                    "grade": "member",
                    "connected": false
                  },
                  {
                    "id": 44670,
                    "name": "PidamelCorp",
                    "avatar_changed": 1463483276,
                    "grade": "member",
                    "connected": false
                  },
                  {
                    "id": 21990,
                    "name": "S4ch4",
                    "avatar_changed": 0,
                    "grade": "member",
                    "connected": false
                  },
                  {
                    "id": 44918,
                    "name": "Sheaps",
                    "avatar_changed": 0,
                    "grade": "member",
                    "connected": false
                  },
                  {
                    "id": 10497,
                    "name": "koala2803",
                    "avatar_changed": 0,
                    "grade": "member",
                    "connected": false
                  }
                ],
                "leek_count": 28,
                "opened": true,
                "tournaments": [
                  {
                    "id": 33316,
                    "date": 1470596401
                  },
                  {
                    "id": 33316,
                    "date": 1470596401
                  },
                  {
                    "id": 33314,
                    "date": 1470596401
                  },
                  {
                    "id": 33315,
                    "date": 1470596401
                  },
                  {
                    "id": 33316,
                    "date": 1470596401
                  },
                  {
                    "id": 33296,
                    "date": 1470510002
                  }
                ],
                "candidacies": [],
                "forum": 4665,
                "compositions": [
                  {
                    "id": 17542,
                    "name": "Couveuse",
                    "talent": 1255,
                    "total_level": 358,
                    "leeks": [
                      {
                        "id": 50562,
                        "name": "Thaleek",
                        "level": 100,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 49478,
                        "name": "minitaz",
                        "level": 52,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 48772,
                        "name": "taz02",
                        "level": 76,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 50729,
                        "name": "Egorger",
                        "level": 59,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 50773,
                        "name": "APenetrableLeek",
                        "level": 71,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      }
                    ],
                    "tournament": {
                      "registered": true,
                      "current": null
                    }
                  },
                  {
                    "id": 17003,
                    "name": "Incubateur",
                    "talent": 1874,
                    "total_level": 878,
                    "leeks": [
                      {
                        "id": 48729,
                        "name": "Yorky",
                        "level": 102,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 49949,
                        "name": "APorousLeek",
                        "level": 171,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 49925,
                        "name": "pastrice",
                        "level": 191,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 49258,
                        "name": "Eel",
                        "level": 163,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 49275,
                        "name": "t0rt4nk",
                        "level": 85,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 49288,
                        "name": "APerviousLeek",
                        "level": 166,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      }
                    ],
                    "tournament": {
                      "registered": true,
                      "current": null
                    }
                  },
                  {
                    "id": 16971,
                    "name": "Maria",
                    "talent": 738,
                    "total_level": 295,
                    "leeks": [
                      {
                        "id": 12236,
                        "name": "BobaFleek",
                        "level": 61,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 10
                      },
                      {
                        "id": 49056,
                        "name": "GecondH",
                        "level": 53,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 10
                      },
                      {
                        "id": 48987,
                        "name": "Leek@48987",
                        "level": 57,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 10
                      },
                      {
                        "id": 48776,
                        "name": "KnorJadore",
                        "level": 51,
                        "hat": 1,
                        "skin": 1,
                        "team_fights": 10
                      },
                      {
                        "id": 48752,
                        "name": "LiebigPower",
                        "level": 73,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 10
                      }
                    ],
                    "tournament": {
                      "registered": true,
                      "current": null
                    }
                  },
                  {
                    "id": 16970,
                    "name": "Mario",
                    "talent": 1050,
                    "total_level": 564,
                    "leeks": [
                      {
                        "id": 50053,
                        "name": "Zee",
                        "level": 116,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 49976,
                        "name": "Glasky",
                        "level": 59,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 25547,
                        "name": "Pik4pik4",
                        "level": 120,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 10825,
                        "name": "SpiderLeek",
                        "level": 82,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 48754,
                        "name": "Tornadino",
                        "level": 82,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 11866,
                        "name": "GirstH",
                        "level": 105,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      }
                    ],
                    "tournament": {
                      "registered": true,
                      "current": null
                    }
                  },
                  {
                    "id": 16972,
                    "name": "Marius",
                    "talent": 1730,
                    "total_level": 1103,
                    "leeks": [
                      {
                        "id": 49199,
                        "name": "bleuConcombre",
                        "level": 135,
                        "hat": null,
                        "skin": 2,
                        "team_fights": 0
                      },
                      {
                        "id": 49243,
                        "name": "kinCycLeek",
                        "level": 208,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 48781,
                        "name": "Secouer",
                        "level": 176,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 48868,
                        "name": "ALeakyLeek",
                        "level": 204,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 48728,
                        "name": "verTomate",
                        "level": 153,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      },
                      {
                        "id": 48721,
                        "name": "kinleek",
                        "level": 227,
                        "hat": null,
                        "skin": 1,
                        "team_fights": 0
                      }
                    ],
                    "tournament": {
                      "registered": true,
                      "current": null
                    }
                  }
                ],
                "unengaged_leeks": []
              }
            }
         */
        if (!error && response.statusCode == 200) {
            deferred.resolve(JSON.parse(body).team);
        } else {
            console.error(error);
            deferred.reject(error);
        }

    });

    return deferred.promise;
}

function getGarden(token) {
    var deferred = Q.defer();
    var config = configManager.getFullConfig();
    var setUri = config.API.getGardenUri.replace("{token}", token);

    console.log("Appel de récupération du potager : " + config.API.endpoint + setUri);
    request.get(config.API.endpoint + setUri, function (error, response, body) {
        console.log("réponse : " + JSON.stringify(response));
        /**
         * Exemple de réponse :
         *
         */
        if (!error && response.statusCode == 200) {
            deferred.resolve(JSON.parse(body).garden);
        } else {
            console.error(error);
            deferred.reject(error);
        }

    });

    return deferred.promise;
}

function registerFarmerToTournament(token) {
    var deferred = Q.defer();
    var config = configManager.getFullConfig();
    var setUri = config.API.registerFarmerTournamentUri.replace("{token}", token);

    console.log("Appel d'enregistrement du fermier au tournoi : " + config.API.endpoint + setUri);
    request.post({url: config.API.endpoint + setUri, form: {token: token}}, function (error, response, body) {
            console.log("réponse : " + JSON.stringify(response));

            if (!error && response.statusCode == 200) {
                var body = JSON.parse(body);
                if (body && (body.success || (!body.success && body.error === "already_registered"))) {
                    deferred.resolve();
                } else {
                    deferred.reject(body);
                }
            } else {
                console.error(error);
                deferred.reject(error);
            }
        }
    );

    return deferred.promise;
}

function registerLeekToTournament(leekId, token) {
    var deferred = Q.defer();
    var config = configManager.getFullConfig();
    var setUri = config.API.registerLeekTournamentUri.replace("{token}", token).replace("{leek_id}", leekId);

    console.log("Appel d'enregistrement du poireau au tournoi : " + config.API.endpoint + setUri);
    request.post({
            url: config.API.endpoint + setUri,
            form: {leek_id: leekId, token: token}
        }, function (error, response, body) {
            console.log("réponse : " + JSON.stringify(response));

            if (!error && response.statusCode == 200) {
                var body = JSON.parse(body);
                if (body && (body.success || (!body.success && body.error === "already_registered"))) {
                    deferred.resolve(leekId);
                } else {
                    deferred.reject({leekId: leekId, error: body});
                }
            } else {
                console.error(error);
                deferred.reject({leekId: leekId, error: error});
            }
        }
    );

    return deferred.promise;
}

function registerTeamToTournament(compo, token) {
    var deferred = Q.defer();
    var config = configManager.getFullConfig();
    var setUri = config.API.registerTeamTournamentUri.replace("{token}", token).replace("{composition_id}", compo.id);

    console.log("Appel d'enregistrement de la composition au tournoi : " + config.API.endpoint + setUri);
    request.post({
        url: config.API.endpoint + setUri,
        form: {composition_id: compo.id, token: token}
    }, function (error, response, body) {
        console.log("réponse : " + JSON.stringify(response));

        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            if (body && (body.success || (!body.success && body.error === "already_registered"))) {
                deferred.resolve(compo);
            } else {
                deferred.reject({compo: compo, error: body});
            }
        } else {
            console.error(error);
            deferred.reject({compo: compo, error: error});
        }
    });

    return deferred.promise;
}

function getFightSync(fightId){
    var config = configManager.getFullConfig();
    var setUri = config.API.getFightUri.replace("{fight_id}", fightId);

    console.log("Appel de récupération d'un combat : " + config.API.endpoint + setUri);
    return executeGETSyncRequest(config.API.endpoint + setUri).fight;
}

function getFarmerGardenOpponentsSync(token) {
    var config = configManager.getFullConfig();
    var setUri = config.API.getGardenFarmerOpponentsUri.replace("{token}", token);

    console.log("Appel de récupération des adversaires du potager des éleveurs : " + config.API.endpoint + setUri);
    /**
         * Exemple de réponse :
         *{
              "success": true,
              "opponents": [
                {
                  "id": 15360,
                  "name": "Ness",
                  "avatar_changed": 0,
                  "talent": 1161,
                  "total_level": 820,
                  "leek_count": 4
                },
                {
                  "id": 41996,
                  "name": "Achab",
                  "avatar_changed": 1454680193,
                  "talent": 1298,
                  "total_level": 846,
                  "leek_count": 4
                },
                {
                  "id": 39895,
                  "name": "JePrefLaSalade",
                  "avatar_changed": 1448900068,
                  "talent": 1368,
                  "total_level": 800,
                  "leek_count": 4
                },
                {
                  "id": 34852,
                  "name": "facojoe",
                  "avatar_changed": 1435085807,
                  "talent": 1448,
                  "total_level": 681,
                  "leek_count": 3
                },
                {
                  "id": 19085,
                  "name": "tboss",
                  "avatar_changed": 1413642114,
                  "talent": 1572,
                  "total_level": 827,
                  "leek_count": 4
                }
              ]
            }
         */

    return executeGETSyncRequest(config.API.endpoint + setUri).opponents;
}

function getLeekGardenOpponentsSync(token, leekId) {
    var config = configManager.getFullConfig();
    var setUri = config.API.getGardenLeekOpponentsUri.replace("{token}", token).replace("{leek_id}", leekId);

    console.log("Appel de récupération des adversaires du potager du poireau " + leekId + " : " + config.API.endpoint + setUri);
    /**
     * Exemple de réponse :
     *{
              "success": true,
              "opponents": [
                {
                  "id": 15360,
                  "name": "Ness",
                  "avatar_changed": 0,
                  "talent": 1161,
                  "total_level": 820,
                  "leek_count": 4
                },
                {
                  "id": 41996,
                  "name": "Achab",
                  "avatar_changed": 1454680193,
                  "talent": 1298,
                  "total_level": 846,
                  "leek_count": 4
                },
                {
                  "id": 39895,
                  "name": "JePrefLaSalade",
                  "avatar_changed": 1448900068,
                  "talent": 1368,
                  "total_level": 800,
                  "leek_count": 4
                },
                {
                  "id": 34852,
                  "name": "facojoe",
                  "avatar_changed": 1435085807,
                  "talent": 1448,
                  "total_level": 681,
                  "leek_count": 3
                },
                {
                  "id": 19085,
                  "name": "tboss",
                  "avatar_changed": 1413642114,
                  "talent": 1572,
                  "total_level": 827,
                  "leek_count": 4
                }
              ]
            }
     */

    return executeGETSyncRequest(config.API.endpoint + setUri).opponents;
}

function getCompoGardenOpponentsSync(token, compoId) {
    var config = configManager.getFullConfig();
    var setUri = config.API.getGardenCompositionOpponentsUri.replace("{token}", token).replace("{composition_id}", compoId);

    console.log("Appel de récupération des adversaires du potager de la compo " + compoId + " : " + config.API.endpoint + setUri);

    return executeGETSyncRequest(config.API.endpoint + setUri).opponents;
}

function startFarmerFightSync(opponentId, token) {
    var config = configManager.getFullConfig();
    var setUri = config.API.startFarmerGardenFightUri.replace("{token}", token).replace("{target_id}", opponentId);
    var reqBody = "target_id={target_id}&token={token}".replace("{token}", token).replace("{target_id}", opponentId);
    var cookieString = 'PHPSESSID={SessionId}; token={token}'.replace("{token}", token).replace('{SessionId}', sessionId);
    console.log("Appel de lancement d'un combat d'éleveur : \r\n" + config.API.endpoint + setUri + "\r\n body : " + reqBody + "\r\n cookies : " + cookieString);
    try {
        var response = syncRequest('POST', config.API.endpoint + setUri, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': cookieString,
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: reqBody
        });
        console.log("réponse : " + JSON.stringify(response));
        var body = response.getBody();
        console.log("corps : " + body);

        return JSON.parse(body).fight;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

function startLeekFightSync(leekId, opponentId, token) {
    var config = configManager.getFullConfig();
    var setUri = config.API.startSoloGardenFightUri.replace("{token}", token).replace("{target_id}", opponentId).replace("{leek_id}", leekId);
    var reqBody = "leek_id={leek_id}&target_id={target_id}&token={token}".replace("{token}", token).replace("{target_id}", opponentId).replace("{leek_id}", leekId);
    var cookieString = 'PHPSESSID={SessionId}; token={token}'.replace("{token}", token).replace('{SessionId}', sessionId);
    console.log("Appel de lancement d'un combat de poireau : \r\n" + config.API.endpoint + setUri + "\r\n body : " + reqBody + "\r\n cookies : " + cookieString);
    try {
        var response = syncRequest('POST', config.API.endpoint + setUri, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': cookieString,
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: reqBody
        });
        console.log("réponse : " + JSON.stringify(response));
        var body = response.getBody();
        console.log("corps : " + body);

        return JSON.parse(body).fight;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

function startCompoFightSync(compoId, opponentId, token) {
    var config = configManager.getFullConfig();
    var setUri = config.API.startCompoGardenFightUri.replace("{token}", token).replace("{target_id}", opponentId).replace("{composition_id}", compoId);
    var reqBody = "composition_id={composition_id}&target_id={target_id}&token={token}".replace("{token}", token).replace("{target_id}", opponentId).replace("{composition_id}", compoId);
    var cookieString = 'PHPSESSID={SessionId}; token={token}'.replace("{token}", token).replace('{SessionId}', sessionId);
    console.log("Appel de lancement d'un combat de composition : \r\n" + config.API.endpoint + setUri + "\r\n body : " + reqBody + "\r\n cookies : " + cookieString);
    try {
        var response = syncRequest('POST', config.API.endpoint + setUri, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': cookieString,
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: reqBody
        });
        console.log("réponse : " + JSON.stringify(response));
        var body = response.getBody();
        console.log("corps : " + body);

        return JSON.parse(body).fight;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}
