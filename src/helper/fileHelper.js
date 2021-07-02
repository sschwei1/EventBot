const fs = require('fs');
const moment = require('moment');

const logPath = './bot.log';
const configPath = './main.config';
const commandPath = './src/commands';

const clearLog = () => {
  fs.writeFileSync(logPath, '');
};

const writeLog = (msg) => {
  if (Array.isArray(msg)) {
    msg = msg.map(e => `[${e.timestamp}] ${e.message}`).join('\n');
  }
  else {
    msg = `[${moment().format()}] ${msg}`;
  }

  console.log(msg);
  fs.appendFileSync(logPath, msg + '\n');
};

const getConfig = () => {
  if (!fs.existsSync(configPath)) {
    fs.copyFile('main.config.template', configPath, (err) => {
      if (!err) return;
      writeLog(err);
      throw err;
    });
    writeLog('Config file created, please fill in all <> and restart the app');
    return;
  }

  const raw = fs.readFileSync(configPath, 'utf8').trim();
  return JSON.parse(raw);
};

const registerCommands = (client, config) => {
  const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    command.global = {
      client: client,
      config: config
    };

    client.commands.set(command.name, command);
  }
};

module.exports = {
  clearLog,
  writeLog,
  getConfig,
  registerCommands
};