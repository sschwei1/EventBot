module.exports = {
  name: 'create',
  description: 'Create an event you can subscribe to.',
  args: [{
    name: 'eventName',
    required: true
  }],
  async execute(msg, args) {
    await msg.channel.send('Pong.');
  }
};