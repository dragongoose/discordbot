const client = require("../index");
const { MessageEmbed } = require("discord.js")
const guildSettings = require("../schema/guildsettings.js")


client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.emoji.name != "⭐") return;

    var message;
    var starboard;

    if (reaction.partial) {
        console.log(reaction.partial)
        var fetchchannel = await client.channels.fetch(reaction.message.channelId)
        var message = await fetchchannel.messages.fetch(reaction.message.id)
        var guild = await client.guilds.cache.get(reaction.message.guildId)
    } else {
        message = reaction.message
        
    }

    const embed = new MessageEmbed()
    .setAuthor(message.author.username + message.author.discriminator, message.author.avatarURL())
    .setDescription(`[sauce](${message.url}) \n ${message.content}`)
    .setColor('#808080')
    .setFooter(message.id);

    if(message.reactions.cache.get("⭐").count < 3) return;

    async function main(starboard) {
        //check to see if there is a existing starboard post
        var existingstarboard;

        var fetched = await starboard.messages.fetch({ limit: 100 })
        fetched.forEach((mes) => {
            var id;
            try {
                id = JSON.parse(JSON.stringify(mes.embeds[0])).footer.text
            } catch (e) {

            }

            if (id == message.id) {
                existingstarboard = mes.id
            }
        })

        if (existingstarboard) {
            try {
                var boardmessage = await starboard.messages.fetch(existingstarboard)
                await boardmessage.edit({ content: `⭐ ${message.reactions.cache.get("⭐").count} <#${message.channel.id}>`, embeds: [embed] })
            } catch (e) {
                starboard.send({ content: `⭐ ${message.reactions.cache.get("⭐").count} <#${message.channel.id}>`, embeds: [embed] })
            }
        } else {
            starboard.send({ content: `⭐ ${message.reactions.cache.get("⭐").count} <#${message.channel.id}>`, embeds: [embed] })
        }
    }

    guildSettings.findOne({ guildID: message.guild.id })
        .then(async (set) => {
            console.log(set)
            if (!set) return;
            var parsed = JSON.parse(JSON.stringify(set))
            if (!parsed.settingsJson.starboard) return;
            console.log(parsed.settingsJson.starboard, "asd")

            starboard = await message.guild.channels.cache.get(set.settingsJson.starboard.channelId)

            main(starboard)
        });

})
