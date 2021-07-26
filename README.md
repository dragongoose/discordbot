# Untitled Discord Bot

UDB is a simple bot for discord, to add Leveling, and some fun commands.

## Starting

Once in the project diretory, you are going to make a config file.

Once you create config.json, you are going to need to add these entries

```json

{
  "token": "DISCORD_TOKEN",
  "dburl": "MONGODB_URL",
  "errorwebhook": "WEBHOOK_URL",
  "openweathermap": "OPENWEATHERMAP_TOKEN",
  "ownerid": "OWNER_ID",
  "dragonapikey": "DRAGONAPIKEY"
}

```

Note: dragonapikey is using my other project, dragongooseCDN which is unfinished.

After you all all of the information needed into config.json, 
you will need to install dependencies by doing `npm install`.
After you install dependencies, you are ready to start the bot!
You can start the bot by running `node index` in the projects directory.

## Features
### Currently, the bot can:

WEATHER
* Show the current weather for a City or Zip code (USA only) `$weather`
* Show the Forecast for the week using zipcode (USA only) `$forecast`

MISC
* Clear messages `$clear`
* "Nuke" a channel (Deletes the clones the channel) `$nuke`
* Send a random picture of Cats and Dogs `$cat, $dog`
* Send this github repo `$github`
* Show API and Bot latency `$ping`
* Make a poll `$poll`
* Say anything the user wants it to `$say`
* Flip a coin `$coinflip`

RANKING/LEVELING
* Show users current rank `$rank`
* Show leaderboard for the server `$leaderboard`
* Shand progress bar color on the rank command (Will have more uses in the future)`$color`

Jack (Command that my friend wated to add)
* Say 10 random words `$words`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
