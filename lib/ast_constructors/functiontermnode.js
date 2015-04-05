var BaseNode = require('./ast_constructor_base');


function FunctionTermNode(locationData, funcName, argsList) {
  BaseNode.call(this, 'FunctionTermNode', locationData);
  this.functionName = funcName;
  this.functionArgumentList = this.functionArgumentList || [];
  this.functionArgumentList = this.functionArgumentList.concat(argsList);
}

module.exports = FunctionTermNode;
