const { EmbedBuilder } = require("discord.js");
const getTabs = require("../../../backend/firestore/tabs/getTabs");

const me = async (i) => {
  const user = i.user;

  const tabs = await getTabs(user.id);
  if (!tabs || tabs.length === 0) {
    const noTabsEmbed = new EmbedBuilder()
      .setTitle("📜 Tabi 📜")
      .setDescription("You don't have any tabs!\nUse /create [tab-name] to get started.")
      .setColor([0, 205, 227])

    return await i.reply({ embeds: [noTabsEmbed], ephemeral: true });
  }

  const fields = [];

  const getClientType = (type) => {
    switch (type) {
      case "stake":
        return "Stake";
      case "wins":
        return "Wins";
      case "both":
        return "Stake and Wins";
    }
  };

  tabs.forEach((tab) => {
    fields.push({
      name: `${tab.name}`,
      value: `Members: <@${tab.users[0]}>, <@${tab.users[1]}> | Tracking ${getClientType(
        tab.type
      )}\nCreated on ${new Date(tab.createdAt).toLocaleDateString('en-US')} | ${
        tab.entries.length
      } Entries | Blank owes $amt/Blank is winning by x`,
    });
  });

  const allTabsEmbed = new EmbedBuilder()
    .setTitle("My Tabs")
    .setDescription("Below are your active tabs, you can edit tabs and view your tab history.")
    .setColor([0, 205, 227])
    .setFields(fields);

  let msg = await i.reply({ embeds: [allTabsEmbed], ephemeral: true });
};

module.exports = me;