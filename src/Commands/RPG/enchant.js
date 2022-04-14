const { MessageEmbed } = require('discord.js'),
    Default          = require('../../../utils/default.json'),
    Emotes           = require('../../../utils/emotes.json'),
    manageEnchant    = require('../../../functions/manageEnchant');

module.exports = {
    name: 'enchant',
    description: 'Pour enchanter votre équipement',
    options : [
        {
            name: 'équipement',
            description: 'Choisissez ce que vous voulez enchanter.',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Info',
                    value: 'info'
                },
                {
                    name: 'Pioche',
                    value: 'pickaxe'
                },
                {
                    name: 'Épée',
                    value: 'sword'
                },
                {
                    name: 'Bouclier',
                    value: 'shield'
                },
                {
                    name: 'Tête',
                    value: 'head'
                },
                {
                    name: 'Épaules',
                    value: 'shoulders'
                },
                {
                    name: 'Torse',
                    value: 'chest'
                },
                {
                    name: 'Poignets',
                    value: 'wrists'
                },
                {
                    name: 'Mains',
                    value: 'hands'
                },
                {
                    name: 'Ceinture',
                    value: 'waist'
                },
                {
                    name: 'Jambes',
                    value: 'legs'
                },
                {
                    name: 'Pieds',
                    value: 'feet'
                }
            ]
        }
    ],
    async execute(client, interaction, getPlayer) {
        const { user, member, options } = interaction;
        const value = options.getString('équipement');

        const con = client.connection;
        const player = await getPlayer(con, user.id);
        if (!player) return interaction.reply(Default.notRegistered);
        const lang = require(`../../utils/Text/${player.data.lang}.json`);

        const enchantEmbed = new MessageEmbed()
            .setColor(member.displayColor)
            .setTitle("ENCHANT")
            .setThumbnail("https://media.discordapp.net/attachments/691992473999769623/796006868212383755/EnchantedDiamondSwordNew.gif")
            .addField("Description", `${lang.enchant.description}`)
            .addField("Documentation", `${lang.enchant.doc} ${Emotes.tools} [ pickaxe ]\n${Emotes.weapons} [ sword / shield ]\n ${Emotes.armors} [ head / shoulders / chest / wrists ]\n${Emotes.armors} [ hands / waist / legs / feet ]`)
            .setTimestamp()
            .setFooter({ text:`${user.username}`, iconURL: client.user.avatarURL() });

        switch (value) {
            case "pickaxe":
                return manageEnchant(client, con, player, interaction, "tools", "pickaxe", "ench_pickaxe")
            case "sword":
                return manageEnchant(client, con, player, interaction, "tools", "sword", "ench_sword");
            case "shield":
                return manageEnchant(client, con, player, interaction, "tools", "shield", "ench_shield")
            case "head":
                return manageEnchant(client, con, player, interaction, "armors", "head", "ench_head")
            case "shoulders":
                return manageEnchant(client, con, player, interaction, "armors", "shoulders", "ench_shoulders")
            case "chest":
                return manageEnchant(client, con, player, interaction, "armors", "chest", "ench_chest")
            case "wrists":
                return manageEnchant(client, con, player, interaction, "armors", "wrists", "ench_wrists")
            case "hands":
                return manageEnchant(client, con, player, interaction, "armors", "hands", "ench_hands")
            case "waist":
                return manageEnchant(client, con, player, interaction, "armors", "waist", "ench_waist")
            case "legs":
                return manageEnchant(client, con, player, interaction, "armors", "legs", "ench_legs")
            case "feet":
                return manageEnchant(client, con, player, interaction, "armors", "feet", "ench_feet");
            case "info":
                return interaction.reply({ embeds: [enchantEmbed] });
        }
    }
}