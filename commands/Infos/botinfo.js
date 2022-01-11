require("moment-duration-format");
const { checkDays } = require('../../utils/u.js');
const Discord       = require("discord.js"),
    moment 	      	= require("moment");

exports.run = async (client, message, args, getPlayer, getUser) => {
	const con = client.connection;
	con.query(`SELECT COUNT(*) AS usersCount FROM data`, function (err, rows, fields) {
		if (err) throw err;

		const duration = moment.duration(client.uptime).format("DD [days], HH [hrs], mm [mins], ss [secs]");
		const test = moment(client.user.createdAt).format("DD/MM/YYYY");
		const developer = client.users.cache.find(user => user.id === client.config.owners[0]);
		let bicon = client.user.avatarURL();
		let botembed = new Discord.MessageEmbed()
			.setAuthor(`${client.user.username}`, bicon)
			.setColor(message.member.displayColor)
			.setThumbnail(bicon)
			.addField("⚒️ Developer", developer.tag)
			
			.addField("🕒 Uptime", duration, true)
			.addField("🖥️ Programming language", "Node.js", true)
			.addField("🌐 API", "discord.js", true)

			.addField("<:RAM:875793593778970624> Memory used", Math.floor(process.memoryUsage().heapUsed / 1024 / 1024) + " Mb", true)
			.addField("🕹️ Players", `${rows[0].usersCount}`, true)
			.addField("<:Discord:875795160498315294> Servers", `${client.guilds.cache.size}`, true)

			.addField("👥 Users", `${client.users.cache.size}`, true)
			.addField("📎 My link", "[Don't click](https://media.discordapp.net/attachments/706350683766390854/845538726162989076/3237789807_1_3_brmovBmI.png)", true)
			.addField("📆 Creation Date", `${test}\n(${checkDays(client.user.createdAt)})`, true)

			.setFooter(`${client.user.username}`, client.user.avatarURL({ dynamic: true }))
			.setTimestamp();
		message.channel.send({ embeds: [botembed] });
	});
};

exports.help = {
	name: "botinfo",
	description_fr: "Affiche des informations sur le bot",
	description_en: "Displays information about the bot",
	category: "Infos",
	aliases: ["bi"]
};
