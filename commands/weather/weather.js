const { MessageEmbed, Client } = require("discord.js");
const config = require("../../config.json");
const { main } = require('../../utils/pageinator.js');
const fetch = require('node-fetch');

module.exports = {
    name: "weather",
    description: "repeats what a player says",
    aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        /*

        var embed1 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Page test')
        .setDescription('1')
        .setTimestamp()

        var embed2 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Page test')
        .setDescription('2')
        .setTimestamp()


        var embed3 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Page test')
        .setDescription('3')
        .setTimestamp()

        var pages = [
            embed1,
            embed2,
            embed3
        ]

        main(pages, msg, 3.6e+6)
        .then((n) => console.log(n))
        .catch(e => console.error(e))
        */

        function degToCompass(num) {
            var val = Math.floor((num / 22.5) + 0.5);
            var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
            return arr[(val % 16)];
        }

        var city = args.join(' ')

        function isNumeric(value) {
            return /^-?\d+$/.test(value);
        }
    
       
    if(isNumeric(city)) {
        var url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + city + '&appid=' + config.openweathermap + '&units=imperial';
    } else {
        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + config.openweathermap + '&units=imperial';
    }
           
           
        await fetch(url)
            .then(response => {
                return response.json()
            })
            
            .then(parsedWeather => {
                if(city == 'hell'){
                    var hell = 'true'
                    const hellEmbed = new MessageEmbed()
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
                    
                    
    
            
                    
    
                   const weatherEmbed = new MessageEmbed()
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
    
               
    
                       msg.channel.send({ embeds:[weatherEmbed]})
                   
                   
                  
                }
            })
    
    


    },
};
