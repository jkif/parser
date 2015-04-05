var BaseNode = require('./ast_constructor_base');


function NegationNode(locationData, negatedExpression) {
  BaseNode.call(this, 'NegationNode', locationData);
  this.negatedExpression = negatedExpression;
}

module.exports = NegationNode;
