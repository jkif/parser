var BaseNode = require('./ast_constructor_base');


function NegationNode(negatedExpression) {
  BaseNode.call(this, 'NegationNode');
  this.negatedExpression = negatedExpression;
}

module.exports = NegationNode;
