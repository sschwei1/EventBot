/*
* code ends up looking prettier and probably easier to read, another pro is, that you don't need to
* require your other method in each file, this could potentially break things in case other libraries
* add properties with the same name, should be used carefully, since this is just a small project, i'll take the risk,
* my function names are pretty unique as well and probably not that commonly overwritten
*/

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