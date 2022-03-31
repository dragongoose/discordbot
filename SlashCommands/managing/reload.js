module.exports = {
    name: "reload",
    description: "Reloads every command",
    type: "CHAT_INPUT",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  
    run: async (client, interaction, args) => {
        interaction.followUp("Reloading commands...");

        const handler = require("../../handler/index.js")(client);
   

    },
  };
  