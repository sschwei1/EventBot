const Discord = require('discord.js');

const getUsageString = (command, prefix) => {
  return `${prefix}${command.name} ${mapArgs(command.args)}`;
};

const mapArgs = (args) => {
  return args.map(e => {
    return e.required ? `<${e.name}>` : `[${e.name}]`;
  }).join(' ');
};

const argString = (arg) => {
  const description = arg.description ? arg.description + '\n' : '';
  return `${description}Required:${cmdLineBlock(arg.required)}`;
};

const retHelp = (isArgs, haveArgs, cmdName, msg, global) => {
  if(!(isArgs.length === 0 && haveArgs.filter(e => e.required).length > 0)) return false;

  const createHelpEmbed = require('./messageHelper').createHelpEmbed;
  const embed = createHelpEmbed(cmdName, global);
  msg.channel.send(embed);
  return true;
};

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
};

const createHelpEmbed = (cmdName, global) => {
  const { client, config } = global;

  const command = client.commands.get(cmdName);
  const cmdString = getUsageString(command, config.prefix);

  const cmdArgFields = command.args.map(e => {
    return {
      name: e.name,
      value: argString(e),
      inline: true
    }
  });

  const resOptions = {
    title: `Command: ${cmdLineBlock(command.name)}`,
    description: command.description,
    fields: [
      { name: 'Usage:', value: cmdLineBlock(cmdString) },
      ...cmdArgFields
    ]
  }

  return genEmbed(resOptions);
};

module.exports = {
  getUsageString,
  mapArgs,
  argString,
  retHelp,
  cmdBlock,
  cmdLineBlock,
  genEmbed,
  createHelpEmbed
};