const { MessageEmbed, Client } = require("discord.js");
const axios = require('axios').default;
const config = require('../../config.json')

module.exports = {
    name: "definition",
    description: "defines a word using urban dictonary",
    aliases: ['urban', 'define'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        var options = {
          method: 'GET',
          url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
          params: {term: args[0]},
          headers: {
            'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
            'x-rapidapi-key': config.urbanapikey
          }
        };
        
        axios.request(options).then((response) => {
            var data = response.data.list[0];

            const embed = new MessageEmbed()
            .setTitle(args[0])
            .addFields(
                { name: 'Definition', value: data.definition.replace(/[\[\]']+/g,'').substring(0, 500)},
                { name: 'Example', value: data.example.replace(/[\[\]']+/g,'').substring(0, 500)},
                { name: 'Likes/Dislikes', value: `👍 **${data.thumbs_up}**  👎 **${data.thumbs_down}**` }
            )
            .setTimestamp()
            .setColor('#808080')
            .setFooter(`Written by ${data.author}, ${data.written_on}`);

            msg.reply({ embeds:[embed] })
        }).catch((error) => {
            msg.reply('Error')
            console.log(error)
        });

    },
};
