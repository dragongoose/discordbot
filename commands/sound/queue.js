const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
    name: "queue",
    aliases: ['q'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        let queue = client.distube.getQueue(msg);
        if (queue === undefined) return msg.channel.send('The queue is empty!')

        var text;

        function truncate(str, n){
            return (str.length > n) ? str.substr(0, n-1) + '..' : str;
          };

        for (let i = 0; i < queue.songs.length; i++) {
            var songname = truncate(queue.songs[i].name, 35)
            if(text == undefined){
                text =  i + 1 + ') ' + songname + ' - `' + queue.songs[i].formattedDuration + '`' + '\n'
            } else {
                text +=  i + 1 + ') ' + songname + ' - `' + queue.songs[i].formattedDuration + '`' + '\n'
            }
            
            
        }

 
               const embed = new MessageEmbed()
               .setTitle(`**Current Queue**`)
               .setDescription(text)
               .setColor(0xD53C55) // Green: 0x00AE86
               .setFooter('hi :3')
               .setTimestamp();
       
               msg.channel.send({ embeds: [embed] })
    }
};
