module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: [{
    name: 'arg1',
    required:true
  },{
    name: 'arg2',
    required: false
  }],
  execute(msg, args) {
    msg.channel.send('Pong.');
  }
};