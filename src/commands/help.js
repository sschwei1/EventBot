const fh = require('../helper/fileHelper');

module.exports = {
    name: 'help',
    description: 'Shows you the information about a given command',
    args: [{
        name: 'commandName',
        required:true
    }],
    execute(msg, args) {
        const { client, config } = require('../index');

        if(!client.commands.has(args[0].value)) {
            msg.channel
                .send(`Command ${args[0].value} does not exist.\nTry \`${config.prefix} commands\` to get a list of all available commands`)
                .catch(err => {fh.writeLog(err)});
            return;
        }

        msg.channel.send('command does exist');
    }
};