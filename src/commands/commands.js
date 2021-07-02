const mh = require('../helper/messageHelper');

const createCommandOverviewEmbed = (cmd, commands) => {

  const cmdMapString = commands.map(e => {
    return `${mh.cmdLineBlock(e.name)}`
  }).join(',');

  const resOptions = {
    title: 'Command list:',
    description: 'Overview over all available commands',
    fields: [
      { name: 'Commands:', value: cmdMapString },
      { name: 'Info:', value: `For a more detailed information, you can either use the ${mh.cmdLineBlock('help')} command or add a parameter (any text) to the ${mh.cmdLineBlock('commands')} command`}
    ]
  }

  return mh.genEmbed(resOptions);
};

const createCommandDetailEmbed = (cmd, commands) => {
  const { config } = cmd.global;

  const cmdMap = commands.map(e => {
    const cmdString = mh.getUsageString(e, config.prefix);

    return {
      name: `${e.name}:`,
      value: `${mh.cmdLineBlock(cmdString)}\n${e.description}`
    };
  });

  const resOptions = {
    title: 'Command list:',
    description: 'Detailed overview over all available commands',
    fields: [
      ...cmdMap,
      { name: 'Command parameter explanation:', value: `${mh.cmdLineBlock('[...]')} => required\n${mh.cmdLineBlock('{...}')} => optional`},
      { name: 'Info:', value: `For a more detailed information, including parameter descriptions, you can use the ${mh.cmdLineBlock('help')} command`}
    ]
  }

  return mh.genEmbed(resOptions);
};

module.exports = {
  name: 'commands',
  description: 'Shows a list of all commands',
  args: [{
    name: 'showDetails',
    description: 'Weather to show a more or less detailed list of commands',
    required: false,
    default: false
  }],
  async execute(msg, args) {
    const commands = this.global.client.commands;
    const showDetails = args.length > 0 ? args[0].value : this.args[0].default
    const response = showDetails ?
      createCommandDetailEmbed(this, commands) :
      createCommandOverviewEmbed(this, commands);

    await msg.channel.send(response);
  }
};