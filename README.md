# Bot de la "guerre des poireaux"

# Configuration
Créer un fichier config.json à la racine.
```
{
  "API": {
    "endpoint": "https://leekwars.com/api",
    "loginUri": "/farmer/login-token/{login}/{password}",
    "connectedFarmerUri": "/farmer/get-from-token/{token}",
    "registerFarmerTournamentUri": "/farmer/register-tournament/{token}",
    "registerLeekTournamentUri": "/leek/register-tournament/{leek_id}/{token}",
    "registerTeamTournamentUri": "/team/register-tournament/{composition_id}/{token}",
    "getOwnTeamUri": "/team/get-private/{team_id}/{token}",
    "getNotificationsUri": "/notification/get-latest/500/{token}",
    "getFightUri": "/fight/get/{fight_id}",
    "getGardenUri": "/garden/get/{token}",
    "getGardenFarmerOpponentsUri": "/garden/get-farmer-opponents/{token}",
    "getGardenLeekOpponentsUri": "/garden/get-leek-opponents/{leek_id}/{token}",
    "getGardenCompositionOpponentsUri": "/garden/get-composition-opponents/{composition_id}/{token}",
    "startFarmerGardenFightUri": "/garden/start-farmer-fight",
    "startSoloGardenFightUri": "/garden/start-solo-fight/{leek_id}/{target_id}/{token}",
    "startCompoGardenFightUri": "/garden/start-team-fight/{composition_id}/{target_id}/{token}"
  },
  "login": "",
  "password": ""
}
```
Renseigner vos logins/mots de passe dans ce fichier

# Utilisation
npm start

# Résumé des actions du bot
- Login
- Enregistrement aux tournois (solo, équipe, éleveur)
- Lancement des combats (équipe, solo, éleveur), l'adversaire choisi est celui ayant le talent le plus faible du potager.