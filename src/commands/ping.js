module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: [{required:true},{required: false}],
  execute(msg, args) {
    msg.channel.send('Pong.');
  }
}