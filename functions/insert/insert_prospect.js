const Default = require('../../utils/default.json');

module.exports = async function insert_prospect(client, con, player, message, databaselogs, userid) {
    if (!player) {
        await con.query(`INSERT INTO prospect (
            uuid, userid, sapphire, amber,
            citrine, ruby, jade, amethyst
            ) VALUES (
            '${Default.player.uuid}', '${message.author.id}', '${Default.player.sapphire}', '${Default.player.amber}',
            '${Default.player.citrine}', '${Default.player.ruby}', '${Default.player.jade}', '${Default.player.amethyst}'
        )`, async function(err) {
            if (err) return databaselogs.send(`🔴 table **prospect** > An error occurred :\n**${err}**`);
            databaselogs.send(`🟢 table **prospect** : **${message.author.id}** aka **${message.author.tag}**.`);
            con.query(`SELECT COUNT(*) AS usersCount FROM prospect`, function (err, rows, fields) {
                if (err) throw err;

                con.query(`UPDATE prospect SET uuid = ${rows[0].usersCount} WHERE userid = ${userid}`);
            });
        }); //end query prospect
    }
}