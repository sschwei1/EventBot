const checkArgs = (msg, isArgs, haveArgs) => {
  // check if minimum amount of args is given
  console.log('giv args', isArgs);
  console.log('all args', haveArgs);
  console.log('req args', haveArgs.filter(e => e.required));
  if(isArgs.length < haveArgs.filter(e => e.required).length) {
    msg.reply('Not enough arguments given');
    return false;
  }

  // check if maximum amount of args is not exceeded
  if(isArgs.length > haveArgs.length) {
    msg.reply('Too many arguments given');
    return false;
  }

  // possible more logic with command args

  return true;
};

module.exports = {
  checkArgs
};