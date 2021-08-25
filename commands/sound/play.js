const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search')
const config = require('../../config.json');
const { ConnectionStates } = require('mongoose');


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: ['p'],
			group: 'sound',
			memberName: 'play',
			description: 'plays music',
			guildOnly: true,
			args: [
				{
					type: "string",
					prompt: "what would you like to play",
					key: "text",
				}
			]
		})
	}
	async run(msg, { text }) {
        const queue = new Map();
        
        

        const vc = msg.member.voice.channel
        if(!vc) return msg.channel.send('you must be in a vc');
        const permissions = vc.permissionsFor(msg.client.user);
        if(!permissions.has('CONNECT')) return msg.channel.send('You dont have the right permissions!')
        if(!permissions.has('SPEAK')) return msg.channel.send('You dont have the right permissions!')

        const server_queue = queue.get(msg.guild.id);

        let song = {};

        if(ytdl.validateURL(text)) {
            const song_info = await ytdl.getInfo(text);

            song = { url: song_info.videoDetails.video_url, title: song_info.videoDetails.title }

        } else {
            //here is for when the text is not a url
            const videofinder = async (keywords) => {
                const result = await ytSearch(keywords)
                return (result.videos.length > 1) ? result.videos[0] : null;
            }

            const video = await videofinder(text);
            if(video){
                song = { url: video.title, title: video.title }
            } else {
                msg.channel.send('error finding video.')
            }
        }

        if(!server_queue){
            
            const queue_constructor = {
                voice_channel: vc,
                text_channel: msg.channel,
                connection: null,
                songs: []
                
            }

            queue.set((msg.guild.id), queue_constructor);
            queue_constructor.songs.push(song);

            const video_player = async (guild, song) => {
                const song_queue = queue.get(guild.id);
    
                if(!song) {
                    song_queue.voice_channel.leave();
                    queue.delete(guild.id);
                    return;
                }
                const stream = ytdl(song.url, { filter: 'audioonly'})
    
                console.log(stream)

                console.log(song_queue.connection)
    
                song_queue.connection.play(stream, { volume: 1 })
                .on('finish', () => {
                    song_queue.songs.shift();
                    video_player(guild, song_queue.songs[0])
                })
                await song_queue.text_channel.send(`Now playing **${song.title}**`)
            }

            try{
                const connection = await vc.join();
                queue_constructor.connection = connection;
                video_player(msg.guild, queue_constructor.songs[0]);

            } catch (e) {
                queue.delete(msg.guild.id);
                msg.channel.send('There was an issue connecting!')
                throw e;
            }
        } else {
            server_queue.songs.push(song);
            return msg.channel.send(`**${song.title}** had been added to queue!`);
        }

	}
};