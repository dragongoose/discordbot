const client = require("../index");



client.on('inviteCreate', async (invite) => {
    client.invites.set(invite.guild.id, await invite.guild.invites.fetch());
});