const client = require("../index");
const { MessageActionRow, MessageButton } = require('discord.js');

/*
This script will take multiple discord MessageEmbed variables
and turn them into different pages that can be changed by 
a reaction lister as used in guildMemberAdd event.
*/

//the total argument will be a array includiding all of the pages.
//timeout will be a string.
const main = async (total, msg, timeout) => {
    return new Promise( async(resolve, reject) => {

        try{
            const message = await msg.channel.send({embeds:[total[0]]})
            await message.react('⬅')
            await message.react('➡')
        
            const filter = (reaction, user) => (reaction.emoji.name === '⬅' || reaction.emoji.name === '➡');

            const collector = message.createReactionCollector({ filter, time: 604800000 });

            client.paginator = {}
            client.paginator[message.id] = 0
            var currentpage = client.paginator[message.id]
            
            collector.on('collect', (reaction, user) => {
                if(user.bot) return;
        
                    switch (reaction.emoji.name) {
                        case '⬅':
                            if(currentpage != 0){
                                const run = async () => {
                                    currentpage = currentpage - 1
                                    message.edit({ embeds:[total[currentpage]]})
                                    for(const reaction of message.reactions.cache.values()){
                                        await reaction.users.remove(user.id)
                                    }


                                }
                                run()
                            }
                            break;
                        case '➡':
                            if(currentpage != total.length - 1){
                               const run = async () => {
                                    currentpage = currentpage + 1
                                    message.edit({ embeds:[total[currentpage]]})
                                    for(const reaction of message.reactions.cache.values()){
                                        await reaction.users.remove(user.id)
                                    }

                                }
                                run()
                            }
                            break;

                    }
                
            });
            
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });

        } catch (e) {
            reject(e)
        }


    })
}

module.exports.main = main;

