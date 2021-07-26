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

        var toedit = await msg.channel.send('Evalutaing!')

        try {

            const streamPipeline = promisify(pipeline);


        const fileType = require('file-type');
        const asd = await fetch(Attachment.array()[0].url);
        const buffer = await asd.buffer();
        const type = await fileType.fromBuffer(buffer)
        console.log(type);
        if (!asd.ok) toedit.edit(`unexpected response ${response.statusText}`);
        toedit.edit('Got file! Sending to dragongooseCDN.')

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

            console.log(Buffer.from(buffer))

            formData.append('sampleFile', Buffer.from(buffer))

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

            toedit.edit("`" + res + "`")

            //log upload to db
            const { Database } = require("quickmongo");
            const db = new Database(config.dburl);

            try {
                if(res.includes(`${config.domain}/uploads`)) {
                    db.on("ready", () => {
                        db.push(`${msg.author.id}.uploads`, res)
                    })    
                }
            } catch (e) {
                toedit.edit('Database Error, Try again later.')
            }



        

        } catch (e) {
            console.log(e)
            return toedit.edit('Error')
        }

        
    }
};