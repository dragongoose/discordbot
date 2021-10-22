const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "setupjoinprotection",
    description: "repeats what a player says",
    aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        const guildSettings = require("../../schema/guildsettings.js")
        const guildstorage = await guildSettings.findOne({ guildID: msg.guild.id })
        const parsed = JSON.parse(JSON.stringify(guildstorage))

        var edit = await msg.channel.send("Starting....")

        if(parsed.settingsJson.joinprotection) return msg.channel.send('Already setup!')

        const embed = new MessageEmbed()
        .setColor('#808080')
        .setTitle(`Setup`)
        .setDescription('I will need to do the following to setup join protection: \n Make 3 roles, inviter, interviewer, new kid, and member. This must not be touched after being created \n I will create a new channel everytime a member joins. It will be deleted after the user is accepted/declined \n YOU must make every channel so @everyone cant view, but the member role can. Reply with YES if this is ok.')
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.avatarURL());

        edit.edit({ embeds: [embed] })

        let filter = m => m.author.id === message.author.id

                  //Created all needed things
                  var newkidrole = msg.guild.roles.cache.find(role => role.name === "new kid");
                  var inviterrole = msg.guild.roles.cache.find(role => role.name === "inviter");
                  var interviewerrole = msg.guild.roles.cache.find(role => role.name === "interviewer");

        msg.channel.awaitMessages(filter, {
            max: 1,
            time: 30000,
            errors: ['time']
          })
          .then(message => {
            message = message.first()
                switch(message.content) {
                    case message.content == 'YES':
                        edit.edit('Continuing')
                        (async() => {
                            if(!newkidrole) {
                                newkidrole = await message.guild.roles.create({
                                    data: {
                                      name: 'new kid',
                                      reason: 'the role is needed for join protection'
                                    }
                                  });
                              }
                    
                              if(!inviterrole) {
                                inviterrole = await message.guild.roles.create({
                                    data: {
                                      name: 'inviter',
                                      reason: 'the role is needed for join protection'
                                    }
                                  });
                              }
                    
                              if(!interviewerrole) {
                                interviewerrole = await message.guild.roles.create({
                                    data: {
                                      name: 'interviewer',
                                      reason: 'the role is needed for join protection'
                                    }
                                  });
                              }
                        })
                        break;
                    case message.channel != "YES":
                        msg.channel.send('aborting')
                        return;
                }
          })
          .catch(collected => {
            edit.edit('Timeout');
          });

          edit.edit({ content: 'What is the channel id of the channel I should log joins to? (Put 0 for none)', embeds: []})
  
          var logchannel;

          msg.channel.awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ['time']
            })
            .then(message => {
              message = message.first()
              var findchannel = client.guilds.cache.get(msg.guild.id).channels.cache.get(message.content)
                  switch(message.content) {
                      case findchannel != undefined:
                          logchannel = message.content
                          msg.channel.send('Continuing')
                          break;
                      case message.channel != "YES":
                          msg.channel.send('Channel not found!')
                          return;
                  }
            })
            .catch(collected => {
                message.channel.send('Timeout');
            });

        guildSettings.findOne({ guildID: msg.guild.id })
        .then(set => {
            var parsed = JSON.parse(JSON.stringify(set))

            var oldsettings = parsed.settingsJson
            var newsettings = oldsettings

            console.log(newsettings)

            newsettings.joinprotection = {
                newkid: newkidrole,
                inviterrole: inviterrole,
                interviewer: interviewerrole,
                logchannel: logchannel,
            }
            
            set.guildID = msg.guild.id;
            set.settingsJson = newsettings

            set.markModified('guildID');
            set.markModified('settingsJson');

            set.save((err) => {
                console.log(err)
            });
            msg.channel.send('Done!\!')
            
        });

    },
};
