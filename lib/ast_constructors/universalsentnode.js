var BaseNode = require('./ast_constructor_base');


function UniversalSentNode(locationData, variableList, quantifiedSent) {
  BaseNode.call(this, 'UniversalSentNode', locationData);
  this.variableList = this.variableList || [];
  this.variableList = this.variableList.concat(variableList);
  this.quantifiedSent = quantifiedSent;
}

module.exports = UniversalSentNode;
