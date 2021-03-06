const client = require("../index");
const { MessageActionRow, MessageButton } = require('discord.js');

/*
This script will take multiple discord MessageEmbed variables
and turn them into different pages that can be changed by 
a reaction lister as used in guildMemberAdd event.
*/

/**
 * 
 * @param {*} pages MessageEmbed's in a array of what each page should look like.
 * @param {*} msg discord.js Message object.
 * @returns 
 */
const main = async (pages, msg) => {
    return new Promise( async(resolve, reject) => {

        try{
            let firstPage = pages[0]
            firstPage.footer = { text: `Page 1 of ${pages.length}` }
            if(pages.length === 0){
                msg.channel.send(firstPage)
                resolve()
            }


            const message = await msg.channel.send({embeds:[firstPage]})
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
                                    let page = pages[currentpage]
                                    page.footer = {text: `Page ${currentpage + 1} of ${pages.length}`}
                                    message.edit({ embeds:[page]})
                                    for(const reaction of message.reactions.cache.values()){
                                        await reaction.users.remove(user.id)
                                    }


                                }
                                run()
                            }
                            break;
                        case '➡':
                            if(currentpage != pages.length - 1){
                               const run = async () => {
                                    currentpage = currentpage + 1
                                    let page = pages[currentpage]
                                    page.footer = {text: `Page ${currentpage + 1} of ${pages.length}`}
                                    message.edit({ embeds:[page]})
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

