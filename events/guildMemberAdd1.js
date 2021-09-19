const client = require("../index");
const { MessageEmbed } = require('discord.js');
const { isReady } = require("../index");

client.on('guildMemberAdd', async (member) => {
    if (member.user.bot) return; //ignore bots

    //get the cached invites for the server the member joined.
    const cachedInvites = client.invites.get(member.guild.id)
    var oldcxu = {};
    cachedInvites.forEach(u => {
        oldcxu[u.code] = u.uses
    })


    //get new invites and update cache
    const newInvites = await member.guild.invites.fetch();
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

    console.log(usedinvite)

    for (let i = 0; i < invites.length; i++) {
        var cached = oldcxu[invites[i]]
        var newer = newcxu[invites[i]]
        if (cached == newer) {
            usedinvite = newInvites.find(n => n.code === invites[i - 1])
        }
    }

    // Now lets find the logging channel in the current guild.
    const logChannel = member.guild.channels.cache.find(channel => channel.name === "🗒-logs");
    // If the channel doesn't exist, lets do nothing.
    if (!logChannel) return console.log('no channel');

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

    const interviewchannel = member.guild.channels.cache.find(channel => channel.name === "interview");

    if(!interviewchannel) return; //ignore if there is no interview channel
    let role = member.guild.roles.cache.find(r => r.name === "new kid");
    let memberrole = member.guild.roles.cache.find(r => r.name === "member");
    let interviewerrole = member.guild.roles.cache.find(r => r.name === "interviewer")

    if(!role) return;
    if(!memberrole) return;

    var guildinviter = member.guild.members.cache.get(inviter.id);
    var owner = member.guild.members.cache.get(member.guild.ownerId);

    member.roles.add(role);
    guildinviter.roles.add(interviewerrole);
    owner.roles.add(interviewerrole);

    const msg = await interviewchannel.send({embeds:[interviewembed]})
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
                    member.roles.remove(role);
                    member.roles.add(memberrole);
                    guildinviter.roles.remove(interviewerrole);
                    owner.roles.remove(interviewerrole);
                    logChannel.send(`<@${member.id}> was accepted by <@${user.id}>`)
                    break;
                case '❌':
                    guildinviter.roles.remove(interviewerrole);
                    owner.roles.remove(interviewerrole);
                    member.kick()
                    logChannel.send(`<@${member.id}> was declined and kicked by <@${user.id}>`)
                    break;
            }
        }
    });
    
    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });

})

module.exports.usedinvite = this.usedinvite;