const { Command } = require('discord.js-commando')
const Discord = require('discord.js')
const fetch = require('node-fetch')
const fs = require('fs')
const { createWriteStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const config = require('../../config.json');
const path = require('path');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'upload',
            group: 'misc',
            memberName: 'upload',
            description: 'Uploads discord attatchment to dragongooseCDN',
            guildOnly: true,
        })
    }
    async run(msg) {

        var Attachment = (msg.attachments)
        if (!Attachment) return msg.channel.send('You must attatch a file.')
        console.log(Attachment.array()[0])

        var toedit = await msg.channel.send('Downloading...')

        try {

            const streamPipeline = promisify(pipeline);
            const response = await fetch(Attachment.array()[0].url);

            if (!response.ok) toedit.edit(`unexpected response ${response.statusText}`);

            await streamPipeline(response.body, createWriteStream(`./upload/${Attachment.array()[0].name}`))

            toedit.edit('Done Downloading! Uploading.')

            const https = require('https')

            async function makeRequest(formData, options) {
                return new Promise((resolve, reject) => {
                    const req = formData.submit(options, (err, res) => {
                        if (err) {
                            return reject(new Error(err.message))
                        }

                        if (res.statusCode < 200 || res.statusCode > 299) {
                            toedit.edit(`Error: HTTP status code ${res.statusCode}`)
                        }

                        const body = []
                        res.on('data', (chunk) => body.push(chunk))
                        res.on('end', () => {
                            const resString = Buffer.concat(body).toString()
                            resolve(resString)
                        })
                    })
                })
            }

            const FormData = require('form-data')

            const formData = new FormData()

            formData.append('sampleFile', fs.createReadStream(`./upload/${Attachment.array()[0].name}`))

            const options = {
                host: 'cdn.dragongoose.xyz',
                path: '/upload',
                method: 'POST',
                protocol: 'https:', // note : in the end
                headers: {
                    api_key: config.dragonapikey,
                },
            }

            const res = await makeRequest(formData, options);

            const embed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle(`cdn.dragongoose.xyz`)
                .setDescription(`Url: ${res}`)
                .setTimestamp()
                .setFooter('UDB', 'https://cdn.discordapp.com/avatars/860914974138695690/5e2c9d2e589c1fd46caa4b651586373e.webp?size=128');

            toedit.edit(embed)



        } catch (e) {
            console.log(e)
            return toedit.edit('Error')
        }


    }
};