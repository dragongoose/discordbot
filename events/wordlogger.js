const client = require("../index");
const totalWords = require("../schema/totalwords.js")

client.on("messageCreate", async (message) => {

    if(message.author.bot) return;

    var words = message.content.toLowerCase().split(" ");
    const words = words.map(name => name.toLowerCase());


    for (let i = 0; i < words.length; i++) {
        try {
            const allthewords = await totalWords.find({ guildID: message.guild.id, word: words[i] });

            if (allthewords.length === 0) {
                //console.log(`Word ${words[i]} has never been said!`)

                var newword = new totalWords({
                    guildID: message.guild.id,
                    word: words[i],
                    count: 1
                })
                await newword.save();
            } else {
                const parsed = JSON.parse(JSON.stringify(allthewords))

                //console.log(parsed[0].count)

                totalWords.findOne({ guildID: message.guild.id, word: words[i] })
                    .then(user => {
                        user.guildID = message.guild.id;
                        user.word = words[i];
                        user.count = parsed[0].count + 1;

                        user.markModified('guildID');
                        user.markModified('word');
                        user.markModified('count');

                        user.save(err => console.log(err));
                    });
            }

        } catch (err) {
            console.log(err)
        }
    }
})

