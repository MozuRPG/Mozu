const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with the websocket latency.")
		.setNameLocalizations({
			fr: "ping",
			"en-US": "ping"
		})
		.setDescriptionLocalizations({
			fr: "Affiche la latence des websockets.",
			"en-US": "Replies with the websocket latency."
		}),
	async execute(client, interaction) {
		await interaction.deferReply('Ping ?');
        await interaction.editReply(`
            🏓P${'o'.repeat(Math.min(Math.round(client.ws.ping / 100), 1500))}ng!\nAverage ping of all WebSocketShards ► ${Math.round(client.ws.ping)}ms.
        `);
	},
};