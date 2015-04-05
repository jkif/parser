var BaseNode = require('./ast_constructor_base');


function RelSentNode(locationData, variable, args) {
  BaseNode.call(this, 'RelSentNode', locationData);
  this.variable = variable;
  this.argumentList = this.argumentList || [];
  this.argumentList = this.argumentList.concat(args);
}

module.exports = RelSentNode;
