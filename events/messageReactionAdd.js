const client = require("../index");
const { MessageEmbed } = require("discord.js")

/*
client.on('messageReactionAdd', async (reaction, user) => {
    if(reaction.emoji.name != "⭐") return;
    const message = reaction.message
    const starboard = message.guild.channels.cache.find(n => n.name === 'starboard')
    console.log(message.createdTimestamp)

    const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setDescription(`[sauce](${message.url}) \n ${message.content}`)
    .setColor('#808080')
    .setFooter(message.id);

    starboard.send({ content:`⭐ <#${message.channel.id}>`, embeds:[embed]})
})
*/