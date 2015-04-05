var BaseNode = require('./ast_constructor_base');


function ExistentialSentNode(variableList, quantifiedSent) {
  BaseNode.call(this, 'ExistentialSentNode');
  this.variableList = this.variableList || [];
  this.variableList = this.variableList.concat(variableList);
  this.quantifiedSent = quantifiedSent;
}

module.exports = ExistentialSentNode;
