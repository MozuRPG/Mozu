const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    data: {
        name: "top",
        description: "Displays differents top 10",
        descriptionLocalizations: {
            fr: "Affiche différents top 10"
        },
        options: [
            {
                name: "top",
                description: "Choose the leaderboard you want to display",
                descriptionLocalizations: {
                    fr: "Choississez le classement que vous désirez afficher"
                },
                type: ApplicationCommandOptionType.String,
                choices: [
                    { name: 'money', value: 'money'}
                ],
                required: true
            }
        ]
    },
    async execute(client, interaction) {
        const choice = interaction.options.getString('top');
        
        const con = client.connection;
        
        switch (choice) {
            case 'money':
                const top10query = `SELECT username, money FROM data ORDER BY cast(money as SIGNED) DESC LIMIT 10`;

                const query = querytxt => {
                    return new Promise((resolve, reject) => {
                    con.query(querytxt, (err, results, fields) => {
                        if (err) reject(err);
                        resolve([results, fields]);
                    });
                    });
                };
                const [results, fields] = await query(top10query);
                const map1 = results.map((results, position) => `#${position + 1} **${results.username}** : ${results.money}💰`);

                return interaction.reply("🏆 __**Classement de la moula**__ 🏆\n\n" + map1.join("\n").replace(/^#1/, "🥇").replace(/^#2/, "🥈").replace(/^#3/, "🥉"));
        } 
    }
}