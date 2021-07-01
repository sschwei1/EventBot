const Discord = require('discord.js');
const FileHelper = require('./helper/fileHelper');
const ArgsHelper = require('./helper/argsHelper');

const config = FileHelper.getConfig();
const client = new Discord.Client();

client.commands = new Discord.Collection();
FileHelper.registerCommands(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag} #uwu`);
});

client.on('message', msg => {
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
  catch (error) {
    console.error(error);
    msg.reply('an error occurred while executing your command');
  }
});

client.login(config.token);