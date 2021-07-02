module.exports = {
    name: 'create',
    description: 'Create an event you can subscribe to.',
    args: [{
        name: 'eventName',
        required:true
    }],
    execute(msg, args) {
        msg.channel.send('Pong.');
    }
};