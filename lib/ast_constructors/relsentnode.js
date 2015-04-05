var BaseNode = require('./ast_constructor_base');


function RelSentNode(variable, args) {
  BaseNode.call(this, 'RelSentNode');
  this.variable = variable;
  this.argumentList = this.argumentList || [];
  this.argumentList = this.argumentList.concat(args);
}

module.exports = RelSentNode;
