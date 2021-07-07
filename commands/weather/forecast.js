const { Command } = require('discord.js-commando')
const Discord = require('discord.js')


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'forecast',
            aliases: ['7day'],
            group: 'weather',
            memberName: 'forecast',
            description: 'Shows the forecast for the respective zip code (US Only)',
            guildOnly: true,
            args: [
                {
                    type: "string",
                    prompt: "What is the zip code",
                    key: "text",
                }
            ]
        })
    }
    run(msg, { text }) {
        var ziptocord = function (zip) {
            return new Promise((resolve, reject) => {
                var zip2lat = `https://nominatim.openstreetmap.org/search.php?q=${zip}&format=json`

                const https = require('https')
                const options = {
                    hostname: 'nominatim.openstreetmap.org',
                    port: 443,
                    path: `/search.php?q=${zip}&format=json`,
                    method: 'GET',
                    headers: { 'User-Agent': 'UDB/1.0' }
                }

                const req = https.request(options, res => {
                    if (res.statusCode == '404') return reject('404');

                    res.on('data', data => {
                        var data = JSON.parse(data.toString());
                        if (data == '[]') return msg.channel.send('Invalid Zipcode');
                        let lat = parseFloat(data[0].lat).toFixed(2);
                        let lon = parseFloat(data[0].lon).toFixed(2);
                        var re = {
                            "lat": lat,
                            "lon": lon
                        }
                        console.log(re);
                        resolve(re)
                    })
                })

                req.on('error', error => {
                    reject(error)
                    console.log(error)
                    return msg.channel.send('error')
                })

                req.end()
            });
        }

        ziptocord(text)
            .then(re => forecastJson(re.lat, re.lon))
            .catch(e => { msg.channel.send('error'); console.log(e) });

        function forecastJson(lat, lon) {
            var api = `https://forecast.weather.gov/MapClick.php?=&lat=${lat}&lon=${lon}&FcstType=json`
            const fetch = require('node-fetch');

            console.log(lat, lon)

            fetch(`https://forecast.weather.gov/MapClick.php?=&lat=${lat}&lon=${lon}&FcstType=json`)
                .then(res => res.json())
                .then(json => {

                    const exampleEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`Weather in ${json.location.areaDescription}`)
                        .setURL(json.credit)
                        .setAuthor('weather.gov', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/US-NationalWeatherService-Logo.svg/1200px-US-NationalWeatherService-Logo.svg.png')
                        .setDescription('Some description here')
                        .setTimestamp()
                        .setFooter('Data © OpenStreetMap contributors, ODbL 1.0 + Weather.gov', 'https://cdn.discordapp.com/avatars/860914974138695690/5e2c9d2e589c1fd46caa4b651586373e.webp?size=128');
                    
                        for (let i = 0; i < json.time.startPeriodName.length; i++) {
                            if ((i % 2) == 0) {
                                exampleEmbed.addField(json.time.startPeriodName[i], `**Weather:** \n ${json.data.weather[i]}\n**Temp:** ${json.data.temperature[i]}°F \n `, true)
                            }
                        } 
                        
                        if(json.data.hazard != '[]'){
                            exampleEmbed.addField('‏‏‎ ‎', '‏‏‎ ‎', true)

                            var hazards;

                            for (let i = 0; i < json.data.hazard.length; i++) {
                                hazards += `[${json.data.hazard[i]}](${json.data.hazardUrl[i]})` + '\n'
                            }

                            var hazards = hazards.replace(/undefined/g,'');

                            exampleEmbed.addField('‏‏‎Hazards', hazards, true)
                        }

                        

                        msg.channel.send(exampleEmbed);
                })
                .catch(err => console.error(err));


        }

    }
};