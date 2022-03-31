const { MessageEmbed, Client } = require("discord.js");
const config = require("../../config.json");
const { main } = require('../../utils/pageinator.js');
const fetch = require('node-fetch');
const pageinator = require('../../utils/pageinator.js');

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
        var city = args.join(' ')
        if (!city) return msg.channel.send('Please enter a city name.')

        function capitalize(str) {
            return str[0].toUpperCase() + str.slice(1);
        } 


        let limit = 1;
        let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${config.openweathermap}`

        let geoData = await fetch(geoUrl).then(res => res.json())
        if (geoData.count === 0) return msg.channel.send('City not found.')
        let lat = geoData[0].lat
        let lon = geoData[0].lon

        let cnt = 16;

        let url = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&units=imperial&appid=${config.openweathermap}`;
        let weather = await fetch(url).then(res => res.json())

        let pages = [];

        //Loop through the weather data and create a page for each day
        for (let i = 0; i < weather.list.length; i++) {
            let day = weather.list[i];
            let icon = day.weather[0].icon;
            let iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
            let description = day.weather[0].description;
            let temp = Math.round(day.main.temp);
            let tempMin = Math.round(day.main.temp_min);
            let tempMax = Math.round(day.main.temp_max);
            let feelsLike = Math.round(day.main.feels_like);
            let humidity = day.main.humidity;
            let windSpeed = day.wind.speed;
            let windDeg = day.wind.deg;
            let windDir = day.wind.deg;
            let pressure = day.main.pressure;
            let cloudiness = day.clouds.all;

            let temppage = new MessageEmbed()
                .setTitle(`${capitalize(description)} in ${capitalize(city)}`)
                .setDescription(`**${day.dt_txt}**`)
                .setColor(0xD53C55)
                .setThumbnail(iconUrl)
                .addField('Temp', `${temp}°F`, true)
                .addField('Min/Max', `${tempMin}°F/${tempMax}°F`, true)
                .addField('Feels Like', `${feelsLike}°F`, true)
                .addField('Humidity', `${humidity}%`, true)
                .addField('Wind', `${windSpeed} mph`, true)
                .addField('Cloudiness', `${cloudiness}%`, true)
                .setTimestamp()

            pages.push(temppage);
        }

        pageinator.main(pages, msg);



        /*
        if (weatherJson.cod != '200') {
            return msg.channel.send("Error `" + weatherJson.cod + "`, `" + weatherJson.message + "`")
        }

        const weatherEmbed = new MessageEmbed()
            .setTitle(`${capitalize(weatherJson.weather[0].description)} in ${weatherJson.name}, ${weatherJson.sys.country}`)
            .setThumbnail(`https://openweathermap.org/img/wn/${weatherJson.weather[0].icon}@2x.png`)
            .addFields(
                { name: 'Temp', value: ` ${Math.round(weatherJson.main.temp)}°F`, inline: true },
                { name: 'Max', value: `${Math.round(weatherJson.main.temp_max)}°F`, inline: true },
                { name: 'Low', value: `${Math.round(weatherJson.main.temp_min)}°F`, inline: true },
                { name: 'Feels Like', value: `${Math.round(weatherJson.main.feels_like)}°F`, inline: true },
                { name: 'Humidity', value: `${weatherJson.main.humidity}%`, inline: true },
                { name: 'Visibility', value: `${weatherJson.visibility / 1000} MILES`, inline: true },
                { name: 'Wind Speed  ', value: `${Math.round(weatherJson.wind.speed)} MPH`, inline: true },
            )
            .setTimestamp()
            .setColor('#808080')
            .setFooter({ text: msg.author.tag, iconURL: msg.author.avatarURL() });

        msg.channel.send({ embeds: [weatherEmbed] })
                */


    }
};
