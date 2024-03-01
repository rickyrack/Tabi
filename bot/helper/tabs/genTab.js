const { EmbedBuilder } = require("discord.js");
const getTotal = require("./getTotal");

// tab generator using a tab's data from firestore
const genTab = (tabData) => {
    const type = tabData.type;

    const stakeDisplay = (stake) => {
        return stake.toFixed(2).split('.')[1] == '00' ? stake.toFixed(0) : stake.toFixed(2);
    }

    const fields = [];
    tabData.entries.forEach(entry => {
        fields.push(
            { name: 
                `${type === 'stake'
                ? `$${stakeDisplay(entry.stake)}`
                : type === 'wins'
                ? `Wins: ${entry.wins}`
                : `Wins: ${entryWins} | $${stakeDisplay(entry)}`
            }`,
            value: `${entry.reason ? `Description: ${entry.reason}` : '\u200b'}`}
        )
    });

    let winnerId;
    let winsTotal;
    let stakeTotal;

    if (type === 'stake') {
        const totalData = getTotal(tabData, 'stake');
        stakeTotal = totalData.total
        winnerId = totalData.winnerId;
    }
    else if (type === 'wins') {
        const totalData = getTotal(tabData, 'wins');
        winsTotal = totalData.total
        winnerId = totalData.winnerId;
    }
    else if (type === 'both') {
        stakeTotal = getTotal(tabData, 'stake');
        winsTotal = getTotal(tabData, 'wins');
        winnerId = stakeTotal.winnerId;
    }

    const winnerDataDisplay = () => {
        let text = '';

        switch (type) {
            case 'stake':
                text = `$${stakeDisplay(stakeTotal)}.`
                break;
            case 'wins':
                text = `${winsTotal} wins.`
                break;
            case 'both':
                text = `$${stakeDisplay(stakeTotal)}.`
                break;
        }

        return `<@${winnerId}> is ahead by ${text}`
    }

    if (fields.length > 0) {
        fields.push({ name: `${winnerDataDisplay()}`, value: '\u200b'})
    }
    else if (fields.length === 0) fields.push({ name: 'Add an entry!', value: '/add [tab-name]'});

    const tab = new EmbedBuilder()
        .setTitle(`${tabData.name}`)
        .setDescription(`Members:\n<@${tabData.users[0]}>\n<@${tabData.users[1]}>`)
        .setFields(fields)
        .setColor([20, 128, 158])

    return tab;
}

module.exports = genTab;