const fh = require('./fileHelper');

const checkArgs = (msg, isArgs, haveArgs) => {
  // check if minimum amount of args is given
  const minArgs = haveArgs.filter(e => e.required);
  if (isArgs.length < minArgs.length) {
    fh.writeLog(`Received command from ${msg.author.name} with ${isArgs.length} arguments, expected a minimum of ${minArgs.length} arguments!`);
    msg.reply('Not enough arguments given');
    return false;
  }

  // check if maximum amount of args is not exceeded
  if (isArgs.length > haveArgs.length) {
    fh.writeLog(`Received command from ${msg.author.name} with ${isArgs.length} arguments, expected a maximum of ${haveArgs.length} arguments!`);
    msg.reply('Too many arguments given');
    return false;
  }

  // possible more logic with command args

  return true;
};

const parseArgs = (command, args) => {
  const comArgs = command.args;
  return args.map((argVal, i) => {
    return {
      ...comArgs[i],
      value: argVal
    }
  });
};

module.exports = {
  checkArgs,
  parseArgs
};