var BaseNode = require('./ast_constructor_base');


function FunctionTermNode(funcName, argsList) {
  BaseNode.call(this, 'FunctionTermNode');
  this.functionName = funcName;
  this.functionArgumentList = this.functionArgumentList || [];
  this.functionArgumentList = this.functionArgumentList.concat(argsList);
}

module.exports = FunctionTermNode;
