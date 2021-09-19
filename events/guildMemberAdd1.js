const client = require("../index");
const { MessageEmbed } = require('discord.js');
const { isReady } = require("../index");
const { log } = require("npmlog");

client.on('guildMemberAdd', async (member) => {
    if (member.user.bot) return; //ignore bots

    //get the cached invites for the server the member joined.
    const cachedInvites = client.invites.get(member.guild.id)
    var oldcxu = {};
    cachedInvites.forEach(u => {
        oldcxu[u.code] = u.uses
    })


    //get new invites and update cache
    var newInvites = await member.guild.invites.fetch();
    client.invites.set(member.guild.id, newInvites);

    //use the cached invites to find who used what invite because discord.js doesnt allow you to see who used an invite
    //const usedInvite = newInvites.find(invite => invite.uses === cachedInvites.get(invite.code).uses < invite.uses);
    var newcxu = {};
    var invites = [];

    newInvites.forEach(u => {
        newcxu[u.code] = u.uses
    })

    newInvites.forEach(u => {
        invites.push(u.code)
    })
    

    console.log(oldcxu)
    console.log(newcxu)

    var usedinvite;

    for (let i = 0; i < invites.length; i++) {
        var cached = oldcxu[invites[i]]
        var newer = newcxu[invites[i]]
        console.log(`CACGED: ${cached} NEWER: ${newer}`)
        if (cached + 1 == newer) {
            usedinvite = newInvites.find(n => n.code === invites[i])
        } else if(newer === undefined){
            usedinvite = newInvites.find(n => n.code === invites[i])
        } 
    }

    for (let i = 0; i < oldcxu.length; i++) {
        var cached = oldcxu[invites[i]]
        var newer = newcxu[invites[i]]
        console.log(`CACGED: ${cached} NEWER: ${newer}`)
        if (cached + 1 == newer) {
            usedinvite = newInvites.find(n => n.code === invites[i])
        } else if(newer === undefined){
            usedinvite = newInvites.find(n => n.code === invites[i])
        }
    }

    if(usedinvite === undefined){
        usedinvite = {
            code:'unknown',
            uses:'unknown',
            maxUses:'unknowm',
            inviter: {
                id:'unknown'
            }
        }
    }

    var newarr = (function(arr){
        var m = {}, newarr = []
        for (var i=0; i<arr.length; i++) {
          var v = arr[i];
          if (!m[v]) {
            newarr.push(v);
            m[v]=true;
          }
        }
        return newarr;
      })

      var invites = newarr(invites)
      console.log(invites)

    // Now lets find the logging channel in the current guild.
    const logChannel = member.guild.channels.cache.find(channel => channel.name === "🗒-logs");
    // If the channel doesn't exist, lets do nothing.
    if (!logChannel) return console.log('no channel');

    console.log(usedinvite)

    const { code, uses, inviter, channel } = usedinvite;

    const embed = new MessageEmbed()
        .setTitle(`${member.user.tag} joined!`)
        .addFields(
            { name:'Invited by:', value:`<@${inviter.id}>`, inline: true },
            { name:'Invite code uses:', value:`${uses}/${usedinvite.maxUses}`, inline: true },
        )
        .setColor(0xD53C55) // Green: 0x00AE86
        .setTimestamp();

    logChannel.send({embeds:[embed]})

    const interviewembed = new MessageEmbed()
    .setTitle(`${member.user.tag} joined!`)
    .addFields(
        { name:'Invited by:', value:`<@${inviter.id}>`, inline: true },
        { name:'Invite code uses:', value:`${uses}/${usedinvite.maxUses}`, inline: true },
    )
    .setDescription(`<@${member.guild.ownerId}>, React with ✅ to allow <@${member.id}> into the server. React with ❌ to kick them.`)
    .setColor(0xD53C55) // Green: 0x00AE86
    .setTimestamp();

    const interviewchannel = member.guild.channels.cache.find(channel => channel.name === "invites-n-shit");

    if(!interviewchannel) return; //ignore if there is no interview channel
    let role = member.guild.roles.cache.find(r => r.name === "new kid");
    let memberrole = member.guild.roles.cache.find(r => r.name === "member");
    let interviewerrole = member.guild.roles.cache.find(r => r.name === "interviewer")
    let inviterrole = member.guild.roles.cache.find(r => r.name === "inviter")

    if(!role) return;
    if(!memberrole) return;

    var guildinviter = member.guild.members.cache.get(inviter.id);
    var owner = member.guild.members.cache.get(member.guild.ownerId);

    try{
        member.roles.add(role).catch((e) => {interviewchannel.send('Error giving new member role.')});
        guildinviter.roles.add(inviterrole).catch((e) => {interviewchannel.send('Error giving inviter role.')});
        owner.roles.add(interviewerrole).catch((e) => {interviewchannel.send('Error giving owner role.')});
    } catch (e) {
        interviewchannel.send('Error while providing roles.')
    }


    const msg = await interviewchannel.send({embeds:[interviewembed]})
    interviewchannel.send(`||<@&889156206143340574> <@&889008732342738945> ||`)
    await msg.react('✅')
    await msg.react('❌')

    const filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && (user.id === member.guild.ownerId || member.id);
  
    
    const collector = msg.createReactionCollector({ filter, time: 604800000 });
    
    collector.on('collect', (reaction, user) => {
        if(user.bot) return;

        var gmember = member.guild.members.cache.get(user.id)

        if(gmember._roles.includes(interviewerrole.id)) {
            console.log(user.id)
            switch (reaction.emoji.name) {
                case '✅':
                    try{
                        member.roles.remove(role);
                        member.roles.add(memberrole);
                        guildinviter.roles.remove(inviterrole);
                        owner.roles.remove(interviewerrole);
                        logChannel.send(`<@${member.id}> was accepted by <@${user.id}>`)
                    } catch (e) {
                        console.log(e)
                    }

                    msg.channel.clone()
                    msg.channel.delete()
                    break;
                case '❌':
                    try{
                        guildinviter.roles.remove(interviewerrole);
                        owner.roles.remove(interviewerrole);
                        member.kick()
                    } catch (e){
                        console.log(e)
                    }
                    logChannel.send(`<@${member.id}> was declined and kicked by <@${user.id}>`)
                    msg.channel.clone()
                    msg.channel.delete()
                    break;
            }
        }
    });
    
    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });

})

module.exports.usedinvite = this.usedinvite;