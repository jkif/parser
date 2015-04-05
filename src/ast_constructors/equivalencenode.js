var BaseNode = require('./ast_constructor_base');


function EquivalenceNode(firstExpr, secondExpr) {
  BaseNode.call(this, 'EquivalenceNode');
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(firstExpr, secondExpr);
}

module.exports = EquivalenceNode;
