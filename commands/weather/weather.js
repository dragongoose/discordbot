const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'weather',
			aliases: ['heat'],
			group: 'weather',
			memberName: 'weather',
			argsPromptLimit: 0,
            args: [
                {
                    type:'string',
                    prompt:'',
                    key:'city',
                }
            ],
            description: 'Says current weather conditions',
		})
	}
   async run(msg, { city }) {

       
       
       
    function degToCompass(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

   
if(city.length > 5) {
	var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + config.openweathermap + '&units=imperial';
} else {
    var url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + city + '&appid=' + config.openweathermap + '&units=imperial';
}
       
       
    await fetch(url)
        .then(response => {
            return response.json()
        })
        
        .then(parsedWeather => {
            if(city == 'hell'){
                var hell = 'true'
                const hellEmbed = new Discord.MessageEmbed()
               .setColor('#FF0000')
               .setTitle('burning in hell,Hell')
               .setThumbnail(`https://openweathermap.org/img/wn/11n@2x.png`)
               .setFooter('Powered by HellWeatherMap')
               .addFields(
                   { name: 'Temperature  ', value: ` 666°F`, inline: true } ,
                   { name: 'Max Temp  ', value: `666°F`, inline: true  },
                   { name: 'Lowest Temp  ', value: `666°F`, inline: true },
                   { name: 'Humidity', value: `${Math.floor(Math.random() * 100)}%`, inline: true},
               	   { name: 'Pressure', value: `14.3M hPa`, inline: true},
                   { name: 'Visibility', value: `${Math.floor(Math.random() * 10)} Km`, inline: true},
                   { name: 'Wind Speed  ', value: `${Math.floor(Math.random() * 100)} MPH`, inline: true },
                   { name: 'Wind Direction  ', value: `${Math.floor(Math.random() * 360)}° ${degToCompass(Math.floor(Math.random() * 360))}`, inline: true },
                   { name: '‏‏‎ ‎', value: '‏‏‎ ‎', inline: true}
               )
                
                
                msg.channel.send(hellEmbed)
            }
        
        	if (parsedWeather.cod != '200') {
                if(hell == 'true') {
                    var nothing = 'nothing'
                    var hell = 'false'
                } else {
                   msg.channel.send("Error `" + parsedWeather.cod + "`, `" + parsedWeather.message + "`")
                }
            } else {
                
                

		
                

               const weatherEmbed = new Discord.MessageEmbed()
               .setColor('#0099ff')
               .setTitle(`${parsedWeather.weather[0].description} in ${parsedWeather.name}, ${parsedWeather.sys.country}`)
               .setThumbnail(`https://openweathermap.org/img/wn/${parsedWeather.weather[0].icon}@2x.png`)
               .setFooter('Powered by OpenWeatherMap')
               .addFields(
                   { name: 'Temperature  ', value: ` ${Math.round(parsedWeather.main.temp)}°F`, inline: true } ,
                   { name: 'Max Temp  ', value: `${Math.round(parsedWeather.main.temp_max)}°F`, inline: true  },
                   { name: 'Lowest Temp  ', value: `${Math.round(parsedWeather.main.temp_min)}°F`, inline: true },
                   { name: 'Humidity', value: `${parsedWeather.main.humidity}%`, inline: true},
               	   { name: 'Pressure', value: `${parsedWeather.main.pressure} hPa`, inline: true},
                   { name: 'Visibility', value: `${parsedWeather.visibility / 1000} Km`, inline: true},
                   { name: 'Wind Speed  ', value: `${Math.round(parsedWeather.wind.speed)} MPH`, inline: true },
                   { name: 'Wind Direction  ', value: `${parsedWeather.wind.deg}° ${degToCompass(parsedWeather.wind.deg)}`, inline: true },
                   { name: '‏‏‎ ‎', value: '‏‏‎ ‎', inline: true}
               )

           

                   msg.channel.send(weatherEmbed)
               
               
              
            }
        })



    }
};