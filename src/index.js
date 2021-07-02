const Discord = require('discord.js');

const ah = require('./helper/argsHelper');
const mh = require('./helper/messageHelper');
const fh = require('./helper/fileHelper');

fh.clearLog();

const config = fh.getConfig();
if (!config) {
  throw new Error('No config file found, please read the log file for further instructions!');
}

const client = new Discord.Client();

client.commands = new Discord.Collection();
fh.registerCommands(client, config);

client.on('ready', () => {
  fh.writeLog(`Logged in as ${client.user.tag} #uwu`);
});

client.on('message', async msg => {
  // check if author is another bot and if message is meant for this bot
  if (msg.author.bot || !msg.content.startsWith(config.prefix)) return;

  // split msg content to command/args
  const argVals = msg.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = argVals.shift().toLowerCase();

  fh.writeLog(`Message: '${msg.content}' sent by user: '${msg.author.username}'`);

  // check if command exists
  if (!client.commands.has(commandName)) {
    fh.writeLog(`Invalid command '${commandName}' entered by user '${msg.author.username}'`)
    await msg.reply(`Command ${commandName} was not found, please check for typos.`);
    return;
  }

  // execute command and handle error
  try {
    const command = client.commands.get(commandName);
    if (!ah.checkArgs(msg, argVals, command.args)) return;

    const args = ah.parseArgs(command, argVals);

    if(!mh.retHelp(argVals, command.args, commandName, msg, {client, config})){
      await command.execute(msg, args);
    }
  }
  catch (err) {
    fh.writeLog(err);
    await msg.reply('An error occurred while executing your command, message an admin of the bot if this error persists');
  }
});

client.login(config.token).catch((err) => {
  fh.writeLog(err);
  fh.writeLog('Error while bot login, did you provide a token in the config file?');
  process.exit(1);
});

module.exports = {
  client,
  config
};