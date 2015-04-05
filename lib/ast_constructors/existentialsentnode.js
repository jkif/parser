var BaseNode = require('./ast_constructor_base');


function ExistentialSentNode(locationData, variableList, quantifiedSent) {
  BaseNode.call(this, 'ExistentialSentNode', locationData);
  this.variableList = this.variableList || [];
  this.variableList = this.variableList.concat(variableList);
  this.quantifiedSent = quantifiedSent;
}

module.exports = ExistentialSentNode;
