module.exports = {
    getUser: async function(con, user) {
        return new Promise(function(resolve, reject) {
            con.query(`SELECT * FROM data WHERE userid = ${user}`, function(err, data) {
            if (!data[0]) return resolve(false)
                con.query(`SELECT * FROM ress WHERE userid = ${user}`, function(err, ress) {
                if (!ress[0]) return resolve(false)
                    con.query(`SELECT * FROM items WHERE userid = ${user}`, function(err, items) {
                    if (!items[0]) return resolve(false)
                        con.query(`SELECT * FROM stats WHERE userid = ${user}`, function(err, stats) {
                            if (!stats[0]) return resolve(false)
                             resolve({data:data[0],ress:ress[0],items:items[0],stats:stats[0]})
                        })           
                    })
                })
            })
        });
    },

    getPlayer: async function(con, player) {
        return new Promise(function(resolve, reject) {
            con.query(`SELECT * FROM data WHERE userid = ${player}`, function(err, data) {
            if (!data[0]) return resolve(false)
                con.query(`SELECT * FROM ress WHERE userid = ${player}`, function(err, ress) {
                if (!ress[0]) return resolve(false)
                    con.query(`SELECT * FROM items WHERE userid = ${player}`, function(err, items) {
                    if (!items[0]) return resolve(false)   
                        con.query(`SELECT * FROM stats WHERE userid = ${player}`, function(err, stats) {
                        if (!stats[0]) return resolve(false)
                            resolve({data:data[0],ress:ress[0],items:items[0],stats:stats[0]})
                        })  
                    })
                })
            })
        });
    },

    nFormatter: function(num) {
        const format = [
            { value: 1e18, symbol: 'E' },
            { value: 1e15, symbol: 'P' },
            { value: 1e12, symbol: 'T' },
            { value: 1e9, symbol: 'G' },
            { value: 1e6, symbol: 'M' },
            { value: 1e3, symbol: 'k' },
            { value: 1, symbol: '' },
        ];
        const formatIndex = format.findIndex((data) => num >= data.value);
        return (num / format[formatIndex === -1? 6: formatIndex].value).toFixed() + format[formatIndex === -1?6: formatIndex].symbol;
    },

    checkDays: function(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    },
    getPremiumDuration: function (member) {
        const duration = Date.now() - member.premiumSinceTimestamp
      
        const seconds = Math.floor(duration / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const months = Math.floor(days / 30)
        const years = Math.floor(months / 12)

        return {
            years,
            months: months % 12,
            days: days % 30,
            hours: hours % 24,
            minutes: minutes % 60,
            seconds: seconds % 60
        }
    }
}
