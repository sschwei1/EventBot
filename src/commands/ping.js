module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: [{
    name: 'arg1',
    description: 'arg1 desc uwu',
    required: true
  }, {
    name: 'arg2',
    description: 'arg2 desc uwu',
    required: false
  }],
  async execute(msg, args) {
    await msg.channel.send('Pong.');
  }
};