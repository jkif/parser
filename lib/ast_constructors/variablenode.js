var BaseNode = require('./ast_constructor_base');


function VariableNode(identifier, variableType) {
  BaseNode.call(this, 'VariableNode');
  this.variableType = variableType || 'IND';
  this.variableName = identifier;
}

module.exports = VariableNode;
