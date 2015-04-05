var BaseNode = require('./ast_constructor_base');


function VariableNode(locationData, identifier, variableType) {
  BaseNode.call(this, 'VariableNode');
  this.variableType = variableType || 'IND';
  this.variableName = identifier;
  this.locationData = locationData;
}

module.exports = VariableNode;
