const { Client, RichEmbed } = require('discord.js');
const yt = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const fs = require('fs');
const Discord = require('discord.js');
const config = require("../../authorization.json")
const YouTube = require('simple-youtube-api');
const ytapi = new YouTube(config.youtube);
const db = require("quick.db");
const log = require('../../utils/logger');
const fetch = require("node-fetch");
const moment = require("moment")

const defaultRegions = {
	asia: ['sydney', 'singapore', 'japan', 'hongkong'],
	eu: ['london', 'frankfurt', 'amsterdam', 'russia', 'eu-central', 'eu-west'],
	us: ['us-central', 'us-west', 'us-east', 'us-south', 'brazil'],
};

module.exports = {
	name: 'pause',
	aliases: ['resume'],
  description: 'Toggle pause and resume mode.',
  async execute(message, client, args) {
		if (!message.member.guild.me.hasPermission('CONNECT')) {
			const embed = new Discord.MessageEmbed()
				.setTitle('❌ No permissions!')
				.setDescription('I don\'t have permission to join that channel. Make sure you setup the permissions correctly for me.')
				.setColor('#e74c3c');
			return message.channel.send(embed);
		}
		if (!message.member.guild.me.hasPermission('SPEAK')) {
			const embed = new Discord.MessageEmbed()
				.setTitle('❌ No permissions!')
				.setDescription('I don\'t have permission to speak in that channel. Make sure you setup the permissions correctly for me.')
				.setColor('#e74c3c');
			return message.channel.send(embed);
		}
		const prefix = db.fetch(`prefix-${message.guild.id}`);
		args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();
		if(command == "pause") {
			await client.player.get(message.guild.id).pause(pause=true)
			message.react("👍")	
			log("warn", `Playback was paused in ${message.guild.name} by ${message.author.tag}`)		
		}
		if(command == "resume") {
			await client.player.get(message.guild.id).pause(pause=false)
			message.react("👍")	
			log("warn", `Playback was resumed in ${message.guild.name} by ${message.author.tag}`)
		}
    }
}