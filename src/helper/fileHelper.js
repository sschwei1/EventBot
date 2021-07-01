const fs = require('fs');

const getConfig = () => {
  const raw = fs.readFileSync('./main.config', 'utf8').trim();
  return JSON.parse(raw);
}

const registerCommands = (client) => {
  const commandPath = './src/commands';
  const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
  for(const file of commandFiles) {
    const command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
  }
}

module.exports = {
  getConfig,
  registerCommands
};