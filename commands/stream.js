const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stream')
		.setDescription('permet de savoir si un streamer est en live')
		.addStringOption(option => option.setName('id').setDescription('nom du streamer').setRequired(true)),
	async execute(interaction) {
		const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
		const channelName = interaction.options.getString('id');
		const channel = await client.channels.fetch(channelID);

		const options = {
			headers: {

				'Authorization': 'Bearer 0xalvezq8hxlph65270st91lkf5xl6',

				'Client-ID': 'yrqmlkqe7rvlx3sj2t584ev68qyp9e',
			},

		};


		async function getdata() {
			await fetch(`https://api.twitch.tv/helix/streams?user_login=` + channelName, options).then(response => response.json()
				.then(json => {
					var r = json;
					console.log(r);
					console.log("data = " + r["data"].type);
					if (r["data"][0] == null) {
						channel.send(channelName + " is not online");
					} else {
						channel.send(channelName + " is online");
					}
				}));
			await wait(5000);
			getdata();
		}

		getdata();
	},
};