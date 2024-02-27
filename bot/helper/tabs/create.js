
const { EmbedBuilder } = require("discord.js");
const createTab = require("../../../backend/firestore/tabs/createTab");
const getUser = require("../../../backend/firestore/user/getUser");
const genError = require("../genError");

const create = async (i) => {
    await i.deferReply({ ephemeral: true });
    const user = i.user;
    const tabName = i.options.getString('name');
    const tabType = i.options.getString('type');
    const otherUser = i.options.getUser('user');

    const userData = await getUser(user);
    if (!userData) {
        const errorEmbed = genError('Something went wrong.\nContact Support: @notoops');

        return await i.editReply({ embeds: [errorEmbed], ephemeral: true });
    }

    const newTab = await createTab(tabName, tabType, user.id, otherUser.id);
    if (!newTab) {
        const errorEmbed = genError('Tab name may be in use by you or targetted user.\nTab type must be either Money/Wins/Both');

        return await i.editReply({ embeds: [errorEmbed], ephemeral: true });
    }

    const createEmbed = new EmbedBuilder()
        .setTitle(`📜 ${tabName} 📜`)
        .setDescription(`You have no entries in your Tab. \n Use /add ${tabName} to get started.`)
        .setColor([0, 205, 227])

    let msg = await i.editReply({
        embeds: [createEmbed]
    });
}

module.exports = create;