const fh = require('../helper/fileHelper');
const mh = require('../helper/messageHelper');

module.exports = {
  name: 'help',
  description: 'Shows you the information about a given command',
  args: [{
    name: 'commandName',
    description: 'Shows all information about a command.',
    required: true
  }],
  async execute(msg, args) {
    const {client, config} = this.global;

    if(mh.retHelp(args, this.args, this.name, msg, this.global)) return;

    if (!client.commands.has(args[0].value)) {
      msg.channel
        .send(`Command ${args[0].value} does not exist.\nTry \`${config.prefix}commands\` to get a list of all available commands`)
        .catch(err => {
          fh.writeLog(err)
        });
      return;
    }

    const response = mh.createHelpEmbed(args[0].value, this.global);
    await msg.channel.send(response);
  }
};