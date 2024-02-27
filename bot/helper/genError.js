const { EmbedBuilder } = require("discord.js");

// error generator using error desc from command
const genError = (desc) => {
    const errorEmbed = new EmbedBuilder()
        .setTitle('📜 Error 📜')
        .setDescription(`${desc}`)
        .setColor([0, 205, 227])

    return errorEmbed;
}

module.exports = genError;