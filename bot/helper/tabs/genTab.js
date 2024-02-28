const { EmbedBuilder } = require("discord.js");

// tab generator using a tab's data from firestore
const genTab = (tabData) => {
    const fields = [];
    tabData.entries.forEach(entry => {
        fields.push(
            { name: 
                `${tabData.type === 'money'
                ? '$'
                : tabData.type === 'wins'
                ? 'Wins: '
                : 'Wins: 1 | $'
            }${tabData.type === 'money' || tabData.type === 'both' ? (entry.amount.toFixed(2).split('.')[1] == '00' ? entry.amount.toFixed(0) : entry.amount.toFixed(2)) : entry.amount}`,
            value: `${entry.reason ? `Description: ${entry.reason}` : '\u200b'}`}
        )
    });

    if (fields.length === 0) fields.push({ name: 'Add an entry!', value: '/add [tab-name]'});

    const tab = new EmbedBuilder()
        .setTitle(`${tabData.name}`)
        .setDescription(`Members:\n<@${tabData.users[0]}>\n<@${tabData.users[1]}>`)
        .setFields(fields)
        .setColor([20, 128, 158])

    return tab;
}

module.exports = genTab;