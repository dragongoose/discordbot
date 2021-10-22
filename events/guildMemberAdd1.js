const client = require("../index");
const { MessageEmbed } = require('discord.js');
const guildSettings = require("../schema/guildsettings.js")
const mongoose = require('mongoose');

client.on('guildMemberAdd', async (member) => {
    if (member.user.bot) return; //ignore bots

    const guildstorage = await guildSettings.findOne({ guildID: member.guild.id })
    if (guildstorage === null) return;
    const parsed = JSON.parse(JSON.stringify(guildstorage))
    if (parsed.settingsJson.joinprotection === null) return;

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
        } else if (newer === undefined) {
            usedinvite = newInvites.find(n => n.code === invites[i])
        }
    }

    for (let i = 0; i < oldcxu.length; i++) {
        var cached = oldcxu[invites[i]]
        var newer = newcxu[invites[i]]
        console.log(`CACGED: ${cached} NEWER: ${newer}`)
        if (cached + 1 == newer) {
            usedinvite = newInvites.find(n => n.code === invites[i])
        } else if (newer === undefined) {
            usedinvite = newInvites.find(n => n.code === invites[i])
        }
    }

    if (usedinvite === undefined) {
        usedinvite = {
            code: 'unknown',
            uses: 'unknown',
            maxUses: 'unknowm',
            inviter: {
                id: 'unknown'
            }
        }
    }

    var newarr = (function (arr) {
        var m = {}, newarr = []
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            if (!m[v]) {
                newarr.push(v);
                m[v] = true;
            }
        }
        return newarr;
    })

    var invites = newarr(invites)
    console.log(invites)




    // Now lets find the logging channel in the current guild.
    var logChannel = member.guild.channels.cache.get(parsed.settingsJson.joinprotection.logchannel)
    // If the channel doesn't exist, lets do nothing.
    if (!logChannel) {
        logChannel = {
            "send": async (asd) => {
            }
        }
    }


    console.log(usedinvite)

    const { code, uses, inviter, channel } = usedinvite;

    const embed = new MessageEmbed()
        .setTitle(`${member.user.tag} joined!`)
        .addFields(
            { name: 'Invited by:', value: `<@${inviter.id}>`, inline: true },
            { name: 'Invite code uses:', value: `${uses}/${usedinvite.maxUses}`, inline: true },
        )
        .setColor(0xD53C55) // Green: 0x00AE86
        .setTimestamp();

    logChannel.send({ embeds: [embed] }).catch(e => console.log('error'))

    const interviewembed = new MessageEmbed()
        .setTitle(`${member.user.tag} joined!`)
        .addFields(
            { name: 'Invited by:', value: `<@${inviter.id}>`, inline: true },
            { name: 'Invite code uses:', value: `${uses}/${usedinvite.maxUses}`, inline: true },
        )
        .setDescription(`<@${member.guild.ownerId}>, React with ✅ to allow <@${member.id}> into the server. React with ❌ to kick them.`)
        .setColor(0xD53C55) // Green: 0x00AE86
        .setTimestamp();

    let everyoneRole = member.guild.roles.cache.find(r => r.name === '@everyone');
    const inviterrole = member.guild.roles.cache.get(parsed.settingsJson.joinprotection.inviterrole)
    const interviewerrole = member.guild.roles.cache.get(parsed.settingsJson.joinprotection.interviewer)
    const newkidrole = member.guild.roles.cache.get(parsed.settingsJson.joinprotection.newkid)

    let interviewchannel = await member.guild.channels.create(`${member.user.tag}-join`, {
        type: 'text',
        permissionOverwrites: [
            {
                id: everyoneRole.id,
                deny: ['SEND_MESSAGES'],
            },
            {
                id: inviterrole.id,
                allow: ['VIEW_CHANNEL'],
                allow: ['SEND_MESSAGES'],
            },
            {
                id: interviewerrole.id,
                allow: ['VIEW_CHANNEL'],
                allow: ['SEND_MESSAGES'],
            },
            {
                id: newkidrole.id,
                allow: ['VIEW_CHANNEL'],
                allow: ['SEND_MESSAGES'],
            },
        ],
    })

    if (!interviewchannel) return; //ignore if there is no interview channel

    var guildinviter = member.guild.members.cache.get(inviter.id);
    var owner = member.guild.members.cache.get(member.guild.ownerId);

    try {
        member.roles.add(newkidrole).catch((e) => { interviewchannel.send('Error giving new member role.') });
        guildinviter.roles.add(inviterrole).catch((e) => { interviewchannel.send('Error giving inviter role.') });
        owner.roles.add(interviewerrole).catch((e) => { interviewchannel.send('Error giving owner role.') });
    } catch (e) {
        interviewchannel.send('Error while providing roles.')
    }


    const msg = await interviewchannel.send({ embeds: [interviewembed] })
    interviewchannel.send(`||<@&889156206143340574> <@&889008732342738945> ||`)
    await msg.react('✅')
    await msg.react('❌')

    const filter = (reaction, user) => (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && (user.id === member.guild.ownerId || member.id);


    const collector = msg.createReactionCollector({ filter, time: 604800000 });

    collector.on('collect', (reaction, user) => {
        if (user.bot) return;

        var gmember = member.guild.members.cache.get(user.id)

        if (gmember._roles.includes(interviewerrole.id)) {
            console.log(user.id)
            switch (reaction.emoji.name) {
                case '✅':
                    try {
                        member.roles.remove(newkidrole);
                        member.roles.add(memberrole);
                        guildinviter.roles.remove(inviterrole);
                        owner.roles.remove(interviewerrole);
                        logChannel.send(`<@${member.id}> was accepted by <@${user.id}>`).catch(e => console.log('error'))
                    } catch (e) {
                        console.log(e)
                    }

                    msg.channel.delete()
                    break;
                case '❌':
                    try {
                        member.kick()
                        guildinviter.roles.remove(interviewerrole);
                        owner.roles.remove(interviewerrole);
                    } catch (e) {
                        console.log(e)
                    }
                    logChannel.send(`<@${member.id}> was declined and kicked by <@${user.id}>`).catch(e => console.log('error'))
                    msg.channel.delete()
                    break;
            }
        }
    });

    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });

})