const Discord = require('discord.js');

const cmdBlock = (msg) => {
  return "```" + msg + "```";
};

const cmdLineBlock = (msg) => {
  return "`" + msg + "`";
};

const genEmbed = (options) => {
  return new Discord.MessageEmbed()
    .setColor(options?.color ?? '#ffcc00')
    .setDescription(options.description)
    .setTitle(options?.title ?? '')
    .addFields(options?.fields ?? []);
}

module.exports = {
  cmdBlock,
  cmdLineBlock,
  genEmbed
};