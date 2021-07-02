const Discord = require('discord.js');
const FileHelper = require('./helper/fileHelper');
const ArgsHelper = require('./helper/argsHelper');

FileHelper.clearLog();

const config = FileHelper.getConfig();
if(!config) {
  throw new Error('No config file found, please read the log file for further instructions!');
}

const client = new Discord.Client();

client.commands = new Discord.Collection();
FileHelper.registerCommands(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag} #uwu`);
});

client.on('message', async msg => {
  // check if author is another bot and if message is meant for this bot
  if(msg.author.bot || !msg.content.startsWith(config.prefix)) return;

  // split msg content to command/args
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // check if command exists
  if(!client.commands.has(commandName)) return;

  // execute command and handle error
  try {
    const command = client.commands.get(commandName);
    if(!ArgsHelper.checkArgs(msg, args, command.args)) return;
    command.execute(msg, args);
  }
  catch (err) {
    FileHelper.writeLog(err);
    await msg.reply('An error occurred while executing your command, message an admin of the bot if this error persists');
  }
});

client.login(config.token).catch((err) => {
  FileHelper.writeLog(err);
  FileHelper.writeLog('Error while bot login, did you provide a token in the config file?');
  throw new Error('Bot login failed, check ./bot.log file for more information');
});