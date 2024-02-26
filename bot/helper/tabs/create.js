
const { EmbedBuilder } = require("discord.js");
const createTab = require("../../../backend/firestore/tabs/createTab");

const create = async (i) => {
    const user = i.user;
    const tabName = i.options.getString('name');
    const tabType = i.options.getString('type');
    const otherUser = i.options.getUser('user');

    const newTab = await createTab(tabName, tabType, user.id, otherUser.id);

    const createEmbed = new EmbedBuilder()
        .setTitle(`📜 ${tabName} 📜`)
        .setDescription(`You have no entries in your Tab. \n Use | /add ${tabName} | to get started.`)
        .setColor([0, 205, 227])

    let msg = i.reply({
        embeds: [createEmbed]
    });
}

module.exports = create;