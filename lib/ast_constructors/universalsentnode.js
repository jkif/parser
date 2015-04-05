var BaseNode = require('./ast_constructor_base');


function UniversalSentNode(variableList, quantifiedSent) {
  BaseNode.call(this, 'UniversalSentNode');
  this.variableList = this.variableList || [];
  this.variableList = this.variableList.concat(variableList);
  this.quantifiedSent = quantifiedSent;
}

module.exports = UniversalSentNode;
