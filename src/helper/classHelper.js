const setupClasses = () => {
  addFunctionToType(String);
  addFunctionToType(Boolean);
  addFunctionToType(Number);
};

const addFunctionToType = (type) => {
  type.prototype.cmdBlock = cmdBlock;
  type.prototype.cmdLineBlock = cmdLineBlock;
  type.prototype.mentionChannel = mentionChannel;
  type.prototype.mentionRole = mentionRole;
};

const cmdBlock = function () {
  return "```" + this + "```";
};

const cmdLineBlock = function() {
  return "`" + this + "`";
};

const mentionChannel = function() {
  return `<#${this}>`;
};

const mentionRole = function() {
  return `<@&${this}>`;
};

module.exports = {
  setupClasses
}