const fh = require('../helper/fileHelper');
const ch = require('../helper/commandHelper');
const mh = require('../helper/messageHelper');

const createHelpEmbed = (arg) => {
  const {client, config} = require('../index');

  const command = client.commands.get(arg.value);
  const cmdString = ch.getUsageString(command, config.prefix);
  const cmdArgFields = command.args.map(e => {
    return {
      name: e.name,
      value: ch.argString(e),
      inline: true
    }
  });

  const resOptions = {
    title: `Command: ${mh.cmdLineBlock(command.name)}`,
    description: command.description,
    fields: [
      { name: 'Usage:', value: mh.cmdBlock(cmdString) },
      ...cmdArgFields
    ]
  }

  return mh.genEmbed(resOptions);
};

module.exports = {
  name: 'help',
  description: 'Shows you the information about a given command',
  args: [{
    name: 'commandName',
    description: 'Shows all information about a command.',
    required: true
  }],
  async execute(msg, args) {
    const {client, config} = require('../index');

    if (!client.commands.has(args[0].value)) {
      msg.channel
        .send(`Command ${args[0].value} does not exist.\nTry \`${config.prefix} commands\` to get a list of all available commands`)
        .catch(err => {
          fh.writeLog(err)
        });
      return;
    }

    const response = createHelpEmbed(args[0]);
    await msg.channel.send(response);
  }
};