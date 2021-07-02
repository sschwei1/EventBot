const mh = require('./messageHelper');

const getUsageString = (command, prefix) => {
  return `${prefix}${command.name} ${mapArgs(command.args)}`;
};

const mapArgs = (args) => {
  return args.map(e => {
    return e.required ? `<${e.name}>` : `[${e.name}]`;
  }).join(' ');
};

const argString = (arg) => {
  const description = arg.description ? arg.description + '\n' : '';
  return `${description}Required:${mh.cmdLineBlock(arg.required)}`;
};

const shouldRetHelp = () => {

};

module.exports = {
  getUsageString,
  mapArgs,
  argString,
  shouldRetHelp
};