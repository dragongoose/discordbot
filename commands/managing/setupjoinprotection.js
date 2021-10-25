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
    try {
      const guildSettings = require("../../schema/guildsettings.js")
      var guildstorage = await guildSettings.findOne({ guildID: msg.guild.id })
      const parsed = JSON.parse(JSON.stringify(guildstorage))

      var edit = await msg.channel.send("Starting....")

      if (!msg.member.permissions.has('MANAGE_GUILD')) return msg.reply('No Perms!');
      if (parsed && parsed.settingsJson.joinprotection) return msg.channel.send('Already setup!')

      const embed = new MessageEmbed()
        .setColor('#808080')
        .setTitle(`Setup`)
        .setDescription('I will need to do the following to setup join protection: \n Make 3 roles, inviter, interviewer, new kid, and member. This must not be touched after being created \n I will create a new channel everytime a member joins. It will be deleted after the user is accepted/declined \n YOU must make every channel so @everyone cant view, but the member role can. Reply with the channel id to log joins into if this is ok.')
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.avatarURL());

      edit.edit({ embeds: [embed] })

      let filter = m => m.author.id === msg.author.id

      //Created all needed things
      var newkidrole = msg.guild.roles.cache.find(role => role.name === "new kid");
      var inviterrole = msg.guild.roles.cache.find(role => role.name === "inviter");
      var interviewerrole = msg.guild.roles.cache.find(role => role.name === "interviewer");
      var memberrole = msg.guild.roles.cache.find(role => role.name === "member");

      var logchannel;



      const makeroles = new Promise((async (resolve, reject) => {
        if (!newkidrole) {
          newkidrole = await msg.guild.roles.create({
            name: 'new kid',
            reason: 'the role is needed for join protection'
          }).catch(err => reject(err))
        }

        if (!inviterrole) {
          inviterrole = await msg.guild.roles.create({
            name: 'inviter',
            reason: 'the role is needed for join protection'
          })
        }

        if (!interviewerrole) {
          interviewerrole = await msg.guild.roles.create({
            name: 'interviewer',
            reason: 'the role is needed for join protection'
          }).catch(err => reject(err))
        }

        if (!memberrole) {
          memberrole = await msg.guild.roles.create({ name: 'member', reason: 'the role is needed for join protection' }).catch(err => reject(err))
        }
        resolve()
      }))

      const collector = msg.channel.createMessageCollector({ filter, time: 15000 });

      collector.on('collect', message => {
        console.log(`Collected ${message.content}`);
        console.log(message.content)
        var channel = client.guilds.cache.get(msg.guild.id).channels.cache.get(message.content)
        if (!channel) return msg.channel.send('I couldnt find the channel');

        logchannel = message.content

        console.log(logchannel)

        guildSettings.findOne({ guildID: msg.guild.id })
          .then(set => {
            var parsed = JSON.parse(JSON.stringify(set))

            if (!parsed) {
              var emptysettings = new guildSettings({
                guildID: msg.guild.id,
                settingsJson: {
                  joinprotection: {
                    newkid: newkidrole,
                    member: memberrole,
                    inviterrole: inviterrole,
                    interviewer: interviewerrole,
                    logchannel: logchannel,
                  }
                },
              })
              emptysettings.save();
              return msg.channel.send('Set')
            } else {
              var oldsettings = parsed.settingsJson;
              var newsettings = oldsettings


              newsettings.joinprotection = {
                newkid: newkidrole,
                member: memberrole,
                inviterrole: inviterrole,
                interviewer: interviewerrole,
                logchannel: logchannel,
              }

              set.guildID = msg.guild.id;
              set.settingsJson = newsettings

              set.markModified('guildID');
              set.markModified('settingsJson');

              set.save();
              return msg.channel.send('done!')
            }
          });
      });


      collector.on('end', collected => {
        msg.channel.send(`Out of time. Try again.`);
      });
    } catch (e) {
      console.log(e)
      msg.channel.send("There was a error")
    }

  },
};
