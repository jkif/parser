var BaseNode = require('./ast_constructor_base');


function VariableNode(locationData, identifier, variableType) {
  BaseNode.call(this, 'VariableNode', locationData);
  this.variableType = variableType || 'IND';
  this.variableName = identifier;
}

module.exports = VariableNode;
