const Discord = require('discord.js');
const fh = require('./fileHelper')

const getUsageString = (command, prefix) => {
  return `${prefix}${command.name} ${mapArgs(command.args)}`;
};

const mapArgs = (args) => {
  return args.map(e => {
    return e.required ? `[${e.name}]` : `{${e.name}}`;
  }).join(' ');
};

const argString = (arg) => {
  const description = arg.description !== undefined ? arg.description + '\n' : '';
  const defaultValue = arg.default !== undefined ? 'Default value: ' + cmdLineBlock(arg.default) + '\n' : '';
  const required = 'Required: ' + cmdLineBlock(arg.required ?? true);
  return description + defaultValue + required;
};

const retHelp = (isArgs, haveArgs, cmdName, msg, global) => {
  if(!(isArgs.length === 0 && haveArgs.filter(e => e.required).length > 0)) return false;

  const embed = createHelpEmbed(cmdName, global);
  msg.channel.send(embed).catch(e => fh.writeLog(e));
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

// commands which create embeds are usually in the same file, as the command itself
// the help embed is also used in other places, so its here
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
      ...cmdArgFields,
      { name: 'Command parameter explanation:', value: `${cmdLineBlock('[...]')} => required\n${cmdLineBlock('{...}')} => optional`},
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