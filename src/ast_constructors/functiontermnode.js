function FunctionTermNode(funcName, argsList) {
  this.type = 'FunctionTermNode';
  this.functionName = funcName;
  this.functionArgumentList = this.functionArgumentList || [];
  this.functionArgumentList = this.functionArgumentList.concat(argsList);
}

module.exports = FunctionTermNode;
