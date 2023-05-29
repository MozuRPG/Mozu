const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    data: {
        name: 'mine',
        description: 'To mine resources',
        descriptionLocalizations: {
            fr: 'Pour miner des ressources'
        },
        options: [
            {
                name: 'energyamount',
                description: 'Amount of energy to spent',
                descriptionLocalizations: {
                    fr: 'Montant d\'énergie à dépenser'
                },
                type: ApplicationCommandOptionType.String,
                required: false
            }
        ]
    },
    /**
     * @param {import('discord.js').Client} client
     * @param {import('discord.js').CommandInteraction} interaction
     */
    async execute(client, interaction) {
        const amount = interaction.options.getString('energyamount');
        const player = await client.getPlayer(interaction.user.id);
        const Items = require(`../../utils/Items/${player.data.lang}.json`);
        const lang = require(`../../utils/Text/${player.data.lang}.json`);
        const maxEnergy = Items.objects.ring[player.items.ring].energy;
        const power = player.data.power;

        // all/a | [numbers] | nothing = 1 energy per command
        let manaAmount = 'all'.startsWith(amount) ? player.ress.energy : (!isNaN(amount) && amount > 0 ? amount : 1);
        if (manaAmount > player.ress.energy) return interaction.reply(`${lang.mine.notEnoughEnergy}`);

        let Stone  = 0,
        Coal      = 0,
        Copper    = 0,
        Iron      = 0,
        Gold      = 0,
        Malachite = 0;
        // Ressources drop
        for (let i = 0; i < manaAmount; i++) {
            Stone     += (Math.ceil(Math.random() * 70)) + power;                               // Pioche level 0 (mains nues)
            Coal      += (Math.ceil(Math.random() * 50)) + power;                               // Pioche level 0 (mains nues)
            Copper    += player.items.pickaxe > 0 ? (Math.ceil(Math.random() * 45)) + power : 0 // Pioche level 1 (pioche en pierre)
            Iron      += player.items.pickaxe > 1 ? (Math.ceil(Math.random() * 30)) + power : 0 // Pioche level 2 (pioche en cuivre)
            Gold      += player.items.pickaxe > 2 ? (Math.ceil(Math.random() * 15)) + power : 0 // Pioche level 3 (pioche en fer)
            Malachite += player.items.pickaxe > 3 ? (Math.ceil(Math.random() * 5)) + power : 0  // Pioche level 4 (pioche en or)
        }

        let ressLoot = [];
        if (Stone)      ressLoot.push(`+ ${client.nFormatter(Stone)} ${client.Emotes.stone}`);
        if (Coal)       ressLoot.push(`+ ${client.nFormatter(Coal)} ${client.Emotes.coal}`);
        if (Copper)     ressLoot.push(`+ ${client.nFormatter(Copper)} ${client.Emotes.copper}`);
        if (Iron)       ressLoot.push(`+ ${client.nFormatter(Iron)} ${client.Emotes.iron}`);
        if (Gold)       ressLoot.push(`+ ${client.nFormatter(Gold)} ${client.Emotes.gold}`);
        if (Malachite)  ressLoot.push(`+ ${client.nFormatter(Malachite)} ${client.Emotes.malachite}`);

        let pickaxe = Items.tools.pickaxe[player.items.pickaxe];

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setColor(interaction.member.displayColor)
            .setThumbnail("https://equity.guru/wp-content/uploads/2018/01/blockchain2.gif")
            .addFields(
                { name: lang.mine.title, value: ressLoot.join("\n") }, //⚡ ${lang.mine.usedEnergy.replace("%s", manaAmount)}\n
                { name: lang.mine.infos, value: `⚡ ${client.translate(player.data.lang, 'mine.remainingEnergy', player.ress.energy-manaAmount + "/" + maxEnergy)}\n${client.Emotes.chests.Tools.rune_pickaxe} ${pickaxe.name}\n💪 ${client.translate(player.data.lang, 'mine.power', player.data.power)}` }
            );//\n${lang.inventory.level}: ${player.items.pickaxe}\n${lang.inventory.enchant}: ${player.enchant.ench_pickaxe}`)

        interaction.reply({ embeds: [embed] });

        client.query(`UPDATE ress SET energy = energy - ${manaAmount}, stone = stone + ${Stone}, coal = coal + ${Coal}, copper = copper + ${Copper}, iron = iron + ${Iron}, gold = gold + ${Gold}, malachite = malachite + ${Malachite} WHERE userid = ${interaction.user.id}`);
    }
}