module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: [],
  async execute(msg, args) {
    await msg.channel.send('Pong.');
  }
};