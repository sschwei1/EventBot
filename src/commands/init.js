module.exports = {
  name: 'init',
  description: 'Initializes bot for server',
  args: [{
    name: 'channel',
    description: 'Channel which should be used as a Event Hub',
    required: true
  },{
    name: 'role',
    description: 'Role which needs to be granted to access the hub channel',
    required: true
  }],
  async execute(msg, args) {
    const channel = msg.mentions.channels.first();
    const role = msg.mentions.roles.first();

    // msg.delete();
    await msg.channel.send(`Channel: ${(channel?.id ?? '<undefined>').mentionChannel().cmdLineBlock()}\nRole: ${(role?.id ?? '<undefinded>').mentionRole().cmdLineBlock()}`);
  }
};